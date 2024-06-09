import React, { createContext, useEffect, useState } from 'react'

import { Stack, TextField } from '@mui/material'
import Ancestry from './Ancestry'
import Inclinations from './Inclinations'
import HeroPath from './HeroPath'
import Health from './Health'
import Karma from './Karma'
import HeroDie from './HeroDie'
import Spacer from './Spacer'
import Boons from './Boons'
import Roller from './Roller'
import CharacterFeatures from './CharacterFeatures'
import MiraculousSave from './MiraculousSave'
import Armor from './Armor'
import { LoadCharacterField, SaveCharacterField, syncCharacter } from './CharacterStore'
import { BroadcastHandler } from './BroadcastHandler'
import Inventory from './Inventory'
import Allies from './Allies'
import CharacterStatContext, { useKarmaContext } from './CharacterStatContext'

// --- To add ---
// Sharing die rolls
//   I think I need to add to a list of items (and be listening for changes)
//   How do I prevent overwrites and data collisions? Maybe just via unique IDs?
//   How do I keep the list of dice rolls manageable?
// Reset character sheet
// Change presentation of strikes

// --- Done ---
// Sharing character data

export default function Character() {
  const [name, setName] = useState('')
  const [heroPath, setHeroPath] = useState('')
  const [subclass, setSubclass] = useState('')
  const [ancestry, setAncestry] = useState(null)
  const [inclinations, setInclinations] = useState([])
  const [boons, setBoons] = useState([])
  const [strikes, setStrikes] = useState(3)
  const [inventory, setInventory] = useState('')

  const { karma } = useKarmaContext()

  const handleName = (ev) => {
    const newName = ev.target.value
    setName(newName)
    if (newName) {
      SaveCharacterField('name', newName)
    }
  }

  const handleAncestry = (ancestry) => setAncestry(ancestry)

  const handleHeroPath = (hp, sc) => {
    setHeroPath(hp)
    if (hp) {
      SaveCharacterField('heroPath', hp)
    }

    setSubclass(sc)
    if (sc) {
      SaveCharacterField('subclass', sc)
    }
  }

  const handleInclinations = (inclinations) => setInclinations(inclinations)

  useEffect(() => setName(LoadCharacterField('name') || ''), [])

  // TODO: Extract syncing-to-owlbear elsewhere
  useEffect(() => {
    const doSync = async () => {
      syncCharacter({ name, ancestry, heroPath, subclass, inclinations, karma, strikes, inventory })
      BroadcastHandler.notifyOfCharacterUpdate()
    }

    doSync()
  }, [name, ancestry, heroPath, subclass, inclinations, strikes, karma, inventory])

  return (
    <CharacterStatContext>
      <div style={{display: 'flex', marginTop: 10, flexDirection: 'column', width: 680 }}>
        <Stack direction="row">
          <TextField sx={{ flex: 5 }} label="Name" value={name} onChange={handleName} />
          <Spacer/>
          <Roller boons={boons} />
        </Stack>

        <Stack direction="row"
              justifyContent="space-between"
              style={{ marginTop: 20 }}
        >
          <Ancestry onChange={handleAncestry} />
          <Spacer />
          <HeroPath onChange={handleHeroPath} />
        </Stack>

        <Inclinations ancestry={ancestry} heroPath={heroPath} onChange={handleInclinations} />

        <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Health heroPath={heroPath} strikes={strikes} onChangeStrikes={setStrikes} />
          <Karma />
          <HeroDie inclinations={inclinations} />
          <Armor heroPath={heroPath} inventory={inventory} />
          <MiraculousSave heroPath={heroPath} />
        </Stack>

        <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        </Stack>

        <CharacterFeatures ancestry={ancestry}
                          heroPath={heroPath}
                          subclass={subclass}
                          inclinations={inclinations}
        />

        <Boons ancestry={ancestry}
              heroPath={heroPath}
              inclinations={inclinations}
              onCalculate={(b) => setBoons(b)}
        />

        <Inventory characterName={name} heroPath={heroPath} inclinations={inclinations} onInventoryChange={setInventory} />

        <Allies />
      </div>
    </CharacterStatContext>
  )
}
