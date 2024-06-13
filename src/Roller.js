import { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { RemoveCircle, AddCircle } from '@mui/icons-material'
import { BoonChip } from './Boons'
import { BroadcastHandler } from './BroadcastHandler'
import { useKarmaContext } from './CharacterStatContext'
import { Die } from './Dice'

export function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

function AnimatedDie({ roll }) {
  const [visibleRoll, setVisibleRoll] = useState(rollDie())
  let rollsLeft = 0

  useEffect(() => { setVisibleRoll(roll.value) }, [roll.value])

  useEffect(() => {
    const intervalId = setInterval(() => {
      rollsLeft--
      if (rollsLeft <= 0) {
        clearInterval(intervalId)
        setVisibleRoll(roll.value)
      } else {
        setVisibleRoll(rollDie())
      }
    }, 50)
  }, [roll.value, rollsLeft])

  return <Die value={visibleRoll} size={64} />
}

class RollValue {
  constructor(roll) {
    this.id = Math.random()
    this.value = roll
  }
}

export default function Roller({ boons }) {
  const [open, setOpen] = useState(false)
  const [rolls, setRolls] = useState([])
  const [target, setTarget] = useState(3)
  const { karma, setKarma } = useKarmaContext()

  const openDialog = () => {
    setRolls([])
    setTarget(3)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const doRoll = (diceCount) => {
    if (!rolls || rolls.length === 0) {
      BroadcastHandler.markNewRollSet()
    }

    const newRolls = []
    let max = 0
    let min = 6
    for (var i = 0; i < diceCount; i++) {
      const roll = rollDie()
      max = Math.max(max, roll)
      min = Math.min(min, roll)
      newRolls.push(new RollValue(roll))
    }

    newRolls.sort((rv1, rv2) => rv2.value - rv1.value)

    BroadcastHandler.sendRoll(newRolls)
    const rollHistory = [...rolls]
    rollHistory.unshift(newRolls)
    setRolls(rollHistory)
  }

  const tryForCrit = () => {
    const _rolls = [...rolls]
    _rolls.unshift([new RollValue(rollDie())])
    setRolls(_rolls)
  }

  const upgrade = () => {
    if (karma < 1) {
      return
    }

    let highestValue = 0
    let highestRollIndex = -1
    rolls[0].forEach((roll, idx) => {
      if (roll.value >= highestValue) {
        highestValue = roll.value
        highestRollIndex = idx
      }
    })
    if (highestValue >= 6) {
      return
    }

    const newRolls = [...rolls]
    newRolls[0][highestRollIndex].value += 1
    setRolls(newRolls)

    setKarma(Math.max(0, karma - 1))

    BroadcastHandler.sendUpgrade(newRolls[0])
  }

  const canSpendKarma = karma > 0 && rolls.length > 0 && rolls[0][0].value > 1 && rolls[0][0].value < 6

  console.log('Rolls: ', rolls)

  const successCount = rolls.reduce((acc, roll, idx) => {
    if (idx === rolls.length - 1) {
      return roll[0].value >= target ? acc + 1 : acc
    } else {
      return roll[0].value === 6 ? acc + 1 : acc
    }
  }, 0)

  return (
    <>
      <Button variant="outlined" sx={{ flex: 1 }} onClick={openDialog}>Roll Dice!</Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>How Many Dice?</DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" sx={{ mt: 1, mb: 3, alignItems: 'center' }}>
              <Typography>Target Number:</Typography>

              <IconButton color="primary" 
                          onClick={() => setTarget(Math.max(0, target - 1))}
                          disabled={rolls.length > 0}
              >
                <RemoveCircle/>
              </IconButton>
              <TextField value={target}
                          type='number'
                          disabled={true}
                          sx={{ maxWidth: 70 }}
                          inputProps={{ style: { textAlign: 'center' } }}
              />

              <IconButton color="primary" 
                          onClick={() => setTarget(target + 1)}
                          disabled={rolls.length > 0}
              >
                <AddCircle/>
              </IconButton>
            </Stack>


            { rolls.length === 0 && (
              <Stack direction="row" sx={{ width: '100%', mb: 2, justifyContent: 'space-evenly' }}>
                <Button variant="outlined" onClick={() => { doRoll(1) }}>Roll 1 Die</Button>
                <Button variant="outlined" onClick={() => { doRoll(2) }}>Roll 2 Dice</Button>
                <Button variant="outlined" onClick={() => { doRoll(3) }}>Roll 3 Dice</Button>
                <Button variant="outlined" onClick={() => { doRoll(4) }}>Roll 4 Dice</Button>
              </Stack>
            )}

            { rolls[0][0].value === 6 && (
              <>
                <Typography sx={{ mb: 1 }}>6! Roll again…</Typography>
                <Button variant="contained" onClick={tryForCrit} sx={{ mb: 2 }}>Roll Again</Button>
              </>
            )}

            <Stack direction="column" sx={{ alignItems: 'start' }}>
              { rolls.map((roll, idx) => (
                <Stack key={idx} direction="row" sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  { roll.map(r => <Die key={r.id} value={r.value} size={64} />) }
                  <div>
                    { idx === rolls.length - 1 ? (
                      roll[0].value >= target && <Typography sx={{ ml: 2, color: 'green' }}>Success!</Typography>
                    ) : (
                      roll[0].value === 6 && <Typography sx={{ ml: 2, color: 'green' }}>Success!</Typography>
                    )}
                  </div>
                </Stack>
              ))}
            </Stack>

            { rolls.length > 0 && (
              <Stack direction="row" sx={{ justifyContent: 'space-around' }}>
                <Stack direction="column" >
                  { rolls[0][0].value < 6 && (
                    <>
                      <Button onClick={upgrade} variant="outlined" disabled={!canSpendKarma}>Spend Karma</Button>
                      <Button onClick={upgrade} disabled={karma < 1}>Spend Hero Die</Button>
                    </>
                  )}
                </Stack>
              </Stack>
            )}

            { rolls.length > 0 && (
              <>
                <Divider flexItem sx={{ mt: 1, mb: 2}} />
  
                <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-evenly' }}>
                  <span>Success count: {successCount}</span>
                  <span>Karma available: {karma}</span>
                </Stack>
              </>
            )}
          </div>

          <div style={{ marginTop: 30 }}>
            <strong>Boons</strong>
            <div style={{ marginTop: 5 }}>
              { boons.map(bt => <BoonChip key={bt.label || bt.inclination} compact boonObj={bt}/>) }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
