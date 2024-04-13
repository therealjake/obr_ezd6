import { React, useEffect, useState } from 'react'
import { Checkbox, Stack, ToggleButton, Typography } from '@mui/material'
import { ViewInAr } from '@mui/icons-material'
import Spacer from './Spacer'
import { FATE_TOUCHED } from './Inclinations'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

export default function HeroDie({ inclinations }) {
  const [firstDie, setFirstDie] = useState(true)

  const showSecondDie = inclinations.some(bt => bt.inclination === FATE_TOUCHED)
  const [secondDie, setSecondDie] = useState(true)

  useEffect(() => {
    const _fd = LoadCharacterField('firstDie')
    setFirstDie(_fd === 'true')

    const _sd = LoadCharacterField('secondDie')
    setSecondDie(_sd === 'true')
  }, [])

  const toggleFirstDie = () => {
    const _d = !firstDie
    setFirstDie(_d)
    SaveCharacterField('firstDie', _d ? 'true' : 'false')
  }

  const toggleSecondDie = () => {
    const _d = !secondDie
    setSecondDie(_d)
    SaveCharacterField('secondDie', _d ? 'true' : 'false')
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10, borderRadius: 4 }}>
      <Typography variant="h6">
        Hero { showSecondDie ? 'Dice' : 'Die' }
      </Typography>

      <Stack direction="column"
            style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <ToggleButton value={firstDie} onChange={toggleFirstDie} size="small">
            <ViewInAr/>
            <Checkbox checked={firstDie}/>
          </ToggleButton>

          {
            showSecondDie && (
              <>
                <Spacer/>
                <ToggleButton value={secondDie} onChange={toggleSecondDie} size="small">
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
