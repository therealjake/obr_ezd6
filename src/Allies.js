import React, { useEffect, useState } from 'react'

import { Cancel } from '@mui/icons-material'
import { Button, Checkbox, IconButton, Stack, TextField, Typography } from '@mui/material'
import Inventory from './Inventory/Inventory'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

function Ally({ id, onRemove }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [strikes, setStrikes] = useState(0)
  const [hasInventory, setHasInventory] = useState(false)

  // Load ally from local storage
  useEffect(() => {
    const allyKey = `ally-${id}`

    const _ally = LoadCharacterField(allyKey)
    console.log("This is what we loaded: ", _ally, " from key ", allyKey)
    if (_ally) {
      const newAlly = JSON.parse(_ally)
      setName(newAlly.name)
      setType(newAlly.type)
      setStrikes(newAlly.strikes)
      setHasInventory(newAlly.hasInventory)
    }

    return () => {}
  }, [id])

  const saveAlly = (_name, _type, _strikes, _hasInventory) => {
    const allyKey = `ally-${id}`
    const payload = { name: _name, type: _type, strikes: _strikes, hasInventory: _hasInventory }
    console.log('Saving ally', payload, ' to key ', allyKey)
    SaveCharacterField(allyKey, JSON.stringify(payload))
  }

  const updateName = (ev) => {
    setName(ev.target.value)
    saveAlly(ev.target.value, type, strikes, hasInventory)
  }

  const updateType = (ev) => {
    setType(ev.target.value)
    saveAlly(name, ev.target.value, strikes, hasInventory)
  }

  const updateStrikes = (ev) => {
    setStrikes(ev.target.value)
    saveAlly(name, type, ev.target.value, hasInventory)
  }

  const updateHasInventory = (ev) => {
    setHasInventory(ev.target.checked)
    saveAlly(name, type, strikes, ev.target.checked)
  }

  return (
    <div style={{ flex: 1, border: 'solid darkGray', borderWidth: hasInventory ? 1 : 0, padding: 10, borderRadius: 4 }}>
      <Stack direction="column"
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
          }}
      >
        <TextField label="Name" value={name} onChange={updateName} sx={{ flex: 3, mr: 1 }} />
        <TextField label="Type" value={type} onChange={updateType} sx={{ flex: 3, mr: 1 }} />
        <TextField  label="Strikes"
                    type="number"
                    value={strikes}
                    onChange={updateStrikes}
                    sx={{ flex: 1, mr: 1 }}
        />
        <Stack sx={{ flex: 1, mr: 1, textAlign: 'center' }}>
          <Typography variant="caption">Inventory?</Typography>
          <Checkbox checked={hasInventory} onChange={updateHasInventory}/>
        </Stack>
        <IconButton onClick={() => onRemove(id)}><Cancel /></IconButton>
      </Stack>

      { hasInventory && (
        <div style={{ flex: 1, border: '0px solid red', padding: 0 }}>
          <Inventory characterName={name} heroPath="Ally" inclinations={[]} />
        </div>
      )}
    </div>
  )
}

export default function Allies() {
  const [allies, setAllies] = useState([])

  // Load list of allies from local storage
  useEffect(() => {
    const allyKey = `ally-list`
    const _allyIds = LoadCharacterField(allyKey)
    console.log('allyIds', _allyIds)
    if (_allyIds) {
      console.log('Saving the ally list.')
      setAllies(JSON.parse(_allyIds))
    }
  }, [])

  const removeAllyById = (id) => {
    const newAllies = allies.filter(a => a.id !== id)
    setAllies(newAllies)
    SaveCharacterField('ally-list', JSON.stringify(newAllies))
  }

  const addAlly = () => {
    const id = Math.random()
    const newA = { id, key: id }
    const newAllies = [...allies, newA]
    setAllies(newAllies)
    SaveCharacterField('ally-list', JSON.stringify(newAllies))
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', marginTop: 20, padding: 10 }}>
      <Typography variant="h6">Allies</Typography>

      <Stack direction="column">
        {allies.map(a => <Ally id={a.id} key={a.key} onRemove={removeAllyById} />)}
      </Stack>

      <Stack direction="row">
        { allies.length === 0 && (<Typography variant="body1" style={{ marginTop: 8, marginLeft: 8, marginRight: 20  }}>No Allies</Typography>) }
        <Button onClick={addAlly}>Add Ally</Button>
      </Stack>
    </div>
  )
}
