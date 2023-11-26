import { React, useEffect, useState } from 'react'
import { BRUTE } from './HeroPath'
import { Box, Button, Stack, TextField } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'

export default function Karma() {
  const [karma, setKarma] = useState(3)

  const lose = () => setKarma(Math.max(0, karma - 1))
  const gain = () => setKarma(karma + 1)

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10 }}>
      Karma
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
          }}
      >
        <Button onClick={lose}><RemoveCircle/></Button>

        <Box width={60}>
          <TextField disabled value={karma} size="small" />
        </Box>

        <Button onClick={gain}><AddCircle/></Button>
      </Stack>
    </div>
  )
}
