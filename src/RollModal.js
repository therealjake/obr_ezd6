import React from 'react'
import { theme } from './App'
import { Stack, ThemeProvider, Typography } from '@mui/material'
import { D1, D2, D3, D4, D5, D6 } from './Dice'

export default function RollModal({ search }) {
  const parts = search.replace('?', '').split("&")
  const rollerPart = parts.find(p => p.startsWith('roller'))
  const rollerName = rollerPart.split('=')[1]

  const dicePart = parts.find(p => p.startsWith('rolls'))
  const rolls = dicePart.split('=')[1].split(',')

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20, height: '100%', background: '#E8E4D8', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4">
          Roll Em!!
        </Typography>
        <Typography>
          {rollerName} rolls…
        </Typography>
        <Stack direction="row">
          {
            rolls.map((r, idx) => {
              if (r === '1') return <D1 key={idx} size="75"/>
              if (r === '2') return <D2 key={idx} size="75"/>
              if (r === '3') return <D3 key={idx} size="75"/>
              if (r === '4') return <D4 key={idx} size="75"/>
              if (r === '5') return <D5 key={idx} size="75"/>
              if (r === '6') return <D6 key={idx} size="75"/>

              return <span key={idx}>`--${r}-!`</span>
            })
          }
        </Stack>
      </div>
    </ThemeProvider>
  )
}