import React, { useEffect, useState } from 'react'

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
import Inventory from './Inventory/Inventory'
import Allies from './Allies'
import CharacterStatContext, { useKarmaContext, useStrikesContext } from './CharacterStatContext'
import { Boon, Inclination } from './GameTypes'

export default function Character() {
  const [name, setName] = useState('')
  const [heroPath, setHeroPath] = useState('')
  const [subclass, setSubclass] = useState('')
  const [ancestry, setAncestry] = useState<string>('')
  const [inclinations, setInclinations] = useState<Array<Inclination>>([])
  const [boons, setBoons] = useState<Array<Boon>>([])
  const [inventory, setInventory] = useState('')

  const { karma } = useKarmaContext()
  const { strikes } = useStrikesContext()

  useEffect(() => setName(LoadCharacterField<string>('name') || ''), [])

  // TODO: Extract syncing-to-owlbear elsewhere
  useEffect(() => {
    const doSync = async () => {
      syncCharacter({ name, ancestry, heroPath, subclass, inclinations, karma, strikes, inventory })
      BroadcastHandler.notifyOfCharacterUpdate()
    }

    doSync()
  }, [name, ancestry, heroPath, subclass, inclinations, strikes, karma, inventory])

  const handleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newName = ev.target.value
    setName(newName)
    if (newName) {
      SaveCharacterField('name', newName)
    }
  }

  const handleAncestry = (_ancestry: string) => {
    setAncestry(_ancestry)
  }

  const handleHeroPath = (hp: string, sc?: string) => {
    setHeroPath(hp)
    if (hp) {
      SaveCharacterField('heroPath', hp)
    }

    if (sc === undefined) {
      setSubclass('')
    } else {
      setSubclass(sc)
      SaveCharacterField('subclass', sc)
    }
  }

  const handleInclinations = (_inclinations: Array<Inclination>) => setInclinations(_inclinations)

  return (
    <CharacterStatContext>
      <div style={{display: 'flex', marginTop: 10, flexDirection: 'column', width: 680 }}>
        <Stack direction="row">
          <TextField sx={{ flex: 5 }} label="Name" value={name} onChange={handleName} />
          <Spacer />
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
          <Health heroPath={heroPath} />
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
