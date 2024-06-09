import { React } from 'react'
import { Checkbox, Stack, ToggleButton, Typography } from '@mui/material'
import { ViewInAr } from '@mui/icons-material'
import Spacer from './Spacer'
import { FATE_TOUCHED } from './Inclinations'
import { useHeroDiceContext } from './CharacterStatContext'

export default function HeroDie({ inclinations }) {
  const { heroDice, setHeroDice } = useHeroDiceContext()
  const showSecondDie = inclinations.some(bt => bt.inclination === FATE_TOUCHED)

  const toggleDie = (ev) => {
    const wasChecked = !ev.target.checked

    if (wasChecked) {
      setHeroDice(Math.max(0, heroDice - 1))
    } else {
      setHeroDice(Math.min(2, heroDice + 1))
    }
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10, borderRadius: 4 }}>
      <Typography variant="h6">
        Hero { showSecondDie ? 'Dice' : 'Die' }
      </Typography>

      <Stack direction="column"
            style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 0,
          }}
        >
          <ToggleButton value={heroDice > 0} onChange={toggleDie} size="small">
            <ViewInAr/>
            <Checkbox checked={heroDice > 0}/>
          </ToggleButton>

          {
            showSecondDie && (
              <>
                <Spacer/>
                <ToggleButton value={heroDice > 1} onChange={toggleDie} size="small">
                  <ViewInAr/>
                  <Checkbox checked={heroDice > 1}/>
                </ToggleButton>
              </>
            )
          }
      </Stack>
    </div>
  )
}
