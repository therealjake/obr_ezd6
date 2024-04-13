import React from 'react'

import { Button, Typography } from '@mui/material'
import { AddCircle, LooksOneTwoTone, LooksTwoTwoTone, Looks3TwoTone, Looks4TwoTone, Looks5TwoTone, Looks6TwoTone, RemoveCircle } from '@mui/icons-material'

export function D1({ size }) {
  const ss = size ? Number(size) : 20
  return <LooksOneTwoTone sx={{ color: "red", width: ss, height: ss, verticalAlign: 'middle' }} />
}
export function D2({ size }) {
  const ss = size ? Number(size) : 20
  return <LooksTwoTwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}
export function D3({ size }) {
  const ss = size ? Number(size) : 20
  return <Looks3TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}
export function D4({ size }) {
  const ss = size ? Number(size) : 20
  return <Looks4TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}
export function D5({ size }) {
  const ss = size ? Number(size) : 20
  return <Looks5TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}
export function D6({ size }) {
  const ss = size ? Number(size) : 20
  return <Looks6TwoTone sx={{ color: "green", width: ss, height: ss, verticalAlign: 'middle' }} />
}

export default function Rules({ onJumpToMagick }) {
  return (
    <div style={{ marginTop: 20, height: '100%', width: 680 }}>
      <Typography variant="h4">How To Play EZD6</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        The Basics
      </Typography>
      <Typography>
        EZD6 is designed to be very easy to learn and fast to play. The basic mechanics are simple.
        Decide what you want to do.
        The GM will set a target number.
        The average task requires a 3 or better on a 6-sided die. (EZ = easy, amirite).
        Typically, you will roll a single 6 sided die. Roll the target number or above and success!
        A roll of a <D1 /> is always a failure and a <D6 /> is always a success.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Boons and Banes
      </Typography>
      <Typography>
        Your character start the game as an experienced, trained adventurer.
        Depending on your background, you will have training in various tasks. This training will give
        you <b>Boons</b> in related activities. Each Boon relevant to a roll lets you roll one additional die.
        Thus, a trained Warrior attacking with a sword rolls 2d6, keeping the higher of the two rolls.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Some situations (such as fighting while blinded or restrained) are harder than usual, imposing a <b>Bane</b>.
        You will roll multiple dice and take the worst result.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Three Strikes And…
      </Typography>
      <Typography>
        Health is measured in "strikes". For most characters, suffer three strikes and you are out (dead, kaput, extinct, bustified, sorry).
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Your first line of defense is your <b>Armor</b>. Each character has a different level of armor.
        For each strike you take, you can roll a d6. Every roll that meets or beats your armor level blocks
        the damage.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Some dangers such as falling boulders, lightning strikes, poison, etc cannot be absorbed by damage.
        In that scenario, you will roll your <b>Miraculous Save</b>. Again, beating your target number cancels a strike of damage.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Once you lose your last strike, your character is DEAD 💀. In rare circumstances your party might be given a last heroic opportunity to save your character but generally speaking, three strikes and you are out.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Karma and Hero Dice
      </Typography>
      <Typography>
        You have two additional tools to aid you. You have a pool of <b>Karma</b> points (most characters start with 3).
        You can spend Karma to raise the roll of one die by one pip per point spent.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Karma cannot be used to raise a <D1 />. Karma cannot be used on certain rolls (magic and miracles chiefly).
      </Typography>
      <Typography sx={{ mt: 1 }}>
        You can get more Karma! Once per turn, if you fail a roll, you earn a point of Karma.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        You also start the game with a single <b>Hero Die</b>. You can spend your Hero Die at any time to re-roll <b>any</b> die
        roll. You can buy another Hero Die by spending 5 Karma.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Critical Hits
      </Typography>
      <Typography>
        Whenever you roll a <D6 />, you automatically succeed on whatever
        you were doing AND you have the potential for a critical hit.
        Roll an additional die for every <D6 /> you rolled.
        Every <strong>additional</strong> <D6 /> deals an additional hit AND can be rolled again.
        This is a great time to spend Karma to turn those 5's into criticals. (Or even 3's or 4's, if you are feeling spendy with Karma).
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Magick and Miracles
      </Typography>
      <Typography>
        Some characters can harness powers arcane. Devout characters can call on their deity for miracles.
        Both of these are a little involved, the rules are detailed on the tab labelled
        <Button onClick={onJumpToMagick}
                sx={{ color: 'blue' }}
                size="small"
        >
          RULES (MAGICK)
        </Button>
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Combat
      </Typography>
      <Typography>
        Again, combat in EZD6 is simpler than many other systems you may have played. Each of the players take their
        turn, then the monsters get a turn.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        On your turn you can move (distances are all abstracted into "near" and "far") and take one action. Sample actions include:
      </Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Attack</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Cast a spell</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Use a scroll</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Activate a device</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Move a second time</Typography>
      <Typography sx={{ mt: 1 }}>
        You can also freely take simple actions…
      </Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Say something (better be clever!)</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Draw a weapon</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Drink a potion</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Glance at your surroundings</Typography>
      <Typography sx={{ mt: 1 }}>
        Most attacks are resolved by rolling a d6 (more if your training gives you Boons) and comparing the best roll to
        the victim's target number. If you hit, you deal one strike of damage (all weapons deal one strike).
        Critical hits are the most common way to cause more damage.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        If you are new to roleplaying, do not feel limited to the list of actions above. Swing from a
        chandelier, tip over a boiling cauldron, dance a jig - whatever sounds awesome in the moment.
        Describe what you'd like to do and the GM will figure out the results (often depending on a die roll).
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Healing
      </Typography>
      <Typography>
        Three strikes goes fast! Fortunately there are a number of ways your character might be able to heal:
        <Typography sx={{ ml: 5 }} variant="body2">Drink a healing potion</Typography>
        <Typography sx={{ ml: 5 }} variant="body2">Chirurgeons have access to healing kits</Typography>
        <Typography sx={{ ml: 5 }} variant="body2">Friars can heal the party once per day</Typography>
        <Typography sx={{ ml: 5 }} variant="body2">The devout may ask for miraculous healing</Typography>
        <Typography sx={{ ml: 5 }} variant="body2">Resting overnight in the field restores one strike</Typography>
        <Typography sx={{ ml: 5 }} variant="body2">Resting overnight in a comfortable inn restores ALL strikes</Typography>
        Each adventure may provide other opportunities for healing. Keep your eyes open!
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Glossary
      </Typography>
      <Typography>
        <b>Ancestry</b> Called "species" or "race" in other games. Human, dwarf, elf. You get it.
      </Typography>
      <Typography>
        <b>Hero Path</b> Called "class" in other games. This describes your character's form of training & expertise
      </Typography>
      <Typography>
        <b>Inclinations</b> Similar to "feats" in some other games. Unique powers that customize and empower your character
      </Typography>
      <Typography>
        <b>Strikes</b> A measure of health. Run out of strikes and you die.
      </Typography>
      <Typography>
        <b>Karma</b> A pool of points you can spend to improve your die rolls. Gained when you fail at die rolls.
      </Typography>
      <Typography>
        <b>Hero Die</b> A special die you can expend for the chance to reroll any roll.
      </Typography>
      <Typography>
        <b>Armor</b> The lower the number, the more armored you are. Armor can absorb (prevent) damage
      </Typography>
      <Typography>
        <b>Miraculous</b> The lower the number, the better you are at escaping dangerous situations.
      </Typography>
      <Typography>
        <b>Boon</b> Applied situationally to dice rolls. Each Boon lets you roll an additional die (you keep the best roll, don't add them up)
      </Typography>
      <Typography>
        <b>Bane</b> Opposite of Boons. Each Boon forces you to roll an additional die, taking the worst roll.
      </Typography>

      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}
