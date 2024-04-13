import React, { useEffect, useState } from 'react'
import { BEASTMASTER, BRUTE, CONJURER, DELVER, FRIAR, RASCAL, SKALD, WARDEN, WARRIOR } from './HeroPath'
import { Chip, Typography } from '@mui/material'
import { DWARF, ELF } from './Ancestry'

const BOON_TYPES = [
  { source: BEASTMASTER, label: 'Melee OR Ranged tasks' },
  { source: BEASTMASTER, label: 'Beast empathy' },
  { source: SKALD, label: 'Performance tasks' },
  { source: SKALD, label: 'Lore knowledge tasks' },
  { source: BRUTE, label: 'Melee attacks' },
  { source: BRUTE, label: 'Strength tasks' },
  { source: BRUTE, label: 'Resist magick' },
  { source: CONJURER, label: 'Magical mystery tasks' },
  { source: DELVER, label: 'Melee OR ranged attacks' },
  { source: DELVER, label: 'Subterranean exploration tasks' },
  { source: RASCAL, label: 'Acrobatic tasks' },
  { source: FRIAR, label: 'Resist heretical powers' },
  { source: FRIAR, label: 'Religious knowledge tasks' },
  { source: WARDEN, label: 'Ranged attacks' },
  { source: WARDEN, label: 'Wilderness tasks' },
  { source: WARRIOR, label: 'Melee attacks' },
  { source: WARRIOR, label: 'Strength tasks' },
  { source: ELF, label: 'Resist mind-altering magicks' },
  { source: DWARF, label: 'Resist poison' },
]

export function BoonChip({ boonObj, compact }) {
  let label = boonObj.label || boonObj.inclination

  if (boonObj.source) { label += ` (${boonObj.source})` }
  if (boonObj.inclination) { label += ` (${boonObj.inclination})` }

  return <Chip label={label} style={{ margin: compact ? 2 : 10 }} />
}

export default function Boons({ ancestry, heroPath, inclinations, onCalculate }) {
  const [boons, setBoons] = useState([])

  const recalculate = () => {
    const newBoons = []

    BOON_TYPES.filter(bt => bt.source === ancestry).forEach(bt => newBoons.push(bt))
    BOON_TYPES.filter(bt => bt.source === heroPath).forEach(bt => newBoons.push(bt))
    inclinations.filter(it => it.boon).forEach(it => newBoons.push(it))

    setBoons(newBoons)
    onCalculate(newBoons)
  }

  useEffect(recalculate, [ancestry, heroPath, inclinations])

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', marginTop: 20, padding: 10 }}>
      <Typography variant="h6">Boons</Typography>
      <div style={{ marginTop: 0 }}>
        { boons.map(bt => <BoonChip key={bt.label || bt.inclination} boonObj={bt}/>) }
        { boons.length === 0 && <span>No boons yet. Boons come from Ancestry, Hero Path, and Inclinations</span> }
      </div>
    </div>
  )
}
