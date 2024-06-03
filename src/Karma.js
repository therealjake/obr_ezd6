import { React, useEffect } from 'react'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { AddCircle, CircleOutlined, HideSourceOutlined, RemoveCircle } from '@mui/icons-material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

function Point({ isChecked, onIncrement, onDecrement }) {
  if (isChecked) {
    return <HideSourceOutlined onClick={onDecrement} />
  } else {
    return <CircleOutlined onClick={onIncrement} />
  }
}

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
            paddingTop: 5,
          }}
      >
        <Point isChecked={karma < 1} onIncrement={lose} onDecrement={gain} />
        <Point isChecked={karma < 2} onIncrement={lose} onDecrement={gain} />
        <Point isChecked={karma < 3} onIncrement={lose} onDecrement={gain} />
      </Stack>
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Point isChecked={karma < 4} onIncrement={lose} onDecrement={gain} />
        <Point isChecked={karma < 5} onIncrement={lose} onDecrement={gain} />
        <Point isChecked={karma < 6} onIncrement={lose} onDecrement={gain} />
      </Stack>
    </div>
  )
}
