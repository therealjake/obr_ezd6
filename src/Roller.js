import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { AddCircle, LooksOneTwoTone, LooksTwoTwoTone, Looks3TwoTone, Looks4TwoTone, Looks5TwoTone, Looks6TwoTone, RemoveCircle } from '@mui/icons-material'
import { BoonChip } from './Boons'

function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

function Die({ roll }) {
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
    }, 150)
  }, [])

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
  const [diceCount, setDiceCount] = useState(1)
  const [rolls, setRolls] = useState([])

  const doClose = () => {
    setOpen(false)
    setDiceCount(1)
    setRolls([])
  }

  const lose = () => setDiceCount(Math.max(diceCount - 1, 0))
  const gain = () => setDiceCount(diceCount + 1)

  const doClear = () => {
    setDiceCount(1)
    setRolls([])
  }

  const doRoll = () => {
    const newRolls = []
    let max = 0
    let min = 6
    for (var i = 0; i < diceCount; i++) {
      const roll = rollDie()
      max = Math.max(max, roll)
      min = Math.min(min, roll)
      newRolls.push(new RollValue(roll))
    }

    const rollHistory = [...rolls]
    rollHistory.unshift(newRolls)
    setRolls(rollHistory)
  }

  const handleDiceChange = (ev) => setDiceCount(ev.target.value)

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
  }

  return (
    <>
      <Button variant="outlined" sx={{ flex: 1 }} onClick={() => setOpen(true)}>Roll Dice!</Button>
      <Dialog open={open} onClose={doClose}>
        <DialogTitle>How Many Dice?</DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row"
                   style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 15,
                    marginBottom: 10,
                   }}
              >
              <Button onClick={lose}><RemoveCircle/></Button>

              <Box width={60}>
                <TextField onChange={handleDiceChange} value={diceCount} size="small" />
              </Box>

              <Button onClick={gain}><AddCircle/></Button>
            </Stack>

            { rolls.map((roll, idx) => (
              <Stack key={idx} direction="row">
                { roll.map(r => (idx === 0) ? <AnimatedDie key={r.id} roll={r} /> : <Die key={r.id} roll={r.value} />) }
              </Stack>
            ))}

            { rolls.length > 0 && (
              <>
                <span>Karma available: {karma}</span>
                <Button onClick={upgrade} disabled={karma < 1}>Spend Karma</Button>
              </>
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
