import { React, useEffect, useState } from 'react'
import { BRUTE } from './HeroPath'
import { Box, Button, Divider, FormLabel, Stack, TextField } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'

export default function Health({ heroPath }) {
  let maxHealth = 3

  if (heroPath === BRUTE) {
    maxHealth = 5
  }

  useEffect(() => setCurrentHealth(maxHealth), [maxHealth])

  const [currentHealth, setCurrentHealth] = useState(maxHealth)

  const damage = () => setCurrentHealth(Math.max(0, currentHealth - 1))
  const heal = () => setCurrentHealth(Math.min(maxHealth, currentHealth + 1))

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10 }}>
      Strikes <small>(Health)</small>
      <Stack direction="row"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 15,
            }}
      >
        <Button onClick={damage}><RemoveCircle/></Button>

        <Box width={80}>
          <TextField disabled value={currentHealth} size="small" label="Current" />
        </Box>

        <Box width={80}>
          <TextField disabled value={maxHealth} size="small" label="Maximum" />
        </Box>

        <Button onClick={heal}><AddCircle/></Button>
      </Stack>
    </div>
  )
}
