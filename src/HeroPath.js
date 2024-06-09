import React, { useEffect, useState } from 'react'
import { Grid, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

export const BEASTMASTER = 'Beastmaster'
export const BRUTE = 'Brute'
export const CONJURER = 'Conjurer'
export const DELVER = 'Delver'
export const FRIAR = 'Friar'
export const RASCAL = 'Rascal'
export const SKALD = 'Skald'
export const WARDEN = 'Warden'
export const WARRIOR = 'Warrior'

const heroPaths = [
  { type: BEASTMASTER, note: 'Better with animals than with people' },
  { type: BRUTE, note: 'Powered by rage, sustained by carnage' },
  { type: CONJURER, note: 'A student of forbidden magickal arts' },
  { type: DELVER, note: 'Explorer of the deepest and darkest caverns' },
  { type: FRIAR, note: 'Pious travelling bringer of good news to the good and judgement on the wicked' },
  { type: RASCAL, note: 'Cat burgler, pickpocket, loveable scoundrel' },
  { type: SKALD, note: 'Troubadour, legend-singer, travelling loremaster' },
  { type: WARDEN, note: 'Nature-wise guardian of forest and fauna' },
  { type: WARRIOR, note: 'Fighter, highly skilled with sword and spear' },
]

export const BLASTMASTER = 'Blastmaster'
export const BOTANICALIST = 'Botanicalist'
export const FIRE_ELEMENTALIST = 'Elementalist (Fire)'
export const WATER_ELEMENTALIST = 'Elementalist (Water)'
export const AIR_ELEMENTALIST = 'Elementalist (Air)'
export const EARTH_ELEMENTALIST = 'Elementalist (Earth)'
export const ILLUSIONIST = 'Illusionist'
export const NECROMANCER = 'Necromancer'
export const SEER = 'Seer'
export const SHADOWEAVER = 'Shadoweaver'
export const SHAPESHIFTER = 'Shapeshifter'

const schools = [
  { type: BLASTMASTER, note: 'Just blast everything' },
  { type: BOTANICALIST, note: 'Bind and control plant life' },
  { type: AIR_ELEMENTALIST, note: 'Harness elemental energies of Air' },
  { type: WATER_ELEMENTALIST, note: 'Harness elemental energies of Water' },
  { type: EARTH_ELEMENTALIST, note: 'Harness elemental energies of Earth' },
  { type: FIRE_ELEMENTALIST, note: 'Harness elemental energies of Fire' },
  { type: ILLUSIONIST, note: 'Mess with others minds' },
  { type: NECROMANCER, note: 'Icky Squicky Magick' },
  { type: SEER, note: 'Uncanny insight into the future' },
  { type: SHADOWEAVER, note: 'Shape the powers of light and dark' },
  { type: SHAPESHIFTER, note: 'Reform your own body to take on new powers' },
]

export default function HeroPath({ onChange }) {
  const [path, setPath] = useState('')
  const [school, setSchool] = useState('')

  useEffect(() => onChange(path, school), [path, school, onChange])

  const handlePath = (ev) => {
    const _p = ev.target.value
    setPath(_p)
    setSchool('')
    SaveCharacterField('heroPath', _p)
    SaveCharacterField('subclass', '')
  }

  const handleSchool = (ev) => {
    const _s = ev.target.value
    setSchool(_s)
    SaveCharacterField('subclass', _s)
  }

  useEffect(() => {
    const loadData = async () => {
      const _hp = await LoadCharacterField('heroPath')
      setPath(_hp)
      const _sc = await LoadCharacterField('subclass')
      setSchool(_sc)
    }
    loadData()
  }, [])

  return (
    <Stack style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl fullWidth style={{ flex: 1, justifyContent: 'center' }}>
        <InputLabel id="path">Hero Path</InputLabel>
        <Select value={path}
                onChange={handlePath}
                variant="outlined"
                label="Hero Path"
                renderValue={(selected) => selected}
        >
          {
            heroPaths.map(a => (
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

      { path === CONJURER && (
        <FormControl fullWidth style={{ flex: 1, justifyContent: 'center' }}>
          <InputLabel id="path">Magick School</InputLabel>
          <Select value={school}
                  onChange={handleSchool}
                  variant="outlined"
                  label="Magick School"
                  renderValue={(selected) => selected}
          >
            {
              schools.map(s => (
                <MenuItem key={s.type} value={s.type} style={{ width: 600 }}>
                  <Grid container style={{ alignItems: 'center' }}>
                    <Grid item xs={12}>
                      <b>{s.type}</b>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={11} style={{ textWrap: 'wrap' }}>
                      {s.note}
                    </Grid>
                  </Grid>
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}
      </div>

      <div style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
        { (heroPaths.find(p => p.type === path) || {}).note }
      </div>
    </Stack>
  )
}
