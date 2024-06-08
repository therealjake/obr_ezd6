import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Die, rollDie } from './Roller'
import { KarmaContext, StrikesContext } from './Character'
import { AddCircle, RemoveCircle } from '@mui/icons-material'

function SaveRollChain({ idx, rolls, karmaLeft, karmaSpent, saveTarget, onSpendKarma, onTakeWound }) {
  const [resolved, setResolved] = useState(false)

  const doSpendKarma = () => {
    onSpendKarma(idx)
  }

  const doTakeHit = () => {
    onTakeWound(idx)
    setResolved(true)
  }

  return (
    <Stack direction="column" alignItems="center" sx={{ width: '33%' }}>
      <Typography variant="caption">Damage</Typography>
      { rolls.length > 0 && (
        <Die roll={rolls[0] + karmaSpent[idx]} />
      )}
      { rolls.length > 1 && (
        <Die roll={rolls[1]} />
      )}

      { rolls[0] + karmaSpent[idx] >= saveTarget ? (
        <Typography sx={{ mb: 3 }}>Saved!</Typography>
      ) : (
        <>
          <Typography>Failed!</Typography>
          { resolved ? (
            <>
              <Typography>Damage taken</Typography>
              <Typography>Karma earned</Typography>
            </>
          ) : (
            <>
              <Button disabled={karmaLeft < 1 || rolls[0] === 1} onClick={doSpendKarma}>Spend Karma</Button>
              <Button onClick={doTakeHit}>Take the hit</Button>
            </>
          )}
        </>
      )}
    </Stack>
  )
}

export default function SaveRoller({ saveTarget, saveWithAdvantage }) {
  const [open, setOpen] = useState(true)
  const [rollCount, setRollCount] = useState(1)
  const [diceRolled, setDiceRolled] = useState(false)

  const [rolls, setRolls] = useState([])
  const [karmaSpent, setKarmaSpent] = useState([])
  const [woundsTaken, setWoundsTaken] = useState([])

  const { karma, setKarma } = useContext(KarmaContext)
  const { strikes, setStrikes } = useContext(StrikesContext)

  const totalKarmaSpent = karmaSpent.reduce((acc, v) => acc + v, 0)
  const totalWoundsTaken = woundsTaken.reduce((acc, v) => acc + v, 0)
  const karmaLeft = diceRolled ? (karma - totalKarmaSpent + totalWoundsTaken) : karma

  let allResolved = false
  if (rollCount > 0 && diceRolled) {
    allResolved = true
    for (var i = 0; i < rollCount; i++) {
      if ((woundsTaken[i] === 0) && (rolls[i][0] + karmaSpent[i]) < saveTarget) {
        allResolved = false
      }
    }
  }

  const closeDialog = () => {
    setOpen(false)
    setDiceRolled(false)
    setRolls([])
    reset()
  }

  const reset = () => {
    setKarmaSpent(Array(rollCount).fill(0))
    setWoundsTaken(Array(rollCount).fill(0))
  }
  
  const done = () => {
    setKarma(karma - totalKarmaSpent + totalWoundsTaken)
    setStrikes(strikes - totalWoundsTaken)
    closeDialog()
  }

  const recordKarmaSpent = (idx) => {
    const newKarmaSpent = [...karmaSpent]
    newKarmaSpent[idx] = newKarmaSpent[idx] + 1
    setKarmaSpent(newKarmaSpent)
  }

  const recordWoundTaken = (idx) => {
    const newWoundsTaken = [...woundsTaken]
    newWoundsTaken[idx] = newWoundsTaken[idx] + 1
    setWoundsTaken(newWoundsTaken)
  }

  const startRolling = () => {
    reset()

    const _rolls = []
    for (var i = 0; i < rollCount; i++) {
      const r = []
      r.push(rollDie())
      if (saveWithAdvantage) {
        r.push(rollDie())
      }
      _rolls.push(r)
    }
    setRolls(_rolls)

    setDiceRolled(true)
  }

  if (!open) {
    return <Button onClick={() => setOpen(true)}>Save</Button>
  } else {
    return (
      <Dialog open onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack direction="column" alignItems="center">
            <Stack direction="row">
              <Stack direction="column" sx={{ mr: 2 }}>
                <Typography>Damage</Typography>

                <Stack direction="row">
                  <IconButton color="primary" 
                              onClick={() => setRollCount(rollCount - 1)}
                              disabled={diceRolled}
                  >
                    <RemoveCircle/>
                  </IconButton>

                  <TextField value={rollCount}
                    onChange={(ev) => setRollCount(ev.target.value)}
                    disabled={diceRolled}
                    sx={{ maxWidth: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />

                  <IconButton color="primary" 
                              onClick={() => setRollCount(rollCount + 1)}
                              disabled={diceRolled}
                  >
                    <AddCircle/>
                  </IconButton>
                </Stack>
              </Stack>
              <Stack direction="column" sx={{ ml: 2 }}>
                <Typography>Save target</Typography>
                <TextField value={saveTarget}
                  disabled
                  sx={{ maxWidth: 70 }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Stack>
            </Stack>

            {!diceRolled && (
              <Button variant="outlined" 
                      sx={{ mt: 2 }} 
                      onClick={startRolling}
              >
                Roll Save{rollCount > 1 ? 's' : ''}
              </Button>
            )}

            {diceRolled && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                {
                  [...Array(rollCount).keys()].map(v => (
                    <SaveRollChain key={v}
                                   idx={v}
                                   rolls={rolls[v]}
                                   karmaLeft={karmaLeft}
                                   saveTarget={saveTarget}
                                   saveWithAdvantage={saveWithAdvantage}
                                   karmaSpent={karmaSpent}
                                   woundsTaken={woundsTaken}
                                   onSpendKarma={recordKarmaSpent}
                                   onTakeWound={recordWoundTaken}
                    />
                  ))
                }
              </div>
            )}

            <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-around' }}>
              <Typography>Strikes Left: {strikes - totalWoundsTaken}</Typography>
              <Typography>Karma Left: {karmaLeft}</Typography>
            </Stack>
          </Stack>

          <DialogActions>
            {diceRolled && (<Button variant="outlined" onClick={reset}>Reset</Button>)}
            {diceRolled && (<Button variant="contained" disabled={!allResolved} onClick={done}>Done</Button>)}

            {!diceRolled && (<Button variant="contained" onClick={closeDialog}>Cancel</Button>)}
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}