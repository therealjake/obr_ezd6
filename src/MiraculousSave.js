import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { FRIAR, SKALD } from './HeroPath'

export default function MiraculousSave({ heroPath }) {
  let save = '6'
  let label = ''

  if (heroPath === FRIAR) {
    save = '5+'
    label = 'Blessed'
  } else if (heroPath === SKALD) {
    save = '5+'
    label = 'Soothsayer'
  } else {
    label = 'Save'
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
      <Typography variant="h6">Miraculous</Typography>

      <Box width={60} sx={{ mb: 1 }}>
        <TextField disabled value={save} size="small" />
      </Box>

      <span>{label}</span>
    </div>
  )
}
