import { AddCircle, Cancel, CircleOutlined, HideSourceOutlined, Save } from '@mui/icons-material'
import { Autocomplete, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Inclinations, { CHIRURGEON, LOCKPICKING } from './Inclinations'
import { DELVER } from './HeroPath'
import { LoadCharacterField, SaveCharacterField, WipeCharacterField } from './CharacterStore'

const items = [
  { label: '' },

  // Specialty Gear
  { label: 'Delvers Pack (bulky)', qty: 1, large: true },
  { label: 'Healing Kit (6)', qty: 6 },
  { label: 'Lockpicks (3)', qty: 3 },

  // Random Gear
  { label: '10\' Pole (bulky)', qty: 1, large: true, },
  { label: 'Chalk sticks', qty: 1 },
  { label: 'Chisel', qty: 1 },
  { label: 'Coinbag', qty: 1, note: true, },
  { label: 'Crowbar', qty: 1 },
  { label: 'Grappling hook', qty: 1 },
  { label: 'Horn', qty: 1 },
  { label: 'Hunting Knife', qty: 1, },
  { label: 'Lantern', qty: 1, },
  { label: 'Metal spikes', qty: 1, },
  { label: 'Nails', qty: 1 },
  { label: 'Oil flask (2)', qty: 2 },
  { label: 'Other Item', qty: 1, note: true },
  { label: 'Padlock and key', qty: 1 },
  { label: 'Pot of grease', qty: 1 },
  { label: 'Potion', qty: 1, note: true },
  { label: 'Rations (4)', qty: 4, },
  { label: 'Rope (50\')', qty: 1, },
  { label: 'Scroll', qty: 1, note: true },
  { label: 'Small hammer', qty: 1 },
  { label: 'Torches (2)', qty: 2, },
  { label: 'Waterskin', qty: 1 },
  { label: 'Whistle', qty: 1 },

  // Weapons
  { label: 'Axe', qty: 1,  },
  { label: 'Crossbow (bulky)', qty: 1, large: true,  },
  { label: 'Dagger', qty: 1 },
  { label: 'Hammer', qty: 1 },
  { label: 'Long Bow (bulky)', qty: 1, large: true },
  { label: 'Long Sword', qty: 1,  },
  { label: 'Mace', qty: 1 },
  { label: 'Short Bow (bulky)', qty: 1, large: true,  },
  { label: 'Short Sword', qty: 1, },
  { label: 'Spear (bulky)', qty: 1, large: true,  },
  { label: 'Staff', qty: 1 },
  { label: 'Two-handed Sword (bulky)', qty: 1, large: true },

  // Armor
  { label: 'Leather Armor', qty: 1, },
  { label: 'Chainmail', qty: 1, large: false, },
  { label: 'Plate Armor (bulky)', qty: 1, large: true, },
  { label: 'Shield', qty: 1, },
]

function SubSlot({ onIncrement, onDecrement, startExpended }) {
  const [expended, setExpended] = useState(startExpended)

  const expend = () => {
    setExpended(true)
    onIncrement()
  }

  const unexpend = () => {
    setExpended(false)
    onDecrement()
  }

  if (expended) {
    return <HideSourceOutlined onClick={() => unexpend()} />
  } else {
    return <CircleOutlined onClick={() => expend()} />
  }
}

function Coinbag({ onClear, copper, setCopper, silver, setSilver, gold, setGold }) {
  return (
    <Grid item xs={6}>
      <Stack direction="row" sx={{ mt: 2, ml: 1, mr: 1, alignItems: 'center' }}>

      <TextField label="Copper"
                    variant="outlined"
                    fullWidth
                    value={copper}
                    onChange={(ev) => setCopper(ev.target.value)}
                    type="number"
                    style={{ marginRight: 5}}
        />
        <TextField label="Silver"
                    variant="outlined"
                    fullWidth
                    value={silver}
                    onChange={(ev) => setSilver(ev.target.value)}
                    type="number"
                    style={{ marginRight: 5}}
        />
        <TextField label="Gold"
                    variant="outlined"
                    fullWidth
                    value={gold}
                    onChange={(ev) => setGold(ev.target.value)}
                    type="number"
                    style={{ marginRight: 5}}
        />

        <IconButton onClick={onClear}><Cancel /></IconButton>
      </Stack>
      { (Number(copper) + Number(silver) + Number(gold)) > 2000 && <Typography sx={{ ml: 1, mt: 1 }} variant="caption" color="error">Bags can only hold 2,000 coins</Typography>}
    </Grid>
  )
}

export default function ItemSlot({ characterName, idx, heroPath, inclinations, weightArray, itemNameArray, onPick }) {
  const [item, setItem] = useState(null)
  const [note, setNote] = useState('')
  const [expendedCount, setExpendedCount] = useState(0)
  const [copper, setCopper] = useState(0)
  const [silver, setSilver] = useState(0)
  const [gold, setGold] = useState(0)

  // Load item from local storage
  useEffect(() => {
    if (!characterName) {
      return
    }
    const itemKey = `${characterName}-item-${idx}`

    const _item = LoadCharacterField(itemKey)
    if (_item) {
      const newItem = JSON.parse(_item)
      setItem(newItem.item)
      setNote(newItem.note)
      setExpendedCount(newItem.expendedCount)
      setCopper(newItem.copper)
      setSilver(newItem.silver)
      setGold(newItem.gold)
    }

    return () => {}
  }, [characterName])

  useEffect(() => {
    onPick(item, note)
  }, [weightArray, itemNameArray, item])

  // Save item to local storage when anything changes
  useEffect(() => {
    if (!characterName) {
      return
    }

    const itemKey = `${characterName}-item-${idx}`

    if (!item) {
      WipeCharacterField(itemKey)
    } else {
      const itemPayload = {
        characterName,
        idx,
        item,
        note,
        expendedCount,
        copper,
        silver,
        gold,
      }

      console.log('Saving item with key ', itemKey, ' and payload ', itemPayload)
      SaveCharacterField(itemKey, JSON.stringify(itemPayload))

      return () => {}
    }
  }, [characterName, item, note, expendedCount, copper, silver, gold])

  const incrementExpended = () => setExpendedCount(expendedCount + 1)
  const decrementExpended = () => setExpendedCount(expendedCount - 1)

  const pickItem = (itemName) => {
    setNote('')

    if (!itemName) {
      setItem(null)
      onPick(null)
      return
    }

    const foundItem = items.find((i) => i.label !== '' && itemName.startsWith(i.label))
    setItem(foundItem)
  }

  const formatItem = (item) => {
    if (!item) {
      return ''
    }

    return item.label
  }

  const filteredItems =
    items
      .filter((i) => i.label !== 'Delvers Pack (bulky)' || heroPath === DELVER)
      .filter((i) => i.label !== 'Lockpicks (3)' || inclinations.some((inc) => inc.inclination === LOCKPICKING))
      .filter((i) => i.label !== 'Healing Kit (6)' || inclinations.some((inc) => inc.inclination === CHIRURGEON))
      .map(formatItem)

  if (item && item.label === 'Coinbag') {
    return (
      <Coinbag onClear={() => setItem(null)}
               copper={copper}
               setCopper={setCopper}
               silver={silver}
               setSilver={setSilver}
               gold={gold}
               setGold={setGold}
      />
    )
  }

  if (item && item.note) {
    return (
      <Grid item xs={6}>
        <Stack direction="row" sx={{ mt: 2, ml: 1, mr: 1, alignItems: 'center' }}>
          <TextField label={item.label}
                     variant="outlined"
                     fullWidth
                     value={note}
                     onChange={(ev) => setNote(ev.target.value)}
          />
          <IconButton onClick={() => setItem(null)}><Cancel /></IconButton>
        </Stack>
      </Grid>
    )
  }

  return (
    <Grid item xs={6}>
      <Stack direction="row" sx={{ mt: 2, ml: 1, mr: 1, alignItems: 'center' }}>
        <Autocomplete id={`${idx}`}
                      options={filteredItems}
                      style={{ width: '100%' }}
                      renderInput={(params) => <TextField {...params} />}
                      value={item ? item.label : ''}
                      onChange={(v, vv) => pickItem(vv)}
        />
        {(item || {}).qty === 2 && (
          <div style={{ marginLeft: 10 }}>
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount === 2} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount === 1} />
          </div>
        )}
        {(item || {}).qty === 3 && (
          <div style={{ display: 'flex', marginLeft: 10 }}>
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 2} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 1} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 0} />
          </div>
        )}
        {(item || {}).qty === 4 && (
          <div style={{ marginLeft: 10 }}>
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 3} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 2} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 1} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 0} />
          </div>
        )}
        {(item || {}).qty === 6 && (
          <div style={{ marginLeft: 10 }}>
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 5} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 4} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 3} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 2} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 1} />
            <SubSlot onIncrement={incrementExpended} onDecrement={decrementExpended} startExpended={expendedCount > 0} />
          </div>
        )}
      </Stack>
      {(item && item.note) && (
        <TextField sx={{ m: 2 }} label="Note" variant="standard" fullWidth />
      )}
    </Grid>
  )
}
