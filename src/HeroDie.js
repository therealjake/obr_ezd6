import { React, useState } from 'react'
import { Box, Button, Checkbox, Stack, TextField, ToggleButton } from '@mui/material'
import { AddCircle, RemoveCircle, ViewInAr } from '@mui/icons-material'
import Spacer from './Spacer'
import { FATE_TOUCHED } from './Inclinations'

export default function HeroDie({ inclinations }) {
  const [firstDie, setFirstDie] = useState(true)

  const showSecondDie = inclinations.some(bt => bt.inclination === FATE_TOUCHED)

  const [secondDie, setSecondDie] = useState(true)

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10 }}>
      Hero { showSecondDie ? 'Dice' : 'Die' }
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <ToggleButton value={firstDie} onChange={() => setFirstDie(!firstDie)} size="small">
            <ViewInAr/>
            <Checkbox checked={firstDie}/>
          </ToggleButton>

          {
            showSecondDie && (
              <>
                <Spacer/>
                <ToggleButton value={secondDie} onChange={() => setSecondDie(!secondDie)} size="small">
                  <ViewInAr/>
                  <Checkbox checked={secondDie}/>
                </ToggleButton>
              </>
            )
          }
      </Stack>
    </div>
  )
}
