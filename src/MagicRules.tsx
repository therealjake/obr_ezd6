import { Typography } from '@mui/material'
import { D1, D6 } from './Rules'

export default function MagicRules() {
  return (
    <div style={{ marginTop: 20, height: '100%', width: 680 }}>
      <Typography variant="h4">EZD6 - Magick and Miracles</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Use Your Imagination
      </Typography>
      <Typography>
        Unlike traditional RPGs, you will make up spells on the fly. The bigger the effect, the harder
        the spell is to cast. Your circle of magick will give you some ideas of spells your character knows
        but feel free to invent new spells asyou play. Some guidelines on difficulty levels are given later on.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Spell Resistance
      </Typography>
      <Typography>
        All spells must overcome resistance to succeed. Spell resistance is determined by the target rolling 1d6.
        This establishes the target number the caster must meet (or beat).

        More powerful effects and targeting additional enemies will increase the number of dice rolled to
        set the target number (determined by the highest value rolled).
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Power Level
      </Typography>
      <Typography>
        Once the spell resistance target number is determined, the caster decides what <b>Power Level</b> they
        will attempt. This is the number of dice (from one to three) the caster will roll to
        try to beat the target number.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        If the caster meets or beats the target number, the spell succeeds. If the caster rolls a
        <D1 /> the spell <i>fails</i> (even if the caster ALSO rolled a <D6 />). This means that choosing
        a higher power level comes with risks of failure.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Karma cannot be used on this roll, although a Hero Die can be spent to re-roll any die.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Spellburn
      </Typography>
      <Typography>
        If a spell fails due to rolling a <D1/>, the caster can elect to suffer <b>Spellburn</b>. The caster takes one strike
        for each <D1/> rolled, and the spell succeeds.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Anchoring
      </Typography>
      <Typography>
        Spells which have an ongoing effect may require <b>Anchoring</b>. This is a sustained effort
        of concentration by the spellcaster to maintain the magickal effect. The anchor is lost if the caster…
      </Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Suffers a strike</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Casts another spell</Typography>
      <Typography sx={{ ml: 5 }} variant="body2">Goes unconcious</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Miracles
      </Typography>
      <Typography>
        Characters with the <b>Devout</b> inclination can call upon their deity for supernatural aid.
        Like spellcasting, the devotee describes what effect they wish for.
        A miracle may not cause damage and you can only ask for a given miracle a single time.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        A target number is set
        like Spell Resistance, and the devotee choses to roll one to three dice depending on the
        urgency of their prayers.
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Karma cannot be used on this roll, though a Hero Die can.
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Resistance for Sample Spells and Miracles
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Targeting a single enemy with a freezing ray: 1d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Detect any nearby hidden traps: 2d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Eliminate poison affecting a character: 3d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Gain limited flight: 4d6 (requires anchoring)
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Teleport to a spot within sight: 2d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Miracle: Heal all damage from a wounded ally: 2d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Miracle: Speak with the dead: 3d6
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Miracle: Ressurect a fallen friend: 6d6
      </Typography>

      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}
