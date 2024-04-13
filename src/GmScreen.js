import React, { useEffect, useState } from 'react'
import OBR from '@owlbear-rodeo/sdk'
import { Button, List, Stack, Typography } from '@mui/material'

export default function GmScreen() {
  const [players, setPlayers] = useState([])

  const loadData = async () => {
    if (OBR.isReady) {
      const party = OBR.party
      const players = await party.getPlayers()

      console.log('Players is this: ', players)
      const newP = []

      for (const p of players) {
        const name = p.name
        const md = p.metadata

        // console.log(`Player ${name} has this md: `, md)
        // console.log('Character (?): ', md['com.snak.obr_ezd6/character'])
        const character = md['com.snak.obr_ezd6/character']
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
        })
      }

      setPlayers(newP)
    }
  }

  const fakeData = () => {
    const newP = []
    newP.push({ id: 123, playerName: 'Jaker', characterName: 'Jimmy Smoots', heroPathName: 'Rascal', ancestry: 'Elf', inclinations: ['Devout', 'Tough Bastard'], karma: 3})
    newP.push({ id: 234, playerName: 'Ken', characterName: 'Plank', heroPathName: 'Shapeshifer Conjurer', ancestry: 'Goblin', inclinations: ['Sarcastic', 'Beastfriend'], karma: 0})
    newP.push({ id: 345, playerName: 'Greg', characterName: 'Alton Tealeaf', heroPathName: 'Warrior', ancestry: 'Halfling', inclinations: ['Lucky', 'Brave'], karma: 5})
    setPlayers(newP)
  }

  useEffect(() => {
    OBR.onReady(() => loadData())
  }, [])

  const showNotification = () => {
    OBR.notification.show('Joe Diggs rolls: 2, 2, 6')
  }

  let notifId = null
  const showAndCloseNotification = async () => {
    notifId = await OBR.notification.show('Joe Shmoe rolls: 2, 2, 6')
    setTimeout(() => OBR.notification.close(notifId), 3000)
  }

  const showModal = () => {
    console.log('Opening modal')
    OBR.modal.open({
      id: '999',
      url: '/?mode=roller&roller=Jakeroo&rolls=2,2,5',
    })
  }

  return (
    <div style={{ height: '100%' }}>
      <Typography variant="h4">Gamemaster Screen</Typography>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ mt: 3 }}>
          Players
        </Typography>
        <Button variant="outlined" onClick={loadData}>Reload Data</Button>
        <Button variant="outlined" onClick={fakeData}>Fake Data</Button>
        <Button variant="outlined" onClick={showNotification}>Notification</Button>
        <Button variant="outlined" onClick={showAndCloseNotification}>Notification (AC)</Button>
        <Button variant="outlined" onClick={showModal}>Modal</Button>
      </Stack>

      <List>
        {
          players.map(p => (
            <div key={p.id}>
              <Typography variant="body2" sx={{ mt: 3 }}>{p.playerName}</Typography>
              <Typography variant="body1">{p.characterName} the {p.ancestry} {p.heroPathName}</Typography>
              <Typography variant="body2">Inclinations: {(p.inclinations || []).join(', ')}</Typography>
              <div >
                <Typography variant="caption" sx={{ mr: 3 }}>Strikes: {p.karma}</Typography>
                <Typography variant="caption" sx={{ mr: 3 }}>Karma: {p.karma}</Typography>
              </div>
            </div>
          ))
        }
      </List>
    </div>
  )
}
