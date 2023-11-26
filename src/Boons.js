import React, { useEffect, useState } from 'react'
import { BEASTMASTER, BRUTE, CONJURER, DELVER, FRIAR, RASCAL, SKALD, WARDEN, WARRIOR } from './HeroPath'
import { Chip } from '@mui/material'
import { DWARF, ELF } from './Ancestry'

const BOON_TYPES = [
  { heroPath: BEASTMASTER, label: 'Melee OR Ranged tasks' },
  { heroPath: BEASTMASTER, label: 'Beast empathy' },
  { heroPath: SKALD, label: 'Performance tasks' },
  { heroPath: SKALD, label: 'Lore knowledge tasks' },
  { heroPath: BRUTE, label: 'Melee attacks' },
  { heroPath: BRUTE, label: 'Strength tasks' },
  { heroPath: CONJURER, label: 'Magical mystery tasks' },
  { heroPath: DELVER, label: 'Melee OR ranged attacks' },
  { heroPath: DELVER, label: 'Subterranean exploration tasks' },
  { heroPath: RASCAL, label: 'Acrobatic tasks' },
  { heroPath: FRIAR, label: 'Resist heretical powers' },
  { heroPath: FRIAR, label: 'Religious knowledge tasks' },
  { heroPath: WARDEN, label: 'Ranged attacks' },
  { heroPath: WARDEN, label: 'Wilderness tasks' },
  { heroPath: WARRIOR, label: 'Melee attacks' },
  { heroPath: WARRIOR, label: 'Strength tasks' },
  { ancestry: ELF, label: 'Resist mind-altering magicks' },
  { ancestry: DWARF, label: 'Resist poison' },
]

function BoonChip({ boonObj }) {
  let label = boonObj.label || boonObj.inclination
  if (boonObj.ancestry) { label += ` (${boonObj.ancestry})` }
  if (boonObj.heroPath) { label += ` (${boonObj.heroPath})` }
  if (boonObj.inclination) { label += ` (${boonObj.inclination})` }

  return <Chip label={label} style={{ margin: 10 }} />
}

export default function Boons({ ancestry, heroPath, inclinations }) {
  const [boons, setBoons] = useState([])

  const recalculate = () => {
    const newBoons = []

    BOON_TYPES.filter(bt => bt.ancestry === ancestry).forEach(bt => newBoons.push(bt))
    BOON_TYPES.filter(bt => bt.heroPath === heroPath).forEach(bt => newBoons.push(bt))
    inclinations.filter(it => it.boon).forEach(it => newBoons.push(it))

    setBoons(newBoons)
  }

  useEffect(recalculate, [ancestry, heroPath, inclinations])

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10 }}>
      <b>Boons</b>
      <div>
        { boons.map(bt => <BoonChip key={bt.label || bt.inclination} boonObj={bt}/>) }
        { boons.length === 0 && <span>No boons. Boons come from Ancestry, Hero Path, and Inclinations</span> }
      </div>
    </div>
  )
}
