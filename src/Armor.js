import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { BEASTMASTER, DELVER, FRIAR, SKALD, WARDEN, WARRIOR } from './HeroPath'

const LIGHT = 'Light'
const MEDIUM = 'Medium'
const HEAVY = 'Heavy'

export default function Armor({ heroPath }) {
  let type = LIGHT

  if (heroPath === DELVER || heroPath === WARDEN || heroPath === FRIAR || heroPath === SKALD || heroPath === BEASTMASTER) {
    type = MEDIUM
  }
  if (heroPath === WARRIOR) {
    type = HEAVY
  }

  let save = '6'
  if (type === MEDIUM) {
    save = '5+'
  } else if (type === HEAVY) {
    save = "3+"
  }

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
        <TextField disabled value={save} size="small" />
      </Box>

      <span>{type}</span>
    </div>
  )
}
