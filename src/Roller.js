import React, { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import { LooksOneTwoTone, LooksTwoTwoTone, Looks3TwoTone, Looks4TwoTone, Looks5TwoTone, Looks6TwoTone } from '@mui/icons-material'
import { BoonChip } from './Boons'
import { BroadcastHandler } from './BroadcastHandler'

export function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

export function Die({ roll }) {
  if (roll === 1) return <LooksOneTwoTone sx={{ color: 'red', width: 48, height: 48 }} />
  if (roll === 2) return <LooksTwoTwoTone sx={{ width: 48, height: 48 }} />
  if (roll === 3) return <Looks3TwoTone sx={{ width: 48, height: 48 }}  />
  if (roll === 4) return <Looks4TwoTone sx={{ width: 48, height: 48 }}  />
  if (roll === 5) return <Looks5TwoTone sx={{ width: 48, height: 48 }}  />
  if (roll === 6) return <Looks6TwoTone sx={{ width: 48, height: 48, color: 'green' }} />
  return <span>{roll}</span>
}

function AnimatedDie({ roll }) {
  const [visibleRoll, setVisibleRoll] = useState(rollDie())
  let rollsLeft = 10

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

  return <Die roll={visibleRoll}/>
}

class RollValue {
  constructor(roll) {
    this.id = Math.random()
    this.value = roll
  }
}

export default function Roller({ boons, karma, onSpendKarma }) {
  const [open, setOpen] = useState(false)
  const [rolls, setRolls] = useState([])

  const doClose = () => {
    setOpen(false)
  }

  const doClear = () => {
    setRolls([])
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

    BroadcastHandler.sendRoll(newRolls)
    const rollHistory = [...rolls]
    rollHistory.unshift(newRolls)
    setRolls(rollHistory)
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
    onSpendKarma()

    BroadcastHandler.sendUpgrade(newRolls[0])
  }

  return (
    <>
      <Button variant="outlined" sx={{ flex: 1 }} onClick={() => setOpen(true)}>Roll Dice!</Button>
      <Dialog open={open} onClose={doClose}>
        <DialogTitle>How Many Dice?</DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" sx={{ width: '100%', mb: 2, justifyContent: 'space-evenly' }}>
              <Button variant="outlined" onClick={() => { doRoll(1) }}>Roll 1 Die</Button>
              <Button variant="outlined" onClick={() => { doRoll(2) }}>Roll 2 Dice</Button>
              <Button variant="outlined" onClick={() => { doRoll(3) }}>Roll 3 Dice</Button>
              <Button variant="outlined" onClick={() => { doRoll(4) }}>Roll 4 Dice</Button>
            </Stack>

            { rolls.map((roll, idx) => (
              <Stack key={idx} direction="row" sx={{ mb: 2 }}>
                { roll.map(r => (idx === 0) ? <AnimatedDie key={r.id} roll={r} /> : <Die key={r.id} roll={r.value} />) }
              </Stack>
            ))}

            { rolls.length > 0 && (
              <Stack direction="row" sx={{ justifyContent: 'space-around', width: '100%' }}>
                <Stack direction="column">
                  <span>Karma available: {karma}</span>
                  <Button onClick={upgrade} disabled={karma < 1}>Spend Karma</Button>
                </Stack>
              </Stack>
            )}
          </div>

          <div>
            <strong>Boons</strong>
            <div style={{ marginTop: 5 }}>
              { boons.map(bt => <BoonChip key={bt.label || bt.inclination} compact boonObj={bt}/>) }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={doClose}>Close</Button>
          <Button variant="outlined" onClick={doClear}>Clear</Button>
          <Button variant="contained" onClick={doRoll}>Roll!</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
