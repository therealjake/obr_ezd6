import React, { useEffect, useState } from 'react'
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

export const HUMAN = 'Human'
export const ELF = 'Elf'
export const DWARF = 'Dwarf'
export const HALFLING = 'Halfling'
export const GOBLIN = 'Goblin'

export default function Ancestry({ onChange }) {
  const [ancestry, setAncestry] = useState('')

  useEffect(() => onChange(ancestry), [ancestry])

  const handleAncestry = (ev) => setAncestry(ev.target.value)

  return (
    <Stack style={{ width: '100%' }}>
      <FormControl fullWidth style={{ flex: 1, justifyContent: 'center' }}>
        <InputLabel id="ancestry">Ancestry</InputLabel>
        <Select value={ancestry}
                onChange={handleAncestry}
                variant="outlined"
                label="Ancestry"
        >
          <MenuItem value={HUMAN}>Human</MenuItem>
          <MenuItem value={ELF}>Elf</MenuItem>
          <MenuItem value={DWARF}>Dwarf</MenuItem>
          <MenuItem value={HALFLING}>Halfling</MenuItem>
          <MenuItem value={GOBLIN}>Goblin</MenuItem>
        </Select>
      </FormControl>

      <div style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
        { (ancestry === HUMAN) && <span>Versatile and skillful, humans get one extra inclination.</span>}
        { (ancestry === ELF) && <span>Ancient and wise, you can see twice as far in dim light and have a boon to resist mind-altering magicks.</span>}
        { (ancestry === DWARF) && <span>From long years exploring dungeons you can see twice as far in dim light and have a boon to resist poison.</span>}
        { (ancestry === HALFLING) && <span>Start with a second breakfast (which heals 2 strikes and can be eaten as a free action). Foes larger than you have a hard time catching you (+1 to your target #)</span>}
        { (ancestry === GOBLIN) && <span>Whenever you move without attacking, you can jump behind the smallest cover, avoiding being attacked for a turn. As a nocturnal creature you also see twice as far in dim light</span>}
      </div>
    </Stack>
  )
}
