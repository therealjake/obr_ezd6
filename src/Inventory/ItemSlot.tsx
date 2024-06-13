import React, { useEffect, useState } from 'react'

import { Autocomplete, AutocompleteValue, Grid, IconButton, Stack, TextField } from '@mui/material'
import { Cancel } from '@mui/icons-material'
import { CHIRURGEON, LOCKPICKING } from '../Inclinations'
import { DELVER } from '../HeroPath'
import { LoadCharacterField, SaveCharacterField, WipeCharacterField } from '../CharacterStore'
import { Inclination, Item } from '../GameTypes'
import { ITEMS } from './GearList'
import Coinbag from './Coinbag'
import SubSlot from './SubSlot'

type ItemSlotProps = {
  characterName: string,
  idx: number,
  heroPath: string,
  inclinations: Array<Inclination>,
  weightArray: Array<number>,
  itemNameArray: Array<string | null>,
  onPick: (item: Item | null, note: string | null) => void,
}

export default function ItemSlot({ characterName, idx, heroPath, inclinations, weightArray, itemNameArray, onPick }: ItemSlotProps) {
  const [loaded, setLoaded] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
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

    const _item = LoadCharacterField<string>(itemKey)
    if (_item) {
      const newItem = JSON.parse(_item)
      setItem(newItem.item)
      setNote(newItem.note)
      setExpendedCount(newItem.expendedCount)
      setCopper(newItem.copper)
      setSilver(newItem.silver)
      setGold(newItem.gold)
    }
    setLoaded(true)

    return () => {}
  }, [characterName, idx, loaded])

  useEffect(() => {
    onPick(item, note)
  }, [weightArray, itemNameArray, item, note, onPick, idx])

  // Save item to local storage when anything changes
  useEffect(() => {
    if (!characterName) {
      return
    }
    if (!loaded) {
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

      SaveCharacterField(itemKey, JSON.stringify(itemPayload))
    }
  }, [characterName, item, note, expendedCount, copper, silver, gold])

  const incrementExpended = () => setExpendedCount(expendedCount + 1)
  const decrementExpended = () => setExpendedCount(expendedCount - 1)

  const pickItem = (itemName: string) => {
    setNote('')

    if (!itemName) {
      setItem(null)
      onPick(null, '')
      return
    }

    const foundItem = ITEMS.find((i) => i.label !== '' && itemName.startsWith(i.label)) || null
    setItem(foundItem)
  }

  const formatItem = (item: Item) => {
    if (!item) {
      return ''
    }

    return item.label
  }

  const filteredItems =
    ITEMS
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
                     onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setNote(ev.target.value)}
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
                      onChange={(v, vv: AutocompleteValue<string, undefined, undefined, undefined>) => pickItem(vv || '')}

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
