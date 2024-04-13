import React from 'react'

import { Button, Stack } from '@mui/material'
import OBR from '@owlbear-rodeo/sdk'

export default function Dice() {
  const padding = 20
  const spacer = 20
  const characterSheet = 680
  const width = 1000 - (padding * 2) - {spacer} - characterSheet

  const rollOne = () => {
    if (OBR.isReady) {
      const me = OBR.player.getName()
      const roll = 1 + Math.round(Math.random() * 6)
      OBR.notification.show(`${me} just rolled a ${roll}`)
    } else {
      window.alert('No OBR found')
    }
  }

  return (
    <div style={{ width }}>
      <Stack>
        <b>Roll dice here</b>
        <Button onClick={rollOne}>Roll One Die</Button>
        <Button onClick={rollOne}>Roll Two Dice</Button>
        <Button onClick={rollOne}>Roll Three Dice</Button>
        <Button onClick={rollOne}>Roll Four Dice</Button>
      </Stack>
    </div>
  )
}
