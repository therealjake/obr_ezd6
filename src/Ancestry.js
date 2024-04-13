import React, { useEffect, useState } from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

export const HUMAN = 'Human'
export const ELF = 'Elf'
export const DWARF = 'Dwarf'
export const HALFLING = 'Halfling'
export const GOBLIN = 'Goblin'

const ancestries = [
  { type: HUMAN, note: 'Versatile and skillful, humans get one extra inclination.' },
  { type: ELF, note: 'Ancient and wise, you can see twice as far in dim light and have a boon to resist mind-altering magicks.' },
  { type: DWARF, note: 'From long years exploring dungeons you can see twice as far in dim light and have a boon to resist poison.' },
  { type: HALFLING, note: 'Start with a second breakfast (which heals 2 strikes and can be eaten as a free action). Foes larger than you have a hard time catching you (+1 to your target #)' },
  { type: GOBLIN, note: 'Whenever you move without attacking, you can jump behind the smallest cover, avoiding being attacked for a turn. As a nocturnal creature you also see twice as far in dim light' },
]

export default function Ancestry({ onChange }) {
  const [ancestry, setAncestry] = useState('')

  useEffect(() => onChange(ancestry), [ancestry, onChange])

  useEffect(() => {
    const _ancestry = LoadCharacterField('ancestry')
    setAncestry(_ancestry || '')
  }, [])

  const handleAncestry = (ev) => {
    const _a = ev.target.value
    setAncestry(_a)
    if (_a) {
      SaveCharacterField('ancestry', _a)
    }
  }

  return (
    <Stack style={{ width: '100%' }}>
      <FormControl fullWidth style={{ flex: 1, justifyContent: 'center' }}>
        <InputLabel id="ancestry">Ancestry</InputLabel>
        <Select value={ancestry}
                onChange={handleAncestry}
                variant="outlined"
                label="Ancestry"
                renderValue={(selected) => selected}
        >
          {
            ancestries.map(a => (
              <MenuItem key={a.type} value={a.type} style={{ width: 600 }}>
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item xs={12}>
                    <b>{a.type}</b>
                  </Grid>

                  <Grid item xs={1}></Grid>
                  <Grid item xs={11} style={{ textWrap: 'wrap' }}>
                    {a.note}
                  </Grid>
                </Grid>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <div style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
        { (ancestries.find(a => a.type === ancestry) || {}).note }
      </div>
    </Stack>
  )
}
