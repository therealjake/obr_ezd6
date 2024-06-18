import { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { RemoveCircle, AddCircle } from '@mui/icons-material'
import { BoonChip } from './Boons'
import { BroadcastHandler } from './BroadcastHandler'
import { useHeroDiceContext, useKarmaContext } from './CharacterStatContext'
import { AnimatedDie, Die } from './Dice'
import { Boon } from './GameTypes'

export function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

type RollSet = {
  id: number,
  values: Array<number>,
  animateUntil: number,
  highRoll: number,
  rerolled: boolean,
}

export default function Roller({ boons }: { boons: Boon[] }) {
  const [open, setOpen] = useState(false)
  const [rolls, setRolls] = useState<Array<RollSet>>([])
  const [target, setTarget] = useState(3)
  const { karma, setKarma } = useKarmaContext()
  const { heroDice, setHeroDice } = useHeroDiceContext()

  const openDialog = () => {
    setRolls([])
    setTarget(3)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const doRoll = (diceCount: number) => {
    if (!rolls || rolls.length === 0) {
      BroadcastHandler.markNewRollSet()
    }

    const newRolls: RollSet = { id: Math.random(), values: [], highRoll: 0, rerolled: false, animateUntil: new Date().getTime() + 500 }
    let max = 0
    for (var i = 0; i < diceCount; i++) {
      const roll = rollDie()
      max = Math.max(max, roll)
      newRolls.values.push(roll)
    }
    newRolls.values.sort((v1, v2) => v2 - v1)
    newRolls.highRoll = max

    BroadcastHandler.sendRoll(newRolls)
    const rollHistory = [...rolls]
    rollHistory.unshift(newRolls)
    setRolls(rollHistory)
  }

  const tryForCrit = () => {
    const _rolls = [...rolls]
    const dieRoll = rollDie()
    const newRoll: RollSet = { id: Math.random(), values: [dieRoll], highRoll: dieRoll, rerolled: false, animateUntil: new Date().getTime() + 500 }
    _rolls.unshift(newRoll)
    setRolls(_rolls)
  }

  const upgrade = () => {
    if (karma < 1) {
      return
    }

    const newRolls = [...rolls]
    newRolls[0].values[0] += 1
    newRolls[0].highRoll += 1
    setRolls(newRolls)

    setKarma(Math.max(0, karma - 1))

    BroadcastHandler.sendUpgrade(newRolls[0])
  }

  const spendHeroDie = () => {
    const newRolls = [...rolls]
    newRolls[0].rerolled = true
    const newRoll = rollDie()
    newRolls.unshift({ id: Math.random(), values: [newRoll], highRoll: newRoll, rerolled: false, animateUntil: new Date().getTime() + 500  })
    setRolls(newRolls)
    setHeroDice(heroDice - 1)
  }

  const canSpendKarma = karma > 0 && rolls.length > 0 && rolls[0].highRoll > 1 && rolls[0].highRoll < 6

  const successCount = rolls.filter(r => !r.rerolled).reduce((acc, roll, idx) => {
    if (idx === rolls.length - 1) {
      return roll.highRoll >= target ? acc + 1 : acc
    } else {
      return roll.highRoll === 6 ? acc + 1 : acc
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

            <Stack direction="column" sx={{ alignItems: 'start' }}>
              { [...rolls].reverse().map((roll, idx) => (
                <Stack key={idx} direction="row" sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  { roll.values.map((r, rIdx) => <AnimatedDie key={rIdx} value={r} size={64} animateUntil={roll.animateUntil} />) }
                  { !roll.rerolled && (
                    <div>
                      { idx === 0 ? (
                        roll.highRoll >= target && <Typography sx={{ ml: 2, color: 'green' }}>Success!</Typography>
                      ) : (
                        roll.highRoll === 6 && <Typography sx={{ ml: 2, color: 'green' }}>Success!</Typography>
                      )}
                    </div>
                  )}

                  { roll.rerolled && <div style={{ position: 'absolute', width: 64 * roll.values.length, border: '1px solid gray' }} /> }
                </Stack>
              ))}
            </Stack>

            { rolls.length > 0 && rolls[0].highRoll === 6 && (
              <>
                <Typography sx={{ mb: 1 }}>6! Roll again…</Typography>
                <Button variant="contained" onClick={tryForCrit} sx={{ mb: 2 }}>Roll Again</Button>
              </>
            )}

            { rolls.length > 0 && (
              <Stack direction="row" sx={{ justifyContent: 'space-around' }}>
                <Stack direction="column" >
                  { rolls[0].highRoll < 6 && (
                    <>
                      <Button onClick={upgrade} variant="outlined" disabled={!canSpendKarma}>Spend Karma</Button>
                      <Button onClick={spendHeroDie} disabled={heroDice < 1}>Spend Hero Die</Button>
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
              { boons.map(bt => <BoonChip key={bt.label} compact boonObj={bt}/>) }
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
