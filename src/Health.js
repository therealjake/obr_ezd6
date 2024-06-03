import { React, useEffect, useState } from 'react'
import { BRUTE } from './HeroPath'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { AddCircle, CircleOutlined, HideSourceOutlined, RemoveCircle } from '@mui/icons-material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

function Strike({ isChecked, onIncrement, onDecrement }) {
  if (isChecked) {
    return <HideSourceOutlined onClick={onDecrement} />
  } else {
    return <CircleOutlined onClick={onIncrement} />
  }
}

export default function Health({ heroPath, strikes, onChangeStrikes }) {
  let maxHealth = 3

  if (heroPath === BRUTE) {
    maxHealth = 5
  }

  useEffect(() => {
    const _h = LoadCharacterField('health')
    onChangeStrikes(LoadCharacterField('health'))
  }, [])

  const damage = () => {
    const _h = Math.max(0, strikes - 1)
    onChangeStrikes(_h)
    SaveCharacterField('health', _h)
  }

  const heal = () => {
    const _h = Math.min(maxHealth, strikes + 1)
    onChangeStrikes(_h)
    SaveCharacterField('health', _h)
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', borderRadius: 4, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
      <Typography variant="h6">Strikes</Typography>
      <Stack direction="row"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 5,
            }}
      >
        <Strike isChecked={strikes < 1} onIncrement={damage} onDecrement={heal} />
        <Strike isChecked={strikes < 2} onIncrement={damage} onDecrement={heal} />
        <Strike isChecked={strikes < 3} onIncrement={damage} onDecrement={heal} />
      </Stack>

      {maxHealth === 5 && (
        <Stack direction="row"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: 5,
                width: '100%'
              }}
        >
          <div/>
          <Strike isChecked={strikes < 4} onIncrement={damage} onDecrement={heal} />
          <Strike isChecked={strikes < 5} onIncrement={damage} onDecrement={heal} />
          <div/>
        </Stack>
      )}

      { strikes < 1 && (
        <div style={{ width: '100%' }}>
          <Typography variant='body2' sx={{ mt: 1 }}><center>NOT REAL HEALTHY! Remember your hero dice and karma</center></Typography>
        </div>
      )}
    </div>
  )

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', borderRadius: 4, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
      <Typography variant="h6">Strikes <small>(Health)</small></Typography>
      <Stack direction="row"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 15,
            }}
      >
        <IconButton color="primary" onClick={damage}><RemoveCircle/></IconButton>

        <Box width={60} sx={{ flex: 2 }}>
          <TextField disabled value={strikes} size="small" label="Cur" />
        </Box>

        <Box width={60}>
          <TextField disabled value={maxHealth} size="small" label="Max" />
        </Box>

        <IconButton color="primary" onClick={heal}><AddCircle/></IconButton>
      </Stack>

      { strikes < 1 && (
        <Typography variant='body2' sx={{ m: 1 }}>NOT REAL HEALTHY</Typography>
      )}
    </div>
  )
}
