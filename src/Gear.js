import React, { useEffect, useState } from 'react'

import { Button, InputLabel, Stack, TextField, Typography } from '@mui/material'
import Spacer from './Spacer'
import { CONJURER, SKALD } from './HeroPath'
import { ALCHEMIST, HEDGE_WIZARD } from './Inclinations'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

const GEAR = [
  'Rope (50\')',
  '10\' Pole',
  'Hunting Knife',
  'Backpack',
  'Extra rations',
  'Metal spikes',
  'Lantern',
  'Torches',
  'Nails',
  'Large sack',
  'Firestarter',
  'Waterskin',
  'Small hammer',
  'Oil flask',
  'Crowbar',
  'Chisel',
  'Grappling hook',
  'Chalk sticks',
  'Whistle',
  'Horn',
  'Padlock and key',
  'Pot of grease',
]

const SPECIAL_GEAR = [
  'Smelling salts',
  'Holy water',
  'Perfume',
  'Spyglass',
  'Holy symbol',
  'Manacles',
  'Quill, ink, and parchment',
  'Makeup kit',
  'Small bell',
  'Air bladder',
  'Magnifying lens',
  'Incense',
  'Poison antidote',
  'Moonshine',
  'Bone dice',
  'Caltrops',
  'Hidden pocket',
  'Lodestone',
  'Handheld mirror',
  'Exotic spices',
  'Bellows',
  'Fake jewels',
  'Deck of cards',
  'Wheelbarrow',
]

const SCROLLS = [
  'Boost: Pick any skill. You have an additional boon in that skill for one scene',
  'Summon Elemental: Summon an elemental of your choice for one scene. A conjurer can anchor the conjuration to keep the summon up to a day',
  'Befriendship: An enemy minion (weak monster) is your friend as long as you treat it well',
  'Floating: For one scene, you can choose to walk over any fluid',
  'Scene Unseen: For one scene, you can turn invisible as an action. Doing anything other than moving makes you visible again',
  'Mirror Walk: You and up to a dozen others can teleport from one mirrored surface to another within 500 miles',
  'Phendrex`s Pheremon: One particular type of creature will not harm you for a day. Harming a creature breaks the effect on that creature',
  'Mage Bubble: You and up to a dozen others are encased in a watery bubble for a scene. The water protects from all fire and can be moved around by the will of the caster. Everyone within can breathe normally',
  'Mr. Bones: You can animate a skeleton up to horse size for one day. It obeys simple commands and can take one strike',
  'Hypnotize: One creature that can understand you will answer three questions truthfully then forget what happened.',
]

const POTS = [
  'Perfected Eye: You cannot be blinded and you double your vision in dim light',
  'Malook`s Revenge: For one scene, whenever you are hit, roll 1d6. On a 4+ your attacker takes one unblockable strike.',
  'Wall Clinging: For a day, gain the ability to walk on any vertical surface',
  'Dormak`s Potion of Speed: For one scene, take two turns on each of your turns. When the potion wears off you take a strike of damage',
  'Greater Healing Potion: Heal two strikes',
]

export default function Gear({ heroPath, inclinations }) {
  const [gear, setGear] = useState('')
  const [weapons, setWeapons] = useState('')
  const [magic, setMagic] = useState('')
  const [shopCount, setShopCount] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const _g = await LoadCharacterField('shopGear')
      setGear(_g)
      const _m = await LoadCharacterField('magicGear') || ''
      setMagic(_m)
      const _w = await LoadCharacterField('weapons')
      setWeapons(_w)
    }
    loadData()
  }, [])

  const handleGear = (ev) => {
    const _g = ev.target.value
    setGear(_g)
    SaveCharacterField('shopGear', _g)
  }

  const handleMagic = (ev) => {
    const _m = ev.target.value
    setMagic(_m)
    SaveCharacterField('magicGear', _m)
  }

  const handleWeapons = (ev) => {
    const _w = ev.target.value
    setWeapons(_w)
    SaveCharacterField('weapons', _w)
  }

  const buyStuff = () => {
    const newGear = []
    while (newGear.length < 3) {
      const item = GEAR[Math.floor(Math.random() * GEAR.length)]
      if (!newGear.includes(item)) {
        newGear.push(item)
      }
    }
    newGear.push(SPECIAL_GEAR[Math.floor(Math.random() * SPECIAL_GEAR.length)])

    const _g = newGear.join('\n')
    setGear(_g)
    SaveCharacterField('shopGear', _g)

    setShopCount(shopCount + 1)
  }

  const buyPots = () => {
    const pots = []
    while (pots.length < 2) {
      const pot = POTS[Math.floor(Math.random() * POTS.length)]
      if (!pots.includes(pot)) {
        pots.push(pot)
      }
    }

    const _p = pots.join('\n\n')
    setMagic(_p)
    SaveCharacterField('magicGear', _p)
  }

  const buyScrolls = () => {
    const scrolls = []
    while (scrolls.length < 2) {
      const scroll = SCROLLS[Math.floor(Math.random() * SCROLLS.length)]
      if (!scrolls.includes(scroll)) {
        scrolls.push(scroll)
      }
    }
    const _s = scrolls.join('\n\n')
    setMagic(_s)
    SaveCharacterField('magicGear', _s)
  }

  // Conjurer, Skald, and Hedge Wizard all get scrolls and/or potions
  const showScrolls = (heroPath === SKALD || heroPath === CONJURER || inclinations.some(i => i.inclination === HEDGE_WIZARD))
  const showPotions = heroPath === CONJURER || inclinations.some(i => i.inclination === ALCHEMIST)

  return (
    <>
      <div style={{ flex: 1, border: '1px solid darkGray', marginTop: 20, padding: 10 }}>
        <Typography variant="h6">Gear</Typography>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TextField multiline
                      rows={5}
                      placeholder="Shop gear here"
                      display={{ flex: 1 }}
                      value={gear}
                      onChange={handleGear}
                      label="Adventuring Gear"
            />
            <div>
              <Button sx={{ mt: 1}}
                      variant="contained"
                      onClick={buyStuff}
              >
                Shop (Free)
              </Button>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10  }}>
                { shopCount > 8 && <span style={{ marginLeft: 10 }}>Psssst - it's all pretty silly stuff</span>}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TextField multiline
                      rows={5}
                      value={weapons}
                      onChange={handleWeapons}
                      placeholder="Weapons, mementos, etc."
                      display={{ flex: 1 }}
                      label="Weapons and Mementos"
            />
          </div>

          {
            (showScrolls || showPotions) && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <TextField multiline
                          rows={5}
                          placeholder="Magic Items"
                          display={{ flex: 1 }}
                          value={magic}
                          onChange={handleMagic}
                          label="Magickal Gizmos"
                />
                <div>
                  { showPotions && (
                    <Button sx={{ mt: 1}} variant="contained" onClick={buyPots}>Brew Potions</Button>
                  )}
                  <Button sx={{ mt: 1}} variant="contained" onClick={buyScrolls}>Find Scrolls</Button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
