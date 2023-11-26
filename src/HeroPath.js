import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

export const BEASTMASTER = 'Beastmaster'
export const BRUTE = 'Brute'
export const CONJURER = 'Conjurer'
export const DELVER = 'Delver'
export const FRIAR = 'Friar'
export const RASCAL = 'Rascal'
export const SKALD = 'Scald'
export const WARDEN = 'Warden'
export const WARRIOR = 'Warrior'

export default function HeroPath({ onChange }) {
  const [path, setPath] = useState('')

  useEffect(() => onChange(path), [path])

  const handlePath = (ev) => setPath(ev.target.value)

  return (
    <Stack style={{ width: '100%' }}>
      <FormControl fullWidth style={{ flex: 1, justifyContent: 'center' }}>
        <InputLabel id="path">Hero Path</InputLabel>
        <Select value={path}
                onChange={handlePath}
                variant="outlined"
                label="Hero Path"
        >
          <MenuItem value={BEASTMASTER}>{BEASTMASTER}</MenuItem>
          <MenuItem value={BRUTE}>{BRUTE}</MenuItem>
          <MenuItem value={CONJURER}>{CONJURER}</MenuItem>
          <MenuItem value={DELVER}>{DELVER}</MenuItem>
          <MenuItem value={FRIAR}>{FRIAR}</MenuItem>
          <MenuItem value={RASCAL}>{RASCAL}</MenuItem>
          <MenuItem value={SKALD}>{SKALD}</MenuItem>
          <MenuItem value={WARDEN}>{WARDEN}</MenuItem>
          <MenuItem value={WARRIOR}>{WARRIOR}</MenuItem>
        </Select>
      </FormControl>

      <div style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>

        { (path === BEASTMASTER) && <span>Better with animals than with people.</span>}
        { (path === BRUTE) && <span>Powered by rage, sustained by destruction.</span>}
        { (path === CONJURER) && <span>A student of forbidden arts.</span>}
        { (path === DELVER) && <span>Explorer of the deepest and darkest caverns.</span>}
        { (path === FRIAR) && <span>Pious travelling bringer of good.</span>}
        { (path === RASCAL) && <span>Cat burgler, pickpocket, loveable scoundrel.</span>}
        { (path === SKALD) && <span>Troubadour, legend-singer, travelling loremaster.</span>}
        { (path === WARDEN) && <span>Nature-wise guardian of forest and fauna.</span>}
        { (path === WARRIOR) && <span>Fighter, highly skilled with sword and spear.</span>}
      </div>
    </Stack>
  )
}
