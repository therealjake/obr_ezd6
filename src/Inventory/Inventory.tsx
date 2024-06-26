import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import ItemSlot from './ItemSlot'
import { Inclination, Item } from '../GameTypes'
import { BRUTE, WARRIOR } from '../HeroPath'

type InventoryProps = {
  characterName: string,
  heroPath: string,
  inclinations: Array<Inclination>,
  onInventoryChange: (inventory: string) => void,
}

export default function Inventory({ characterName, heroPath, inclinations, onInventoryChange }: InventoryProps) {
  const [weight, setWeight] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [itemNames, setItemNames] = useState<Array<string | null>>([])

  const maxWeight = (heroPath === WARRIOR || heroPath === BRUTE) ? 12 : 8
  const totalWeight = weight.reduce((acc, h) => Number(acc) + Number(h), 0)

  useEffect(() => {
    const formatted = itemNames.filter(v => !!v).join(', ') + `      (Encumberance: ${totalWeight} / ${maxWeight})`
    if (onInventoryChange) {
      onInventoryChange(formatted)
    }
  }, [itemNames, onInventoryChange, totalWeight, maxWeight])

  const selectItem = (idx: number, item: Item | null, note: string | null) => {
    const newH = [...weight]
    const newN = [...itemNames]

    if (!item) {
      newH[idx] = 0
      newN[idx] = null
    } else if (item.large) {
      newH[idx] = 2
      newN[idx] = item.label + (note ? ` (${note})` : '')
    } else {
      newH[idx] = 1
      newN[idx] = item.label + (note ? ` (${note})` : '')
    }

    if (newH[idx] !== weight[idx]) {
      setWeight(newH)
    }
    if (newN[idx] !== itemNames[idx]) {
      setItemNames(newN)
    }
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', marginTop: 20, padding: 10 }}>
      <Typography variant="h6">Gear</Typography>

      <Grid container style={{ border: '0px solid blue'}}>
        {Array(maxWeight).fill('haha').map((item, idx) => (
          <ItemSlot key={idx}
                    characterName={characterName}
                    idx={idx + 1}
                    onPick={(item: Item | null, note: string | null) => selectItem(idx, item, note)}
                    heroPath={heroPath}
                    inclinations={inclinations}
                    weightArray={weight}
                    itemNameArray={itemNames}
          />
        ))}
      </Grid>

      <Typography variant="body1" style={{ marginTop: 8, marginLeft: 8 }}>Weight: {totalWeight} / {maxWeight}</Typography>

      {totalWeight > maxWeight && (
        <Typography variant="caption" style={{ color: 'red' }}>OVERLOADED</Typography>
      )}
    </div>
  )
}
