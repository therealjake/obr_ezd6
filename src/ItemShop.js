import { AddCircle } from '@mui/icons-material'
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

const items = [
  { name: '' },
  { name: 'Rope (50\')', qty: 1 },
  { name: '10\' Pole', qty: 1, large: true },
  { name: 'Hunting Knife', qty: 1 },
  { name: 'Rations', qty: 2 },
  { name: 'Metal spikes', qty: 1 },
  { name: 'Lantern', qty: 1 },
  { name: 'Torches', qty: 2 },
  { name: 'Nails', qty: 1 },
  { name: 'Firestarter', qty: 1 },
  { name: 'Waterskin', qty: 1 },
  { name: 'Small hammer', qty: 1 },
  { name: 'Oil flask', qty: 2 },
  { name: 'Crowbar', qty: 1 },
  { name: 'Chisel', qty: 1 },
  { name: 'Grappling hook', qty: 1 },
  { name: 'Chalk sticks', qty: 1 },
  { name: 'Whistle', qty: 1 },
  { name: 'Horn', qty: 1 },
  { name: 'Padlock and key', qty: 1 },
  { name: 'Pot of grease', qty: 1 },

  // weapons
  { name: 'Short Sword', qty: 1 },
  { name: 'Bastard Sword', qty: 1 },
  { name: 'Long Sword', qty: 1 },
  { name: 'Axe', qty: 1 },
  { name: 'Spear', qty: 1, large: true },
  { name: 'Crossbow', qty: 1, large: true },
  { name: 'Short Bow', qty: 1, large: true },
  { name: 'Long Bow', qty: 1, large: true },
  { name: 'Mace', qty: 1 },
  { name: 'Dagger', qty: 1 },
  { name: 'Staff', qty: 1 },
  { name: 'Two-handed Sword', qty: 1, large: true },
  { name: 'Hammer', qty: 1 },

  // Armor
  { name: 'Leather Armor', qty: 1 },
  { name: 'Chainmail', qty: 1, large: true },
  { name: 'Plate Armor', qty: 1, large: true },
  { name: 'Shield', qty: 1 },
]

export default function ItemShop({ emptySlots, onAdd }) {
  const [item, setItem] = useState('')

  const doAddItem = () => {
    if (!item) {
      return
    }
    const foundItem = items.find((i) => i.name !== '' && item.startsWith(i.name)) || { name: item, qty: 1, large: false }
    onAdd(foundItem)
    setItem('')
  }

  const filteredItems = items.sort((i1, i2) => i1.name.localeCompare(i2.name)).map((i) => i.name + (i.qty > 1 ? ` (${i.qty})` : ''))

  return (
    <Stack direction="row" sx={{ mt: 2, alignItems: 'center' }}>
      <Autocomplete id="item-shop"
                    options={filteredItems}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Add Item" />}
                    value={item}
                    onChange={(v, vv) => setItem(vv)}
                    disabled={emptySlots === 0}
        />
      <IconButton color="primary" disabled={emptySlots === 0} onClick={doAddItem}><AddCircle/></IconButton>
    </Stack>
  )
}
