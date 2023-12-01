import React, { useEffect, useState } from 'react'
import { Box, Checkbox, Chip, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { HUMAN } from './Ancestry'

export const ALCHEMIST = 'Alchemist'
export const DANDY = 'Dandy'
export const DANGER_SENSE = 'Danger Sense'
export const FATE_TOUCHED = 'Fate Touched'
export const FIGHTER = 'Fighter'
export const IRON_WILL = 'Iron Will'
export const MARKSMAN = 'Marksman'
export const SNEAKY = 'Sneaky'
export const TRAPFINDER = 'Trap Finder'

const INCLINATION_TYPES = [
  { inclination: ALCHEMIST,
    note: 'Potion master. Start with 2 healing or random potions.',
    boon: 'Identifying alchemical substances and a boon identifying alchemical substances',
  },
  { inclination: 'Attuned', note: 'You are able to fight blind. You can escape areas of obscured visibility' },
  { inclination: 'Born blessed', note: 'You start each session with 6 karma instead of 3' },
  { inclination: 'Catlike', note: 'You can only be knocked prone by a crit. You have 4+ miraculous saves when falling.' },
  { inclination: 'Checkmate', note: 'You can intercept foes before they attack a target near you. You get a free-action opportunity attack if enemies move out of melee with you. If you hit, they cannot move.' },
  { inclination: 'Chirurgeon', note: 'You can heal allies 1 Strike given a few minutes and supplies. You start with 6 bandages.' },
  { inclination: DANDY,
    note: 'Your slick speaking and appearnce given you a boon on all social checks',
    boon: 'All social checks',
  },
  { inclination: DANGER_SENSE,
    note: 'You cannot be surprised and have a boon avoiding traps',
    boon: 'Avoiding traps',
  },
  { inclination: 'Devout', note: 'You may call on your diety for MIRACLES' },
  { inclination: 'Faithful', note: 'Demons and Undead can only hit you on a 5+' },
  { inclination: 'Familiar', note: 'A small magical imp obeys your simple commands.' },
  { inclination: FATE_TOUCHED, note: 'You start each session with 2 hero dice' },
  { inclination: FIGHTER,
    note: 'You are trained in melee weapons. Does not stack.',
    boon: 'Melee attacks'
  },
  { inclination: 'Hatred of the Unholy', note: 'Your attacks are powered by hatred of the undead and demons. If you roll a 6 while attacking either, you automatically inflict one additional strike and can keep rolling the crit' },
  { inclination: 'Hedge Wizard', note: 'You can use scrolls to cast spells. Start with 2 random scrolls' },
  { inclination: 'Inspiring', note: 'You can share karma points with anyone you can see' },
  { inclination: IRON_WILL,
    note: 'You have boons to resist mental attacks and fear',
    boon: 'Resist mental and fear attacks',
  },
  { inclination: 'Lockpicking', note: 'You can pick any lock. Roll 1D6 to see how fast you are (higher is better). You start with 3 lockpicks, and they break on a roll of 1.' },
  { inclination: MARKSMAN,
    note: 'You have a boon in ranged weapons. Does not stack.',
    boon: 'Ranged attacks',
  },
  { inclination: 'Nimbus of Light', note: 'Once a day, as a free action you can summon a floating globe of light which follows you until dismissed.' },
  { inclination: 'Slippery', note: 'Escape any non-attack danger by rolling a 4+' },
  { inclination: SNEAKY,
    note: 'You have a boon to hide and move around unseen',
    boon: 'Stealth tasks',
  },
  { inclination: 'Sticky Fingers', note: 'You can steal any small object. Roll a 1D6. On a 1 your theft is noticed.' },
  { inclination: 'Swift Attack', note: 'You can melee attack every enemy next to you. Roll for each target' },
  { inclination: 'Thaumaturgy', note: 'You can conjure minor + temporary magickal effects at will. Minor telekinesis or illusions' },
  { inclination: 'Tough Bastard', note: 'You are hard to kill. When you are about to lose your last strike roll 1D6. On a 4+, ignore the damage.' },
  { inclination: TRAPFINDER,
    note: 'You have boons to find and disarm traps',
    boon: 'Finding and disarming traps',
  },
  { inclination: 'Treasure Sense', note: 'You always detect hidden treasure if nearby' },
  { inclination: 'Victory in Failure', note: 'Once a turn, earn 2 karma instead of 1 on a failed roll' },
]

export default function Inclinations({ ancestry, onChange }) {
  const [inclinations, setInclinations] = useState([])

  const handleInclination = (ev) => setInclinations(ev.target.value)

  useEffect(() => {
    const inclinationObjects = INCLINATION_TYPES.filter(it => inclinations.includes(it.inclination))
    onChange(inclinationObjects)
  }, [inclinations])

  const maxAllowed = (ancestry === HUMAN) ? 3 : 2
  const inclination = `Inclinations (Select ${maxAllowed})`

  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
      <FormControl style={{ flex: 1, marginTop: 20, width: 600 }}>
        <InputLabel id="inclinations">{inclination}</InputLabel>
        <Select labelId="inclinations"
                value={inclinations}
                onChange={handleInclination}
                label={inclination}
                variant="outlined"
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
        >
          {
            INCLINATION_TYPES.map(it => (
              <MenuItem key={it.inclination} value={it.inclination} style={{ width: 600 }}>
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item xs={2}>
                    <Checkbox checked={inclinations.some(i => i === it.inclination)}/>
                  </Grid>
                  <Grid item xs={10}>
                    <b>{it.inclination}</b>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={10} style={{ textWrap: 'wrap' }}>
                    {it.note}
                  </Grid>
                </Grid>
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <ul>
      { INCLINATION_TYPES.filter(it => inclinations.includes(it.inclination)).map(it => (
        <li key={it.inclination}>{it.note}</li>
      ))}
      </ul>
    </div>
  )
}
