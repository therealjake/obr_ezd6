import { useEffect, useState } from 'react'
import OBR from '@owlbear-rodeo/sdk'
import { Button, List, Stack, Typography } from '@mui/material'
import { BroadcastHandler } from './BroadcastHandler'
import DieLog from './DieLog'
import { Inclination } from './GameTypes'

type CharacterFromMetadata = {
  name: string,
  ancestry: string,
  heroPath: string,
  subclass: string,
  inclinations: Array<Inclination>,
  karma: number,
  strikes: number,
  inventory: string,
}

type CharacterInParty = {
  id: string,
  playerName: string,
  characterName: string,
  ancestry?: string,
  heroPath?: string,
  subclass?: string,
  heroPathName?: string,
  inclinations?: Array<string>,
  karma?: number,
  strikes?: number,
  inventory?: string,
}

export default function GmScreen() {
  const [players, setPlayers] = useState<Array<CharacterInParty>>([])

  const loadData = async () => {
    if (OBR.isReady) {
      const party = OBR.party
      try {
        const players = await party.getPlayers()

        const newP = []

        for (const p of players) {
          if (p) {
            const md = p.metadata

            const character = md['com.snak.obr_ezd6/character'] as CharacterFromMetadata
            if (character) {
              newP.push({
                id: p.id,
                playerName: p.name,
                characterName: character.name,
                ancestry: character.ancestry,
                heroPath: character.heroPath,
                subclass: character.subclass,
                heroPathName: `${character.subclass || ''} ${character.heroPath}`.trim(),
                inclinations: character.inclinations.map(i => i.inclination) || [],
                karma: character.karma,
                strikes: character.strikes,
                inventory: character.inventory
              })
            } else {
              newP.push({
                id: p.id,
                playerName: p.name,
                characterName: 'No Character',
              })
            }
          }
        }

        setPlayers(newP)
      } catch (e) {
        console.error('Error loading players', e)
      }
    }
  }

  useEffect(() => BroadcastHandler.register(), [])

  useEffect(() => {
    OBR.onReady(() => {
      const party = OBR.party
      party.onChange(loadData)
      loadData()
    })
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Typography variant="h4">Gamemaster Screen</Typography>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ mt: 3 }}>
          Players
        </Typography>
        <Button variant="outlined" onClick={loadData}>Reload Data</Button>
      </Stack>

      <List>
        {
          players.map(p => (
            <div key={p.id}>
              <Typography variant="body2" sx={{ mt: 3 }}>{p.playerName} is playing…</Typography>
              <Typography variant="body1">{p.characterName} the {p.ancestry} {p.heroPathName}</Typography>
              <Typography variant="body2">Inclinations: {(p.inclinations || []).join(', ')}</Typography>
              <div >
                <Typography variant="caption" sx={{ mr: 3 }}>Strikes: {p.strikes}</Typography>
                <Typography variant="caption" sx={{ mr: 3 }}>Karma: {p.karma}</Typography>
              </div>
              <div style={{ marginLeft: 15 }}>
                <Typography variant="body1" sx={{ mr: 3 }}>Gear</Typography>
                <Typography variant="caption" sx={{ mr: 3 }}>{p.inventory}</Typography>
              </div>
            </div>
          ))
        }
      </List>

      <DieLog />
    </div>
  )
}
