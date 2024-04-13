import { React, useEffect } from 'react'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

export default function Karma({ karma, onChangeKarma }) {
  useEffect(() => updateKarma(Number(LoadCharacterField('karma'))), [])

  const lose = () => updateKarma(Math.max(0, karma - 1))
  const gain = () => updateKarma(karma + 1)

  const updateKarma = (k) => {
    onChangeKarma(k)
    SaveCharacterField('karma', k)
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10, borderRadius: 4 }}>
      <Typography variant="h6">Karma</Typography>
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
          }}
      >
        <IconButton color="primary" onClick={lose}><RemoveCircle/></IconButton>

        <Box width={40}>
          <TextField disabled value={karma} size="small" />
        </Box>

        <IconButton color="primary" onClick={gain}><AddCircle/></IconButton>
      </Stack>
    </div>
  )
}
