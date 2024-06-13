import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Die, rollDie } from './Dice'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { useHeroDiceContext, useKarmaContext, useStrikesContext } from './CharacterStatContext'

type SaveRollChainProps = {
  idx: number,
  rolls: Array<number>,
  rerolls?: Array<number>,
  karmaLeft: number,
  karmaSpent: number,
  heroDiceLeft: number,
  damageAccepted: boolean,
  saveTarget: number,
  onSpendKarma: (idx: number) => void,
  onSpendHeroDie: (idx: number) => void,
  onAcceptDamage: (idx: number) => void,
}

function SaveRollChain(
  { 
    idx, 
    rolls, 
    rerolls,
    karmaLeft, 
    karmaSpent, 
    heroDiceLeft,
    damageAccepted,
    saveTarget, 
    onSpendKarma, 
    onSpendHeroDie,
    onAcceptDamage,
  }: SaveRollChainProps
) {

  const doSpendKarma = () => {
    onSpendKarma(idx)
  }

  const doSpendHeroDie = () => {
    onSpendHeroDie(idx)
  }

  const doTakeHit = () => {
    onAcceptDamage(idx)
  }

  type Roll = {
    roll: number,
    reroll: boolean
  }
  const allRolls: Array<Roll> = rolls.map(r => ({ roll: r, reroll: false }))
  if (rerolls) {
    rerolls.forEach(r => allRolls.push({ roll: r, reroll: true }))
  }
  allRolls.sort((r1, r2) => r2.roll - r1.roll)

  return (
    <Stack direction="column" alignItems="center" sx={{ width: '33%' }}>
      <Typography variant="caption">Damage</Typography>
      { allRolls.map((r, rollIdx) => (
        <Stack key={rollIdx}>
          <Die value={r.roll + (rollIdx === 0 ? karmaSpent : 0)} size={64} />
          {r.reroll && <Typography variant="caption" sx={{ mb: 1 }}>(reroll)</Typography>}
        </Stack>
      ))}

      { allRolls[0].roll + karmaSpent >= saveTarget ? (
        <Typography sx={{ mb: 3 }}>Saved!</Typography>
      ) : (
        <>
          <Typography>Failed!</Typography>
          { damageAccepted ? (
            <>
              <Typography>Damage taken</Typography>
              <Typography>Karma earned</Typography>
            </>
          ) : (
            <>
              <Button disabled={karmaLeft < 1 || allRolls[0].roll === 1} onClick={doSpendKarma}>Spend Karma</Button>
              <Button disabled={heroDiceLeft < 1} onClick={doSpendHeroDie}>Spend Hero Die</Button>
              <Button onClick={doTakeHit}>Take the hit</Button>
            </>
          )}
        </>
      )}
    </Stack>
  )
}

export type SaveRollerProps = {
  saveTarget: number,
  saveWithAdvantage: boolean
}

type RollSet = {
  index: number,
  rolls: Array<number>,
  reroll: Array<number>,
  karmaSpent: number,
  heroDiceSpent: boolean,
  damageAccepted: boolean,
}

export default function SaveRoller({ saveTarget, saveWithAdvantage }: SaveRollerProps) {
  const [open, setOpen] = useState(false)
  const [dmgCount, setDmgCount] = useState(1)
  const [rolls, setRolls] = useState<Array<RollSet>>([])

  const { karma, setKarma } = useKarmaContext()
  const { strikes, setStrikes } = useStrikesContext()
  const { heroDice, setHeroDice } = useHeroDiceContext()

  // Derived state
  const diceRolled = rolls.length > 0
  const totalWoundsTaken = rolls.reduce((acc, rs) => acc + (rs.damageAccepted ? 1 : 0), 0) || 0

  const totalKarmaSpent = rolls.reduce((acc, rs) => acc + rs.karmaSpent, 0) || 0
  const karmaLeft = diceRolled ? (karma - totalKarmaSpent + totalWoundsTaken) : karma

  const totalHeroDiceSpent = rolls.reduce((acc, rs) => acc + (rs.heroDiceSpent ? 1 : 0), 0) || 0
  const heroDiceLeft = diceRolled ? (heroDice - totalHeroDiceSpent) : heroDice

  const closeDialog = () => {
    setOpen(false)
    setRolls([])
  }

  const reset = () => {
    const _rolls = [...rolls]
    for (const rs of _rolls) {
      rs.damageAccepted = false
      rs.heroDiceSpent = false
      rs.karmaSpent = 0
    }
    setRolls(_rolls)
  }
  
  const commitChanges = () => {
    setKarma(Math.max(0, karma - totalKarmaSpent + totalWoundsTaken))
    setStrikes(Math.max(0, strikes - totalWoundsTaken))
    setHeroDice(Math.max(0, heroDice - totalHeroDiceSpent))
    closeDialog()
  }

  const recordKarmaSpent = (idx: number) => {
    const _newRolls = [...rolls]
    const rs = _newRolls[idx]
    rs.karmaSpent = rs.karmaSpent + 1
    setRolls(_newRolls)
  }

  const recordWoundTaken = (idx: number) => {
    const _newRolls = [...rolls]
    const rs = _newRolls[idx]
    if (!rs.damageAccepted) {
      rs.damageAccepted = true
      setRolls(_newRolls)
    }
  }

  const recordReroll = (idx: number) => {
    const _newRolls = [...rolls]
    const rs = _newRolls[idx]
    if (!rs.heroDiceSpent) {
      rs.heroDiceSpent = true
      setRolls(_newRolls)
    }
  }

  const startRolling = () => {
    reset()

    const _rollSets = []
    for (var i = 0; i < dmgCount; i++) {
      const rs: RollSet = { index: i, rolls: [], reroll: [], karmaSpent: 0, heroDiceSpent: false, damageAccepted: false}
      rs.rolls.push(rollDie())
      rs.reroll.push(rollDie()) // I am rolling rerolls now so resetting doesnt let you try for a better roll
      if (saveWithAdvantage) {
        rs.rolls.push(rollDie())
        rs.reroll.push(rollDie())
      }

      rs.rolls.sort((r1, r2) => r2 - r1)
      rs.reroll.sort((r1, r2) => r2 - r1)


      _rollSets.push(rs)
    }
    setRolls(_rollSets)
  }

  const areAllResolved = () => {
    if (rolls.length === 0) {
      return true
    }

    for (const rs of rolls) {
      const bestRollWithKarma = (rs.rolls[0] + rs.karmaSpent)
      const bestRerollWithKarma = rs.heroDiceSpent ? (rs.reroll[0] + rs.karmaSpent) : 0
      const hasMetTarget = bestRollWithKarma >= saveTarget || (rs.heroDiceSpent && bestRerollWithKarma >= saveTarget)

      if (!rs.damageAccepted && !hasMetTarget) {
        return false
      }
    }

    return true
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
                              onClick={() => setDmgCount(dmgCount - 1)}
                              disabled={diceRolled}
                  >
                    <RemoveCircle/>
                  </IconButton>

                  <TextField value={dmgCount}
                    onChange={(ev) => setDmgCount(Number(ev.target.value))}
                    type='number'
                    disabled={diceRolled}
                    sx={{ maxWidth: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />

                  <IconButton color="primary" 
                              onClick={() => setDmgCount(dmgCount + 1)}
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
                Roll Save{dmgCount > 1 ? 's' : ''}
              </Button>
            )}

            {diceRolled && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                {
                  rolls.map((rs) => (
                    <SaveRollChain key={rs.index}
                                   idx={rs.index}
                                   rolls={rs.rolls}
                                   rerolls={rs.heroDiceSpent ? rs.reroll : undefined}
                                   karmaLeft={karmaLeft}
                                   karmaSpent={rs.karmaSpent}
                                   damageAccepted={rs.damageAccepted}
                                   saveTarget={saveTarget}
                                   heroDiceLeft={heroDiceLeft}
                                   onSpendKarma={recordKarmaSpent}
                                   onSpendHeroDie={recordReroll}
                                   onAcceptDamage={recordWoundTaken}
                    />
                  ))
                }
              </div>
            )}

            <Divider flexItem sx={{ mt: 3, mb: 3}} />

            <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-around' }}>
              <Typography>Strikes Left: {strikes - totalWoundsTaken}</Typography>
              <Typography>Karma Left: {karmaLeft}</Typography>
              <Typography>Hero Dice Left: {heroDiceLeft}</Typography>
            </Stack>

            {strikes - totalWoundsTaken < 1 && (
              <Typography sx={{ mt: 2, color: 'red' }}>This attack would kill you!</Typography>
            )}
          </Stack>

          <DialogActions>
            { diceRolled ? (
              <>
                <Button variant="outlined" onClick={reset}>Reset</Button>
                <Button variant="contained" disabled={!areAllResolved()} onClick={commitChanges}>Done</Button>
              </>
            ) : (
              <Button variant="contained" onClick={closeDialog}>Cancel</Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}