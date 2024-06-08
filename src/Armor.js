import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { BEASTMASTER, DELVER, FRIAR, RASCAL, SKALD, WARDEN, WARRIOR } from './HeroPath'
import SaveRoller from './SaveRoller'

const LIGHT = 'Light'
const MEDIUM = 'Medium'
const HEAVY = 'Heavy'

export default function Armor({ heroPath, inventory }) {
  let type = LIGHT

  if (heroPath === DELVER || heroPath === WARDEN || heroPath === FRIAR || heroPath === SKALD || heroPath === BEASTMASTER) {
    type = MEDIUM
  }
  if (heroPath === WARRIOR) {
    type = HEAVY
  }

  let save = 6
  if (type === MEDIUM) {
    save = 5
  } else if (type === HEAVY) {
    save = 4
    if ((inventory || '').includes('Shield')) {
      save = 3
    }
  }

  const saveWithAdvantage = heroPath === RASCAL

  return (
    <div style={{
      display: 'flex',
      border: '1px solid darkGray',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 4,
    }}>
      <Typography variant="h6">Armor</Typography>

      <Box width={60} sx={{ mb: 1 }}>
        <TextField disabled value={save + (save < 6 ? '+' : '')} size="small" />
      </Box>

      <span>{type}</span>

      <SaveRoller saveTarget={save} saveWithAdvantage={saveWithAdvantage} />
    </div>
  )
}
