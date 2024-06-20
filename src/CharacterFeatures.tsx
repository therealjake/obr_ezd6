import React from 'react'

import { AIR_ELEMENTALIST, BEASTMASTER, BLASTMASTER, BOTANICALIST, BRUTE, CONJURER, DELVER, EARTH_ELEMENTALIST, FIRE_ELEMENTALIST, FRIAR, ILLUSIONIST, NECROMANCER, RASCAL, SEER, SHADOWEAVER, SHAPESHIFTER, SKALD, WARDEN, WARRIOR, WATER_ELEMENTALIST } from './HeroPath'
import { Typography } from '@mui/material'
import { DWARF, ELF, GOBLIN, HALFLING, HUMAN } from './Ancestry'

const ANCESTRY_FEATURES = [
  { ancestry: HUMAN, featureName: 'Versatile', feature: 'Pick an additional inclination' },
  { ancestry: ELF, featureName: 'Twilight Sight', feature: 'See twice as far in dim light' },
  { ancestry: DWARF, featureName: 'Tunnel Sight', feature: 'See twice as far in dim light' },
  { ancestry: HALFLING, featureName: 'Another Breakfast', feature: 'Start with a healing potion. Heals 1 strike.' },
  { ancestry: HALFLING, featureName: 'Underfoot', feature: 'Larger foes have a hard time hitting you (+1 on target number).' },
  { ancestry: GOBLIN, featureName: 'Nooks and Crannies', feature: 'As part of your move action you can take shelter behind any bit of cover. Enemies cannot attack you until your next turn.' },
  { ancestry: GOBLIN, featureName: 'Night Sight', feature: 'See twice as far in dim light' },
]

const PATH_FEATURES = [
  { heroPath: BEASTMASTER, featureName: 'Beastspeech', feature: 'You can communicate with any animal' },
  { heroPath: BEASTMASTER, featureName: 'Friendship', feature: 'Given time and opportunity, you can convince any beast to assist your party' },
  { heroPath: BEASTMASTER, featureName: 'Hunting Companion', feature: 'You have a beast companion. The beast stays with you as long as it is well treated. The beast can be small (1 strike) or medium (2 strikes) in size. The beast may have boons of its own.' },
  { heroPath: BRUTE, featureName: "Ain't got Time to Bleed", feature: "You survive damage others can't. You have 5 strikes instead of 3." },
  { heroPath: BRUTE, featureName: 'Enrage', feature: 'Any time you hit an enemy in combat you can take one strike to inflict an extra strike of damage.' },
  { heroPath: BRUTE, featureName: 'Superstitious', feature: 'You have a boon to resist any magick you do not want to affect you.' },
  { heroPath: CONJURER, featureName: 'Mystic Barrier', feature: 'As an action you can shield yourself with arcane energy. This lasts until it absorbs a single strike or you fall unconcious.' },
  { heroPath: CONJURER, featureName: 'Master of Magick', feature: 'Gain mastery in one school of Sorcery' },
  { heroPath: CONJURER, featureName: 'Seeker of Sorcery', feature: 'You can cast magick from scrolls. Start the game with two random scrolls.' },
  { heroPath: CONJURER, featureName: 'Wand or Staff', feature: 'You can shoot bolts of arcane energy from your wand or staff. This is a ranged attack. Roll 1d6, deals one strike on a hit. This attack does not benefit from critical hits.' },
  // { heroPath: DELVER, featureName: 'Geared Up', feature: 'In addition to your free shop gear, you also have mountain climbing equipment, 50\' of thin strong rope, torches, a small hammer, and white chalk sticks.' },
  { heroPath: DELVER, featureName: 'Geared Up', feature: "You make take a unique item called the Delver's Pack. As a free action you can take from the pack any smallish mundane exploring item you might need. (No torches)" },
  { heroPath: DELVER, featureName: 'Jack', feature: 'You may pick one additional inclination.' },
  { heroPath: FRIAR, featureName: 'Empathic Healing', feature: 'As a free action you can absorb a wound from anyone nearby. They heal one, you suffer one.' },
  { heroPath: FRIAR, featureName: 'Healing Light', feature: 'Once a day as an action you call down the holy light of your deity. Roll dice equal to the number of nearby allies. For each 4+ you roll, each ally within range heals one strike. You cannot use karma to boost this roll. Recharge this ability by spending 5 karma.' },
  { heroPath: FRIAR, featureName: 'Avenging Light', feature: 'Once a day as an action you call down the holy light of your deity. Each enemy within range takes one strike (2 if undead or demon). Recharge this ability by spending 5 karma.' },
  { heroPath: RASCAL, featureName: 'Tricks', feature: 'As a free action, once per turn, you can avoid a single melee attack. Describe how you avoid the hit. Any attack roll except a 6 can be avoided.' },
  { heroPath: RASCAL, featureName: 'Gank', feature: 'If you surprise a foe or hit an enemy engaged with one of your allies, you roll 2d6 attack dice and inflict a strike of damage for each hit. Each hit can crit.' },
  { heroPath: RASCAL, featureName: 'Quick on your Feet', feature: 'When rolling an armor or miraculous save, roll 2d6 and use the higher roll.' },
  { heroPath: SKALD, featureName: 'Scrollmaster', feature: 'You can cast magick from scrolls. You start with 2 random scrolls' },
  { heroPath: SKALD, featureName: 'Traveler', feature: 'On your travels you have perfected a skill. Gain a boon in any skill you like' },
  { heroPath: SKALD, featureName: 'Strands of Fate', feature: 'Through study of omens, you can turn luck in the party`s favor. When you are near, party members can use Karma against the game master.' },
  { heroPath: WARRIOR, featureName: 'Shield Sacrifice', feature: 'As a free action you push your shield in front of an attack targeting you or a nearby ally. All damage is deflected but your shield is destroyed. You can wait to see the damage roll before activating this ability. You can avoid breaking the shield by spending 5 karma. Once your shield is broken, your armor save goes from 3+ to 4+.' },
  { heroPath: WARRIOR, featureName: 'Brutal Strike', feature: 'While wielding a weapon with both hands you crit on a 5+.' },
  { heroPath: WARRIOR, featureName: 'Dual Weapns', feature: 'While wielding weapons in both hands, you have an extra boon while fighting in melee.' },
  { heroPath: WARDEN, featureName: 'Trailfinder', feature: 'You can follow traces left by any passing creature.' },
  { heroPath: WARDEN, featureName: 'Forager', feature: 'In the wilderness you always know how to hunt, forage, and fish for sustenance. You can feed yourself and the party while traveling.' },
]

const SUBCLASS_FEATURES = [
  { subclass: BLASTMASTER, featureName: 'Blast Away', feature: 'Your magick inflicts 2 strikes instead of 1.' },
  { subclass: BLASTMASTER, featureName: 'Unstable', feature: 'If you are hit with a melee attack, your attacker takes one strike.' },
  { subclass: BLASTMASTER, featureName: 'Heightened Spellburn', feature: 'When you spellburn, you take a strike of damage. Roll a 1d6 for additional chaotic effects.' },

  { subclass: BLASTMASTER, featureName: 'Magic Detector', feature: 'You can detect the presence of nearby magick.' },
  { subclass: BOTANICALIST, featureName: 'Plant Growth', feature: 'As an action you can cause any nearby plant life to grow enormously. Larger plants take a few turns to grow. Examples: A wall of thorns or a vine growing upwards like a rope. The plant growth requires anchoring. Enemies retrained by plants can break free using an action.' },

  { subclass: AIR_ELEMENTALIST, featureName: 'Impacting Bolts', feature: 'Your magickal attacks knock targets backwards.' },
  { subclass: AIR_ELEMENTALIST, featureName: 'Air Control', feature: 'Summon a whirlwind. This can move friends or enemies. Requires anchoring and 1 karma to sustain for each round after the first.' },
  { subclass: AIR_ELEMENTALIST, featureName: 'Whispers', feature: 'You can effortlessly summon tiny swirls of air with which to do tricks.' },

  { subclass: EARTH_ELEMENTALIST, featureName: 'Binding Blast', feature: 'Your magickal attacks cause the very ground to grab at targets you hit, slowing them.' },
  { subclass: EARTH_ELEMENTALIST, featureName: 'Mold Earth', feature: 'You can reshape mud, dirt, or soil in an area. This requires anchoring and 1 karma to sustain for each round after the first.' },
  { subclass: EARTH_ELEMENTALIST, featureName: 'Dust Clouds', feature: 'You can effortlessly summon swirls of dust and pebbles with which to do tricks.' },

  { subclass: WATER_ELEMENTALIST, featureName: 'Water Blast', feature: 'Your magickal attacks soak your target with water.' },
  { subclass: WATER_ELEMENTALIST, featureName: 'Shape Water', feature: 'You can draw forth and manipulate the water in an area. This requires anchoring and 1 karma to sustain for each round after the first.' },
  { subclass: WATER_ELEMENTALIST, featureName: 'Water Tricks', feature: 'You can effortlessly control small amounts of water with which to perform tricks.' },

  { subclass: FIRE_ELEMENTALIST, featureName: 'Fire Bolts', feature: 'Your magickal attacks ignite your target.' },
  { subclass: FIRE_ELEMENTALIST, featureName: 'Wall of Fire', feature: 'Summon a wall of magical fire. This requires anchoring and 1 karma to sustain for each round after the first.' },
  { subclass: FIRE_ELEMENTALIST, featureName: 'Fire Wisps', feature: 'You can effortlessly summon sparks and small flames.' },

  { subclass: ILLUSIONIST, featureName: 'Create Illusion', feature: 'You enchant the minds of others, forcing them to see (or not see) or hear whatever you wish. Illusions may be seen through and dissipate if the target takes any damage. Illusions require anchoring to sustain' },
  { subclass: ILLUSIONIST, featureName: 'Greater Illusion', feature: 'Your illusions can target multiple creatures, with greater difficulty. A small group of enemies resist with 2d6, larger groups resist with 3d6.' },

  { subclass: NECROMANCER, featureName: 'Raise Dead', feature: 'You can raise the dead to create undead minions. The more you raise, the greater the difficulty. Keeping the dead animated requires spell anchoring.' },
  { subclass: NECROMANCER, featureName: 'Ward Undead', feature: 'As an action you can cause hostile undead to keep their distance.' },
  { subclass: NECROMANCER, featureName: 'Undead Affinity', feature: 'You carry an animated talking skull. Additionally, you can communicate simple ideas with the dead.' },

  { subclass: SEER, featureName: 'Psychometry', feature: 'With a moment\'s study you can see the past of any object' },
  { subclass: SEER, featureName: 'Spirit Companion', feature: 'An invisible spirit is your constant companion. You can speak to the creature, but no one else can see the spirit and everyone suspects you are insane' },
  { subclass: SEER, featureName: 'Precognition', feature: 'You see attacks coming before they even begin. Roll a 3+ to avoid any attack. If attacked in melee and you save, your attacker takes 1 strike' },

  { subclass: SHADOWEAVER, featureName: 'Shape Shadows', feature: 'You can reshape shadows into whatever form you choose. You may cover yourself in shadows for stealth or an enemy to blind it. Maintaining this in bright sunlight is very difficult, requiring 1 karma per turn.' },
  { subclass: SHADOWEAVER, featureName: 'Shadowsight', feature: 'You can see in absolute darkness' },

  { subclass: SHAPESHIFTER, featureName: 'Enhanced Anchoring', feature: 'Your affinity for shapeshifting makes your anchoring more durable. You only lose your anchor if hit with a critical.' },
  { subclass: SHAPESHIFTER, featureName: 'Shapechange - Small beast', feature: 'You transform into a small beast (squirrel, cat, etc). This form can take 1 strike. Changing in combat requires overcoming 1 resistance die.' },
  { subclass: SHAPESHIFTER, featureName: 'Shapechange - Small beast', feature: 'You transform into a medium beast (dog, pig, etc). This form can take 2 strikes. Changing in combat requires overcoming 1 resistance die.' },
  { subclass: SHAPESHIFTER, featureName: 'Shapechange - Small beast', feature: 'You transform into a large beast (horse, panther, etc). This form can take 3 strikes. Changing in combat requires overcoming 2 resistance dice.' },
  { subclass: SHAPESHIFTER, featureName: 'Shapechange - Small beast', feature: 'You transform into a tiny flying beast (insect, bird, etc). This form can take 1 strike. Changing in combat requires overcoming 3 resistance dice.' },
]

type CharacterFeaturesProps = {
  ancestry: string,
  heroPath: string,
  subclass: string,
  inclinations: Array<{ inclination: string, note: string }>
}

export default function CharacterFeatures({ ancestry, heroPath, subclass, inclinations }: CharacterFeaturesProps) {
  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10, marginTop: 20 }}>
      <Typography variant="h6">
        Character Features
      </Typography>
      { ANCESTRY_FEATURES.filter(a => a.ancestry === ancestry).map(f => (
        <div key={f.featureName}>
          <p style={{ padding: 0, marginTop: 10, marginBottom: 5 }}>
            <strong>{f.featureName}</strong>
            <small> ({f.ancestry})</small>
          </p>
          <p style={{ padding: 0, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
            {f.feature}
          </p>
        </div>
      ))}

      { PATH_FEATURES.filter(f => f.heroPath === heroPath).map(f => (
        <div key={f.featureName}>
          <p style={{ padding: 0, marginTop: 10, marginBottom: 5 }}>
            <strong>{f.featureName}</strong>
            <small> ({f.heroPath})</small>
          </p>
          <p style={{ padding: 0, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
            {f.feature}
          </p>
        </div>
      ))}

      { SUBCLASS_FEATURES.filter(f => f.subclass === subclass).map(f => (
        <div key={f.featureName}>
          <p style={{ padding: 0, marginTop: 10, marginBottom: 5 }}>
            <strong>{f.featureName}</strong>
            <small> ({f.subclass})</small>
          </p>
          <p style={{ padding: 0, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
            {f.feature}
          </p>
        </div>
      ))}

      { (inclinations || []).map(i => (
        <div key={i.inclination}>
          <p style={{ padding: 0, marginTop: 10, marginBottom: 5 }}>
            <strong>{i.inclination}</strong>
            <small> (Inclination)</small>
          </p>
          <p style={{ padding: 0, marginTop: 10, marginLeft: 15, marginBottom: 5 }}>
            {i.note}
          </p>
        </div>
      ))}
    </div>
  )
}
