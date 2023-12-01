import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { AddCircle, LooksOne, LooksTwo, Looks3TwoTone, Looks4, Looks5, Looks6, RemoveCircle } from '@mui/icons-material'

function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

function Die({ roll }) {
  if (roll === 1) return <LooksOne sx={{ color: 'red' }} />
  if (roll === 2) return <LooksTwo />
  if (roll === 3) return <Looks3TwoTone size={24} />
  if (roll === 4) return <Looks4 size={36} />
  if (roll === 5) return <Looks5 size={48} />
  if (roll === 6) return <Looks6 sx={{ color: 'green' }} />
  return <span>{roll}</span>
}

function AnimatedDie({ roll }) {
  const [visibleRoll, setVisibleRoll] = useState(rollDie())
  let rollsLeft = 10

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

export default function Roller() {
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
