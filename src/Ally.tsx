import { useEffect, useState } from 'react'

import { Cancel } from '@mui/icons-material'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, IconButton, Stack, TextField, Typography } from '@mui/material'
import Inventory from './Inventory/Inventory'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'
import { Strike } from './Health'

type AllyProps = {
  id: number,
  onRemove: (id: number) => void,
}

export default function Ally({ id, onRemove }: AllyProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [maxStrikes, setMaxStrikes] = useState(2)
  const [curStrikes, setCurStrikes] = useState(2)
  const [hasInventory, setHasInventory] = useState(false)
  const [promptRemove, setPromptRemove] = useState(false)

  // Load ally from local storage
  useEffect(() => {
    const allyKey = `ally-${id}`

    const _ally = LoadCharacterField<string>(allyKey)
    if (_ally) {
      const newAlly = JSON.parse(_ally)
      setName(newAlly.name)
      setType(newAlly.type)
      setMaxStrikes(newAlly.maxStrikes)
      setCurStrikes(newAlly.curStrikes)
      setHasInventory(newAlly.hasInventory)
    }

    return () => {}
  }, [id])

  const saveAlly = (_name: string, _type: string, _maxStrikes: number, _curStrikes: number, _hasInventory: boolean) => {
    const allyKey = `ally-${id}`
    const payload = { name: _name, type: _type, maxStrikes: _maxStrikes, curStrikes: _curStrikes, hasInventory: _hasInventory }
    console.log('Saving ally', payload, ' to key ', allyKey)
    SaveCharacterField(allyKey, JSON.stringify(payload))
  }

  const updateName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value)
    saveAlly(ev.target.value, type, maxStrikes, curStrikes, hasInventory)
  }

  const updateType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setType(ev.target.value)
    saveAlly(name, ev.target.value, maxStrikes, curStrikes, hasInventory)
  }

  const loseHealth = () => {
    const newHealth = Math.max(0, curStrikes - 1)
    setCurStrikes(newHealth)
    saveAlly(name, type, maxStrikes, newHealth, hasInventory)
  }

  const gainHealth = () => {
    const newHealth = Math.min(maxStrikes, curStrikes + 1)
    setCurStrikes(newHealth)
    saveAlly(name, type, maxStrikes, newHealth, hasInventory)
  }

  const updateHasInventory = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setHasInventory(ev.target.checked)
    saveAlly(name, type, maxStrikes, curStrikes, ev.target.checked)
  }

  const handleAllyInventoryChange = (_: string) => {
    // This can be a no-op because the inventory is saved in the Inventory component
  }

  return (
    <div style={{ flex: 1, border: 'solid darkGray', borderWidth: hasInventory ? 1 : 0, padding: 10, borderRadius: 4 }}>

      <Dialog open={promptRemove} onClose={() => setPromptRemove(false)}>
        <DialogContent>
          <Typography>Are you sure you want to remove {name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setPromptRemove(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { onRemove(id); setPromptRemove(false); }}>Remove</Button>
        </DialogActions>
      </Dialog>

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

        <Stack direction="column" sx={{ flex: 1 }}>
          <Typography variant="caption">Strikes</Typography>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            {/* TODO: Support allies with != 2 max health */}
            <Strike isChecked={curStrikes < 1} onDecrement={gainHealth} onIncrement={loseHealth} />
            <Strike isChecked={curStrikes < 2} onDecrement={gainHealth} onIncrement={loseHealth} />
          </Stack>
        </Stack>
  

        <Stack sx={{ flex: 1, mr: 1, textAlign: 'center' }}>
          <Typography variant="caption">Inventory?</Typography>
          <Checkbox checked={hasInventory} onChange={updateHasInventory}/>
        </Stack>
        <IconButton onClick={() => setPromptRemove(true)}><Cancel /></IconButton>
      </Stack>

      { hasInventory && (
        <div style={{ flex: 1, border: '0px solid red', padding: 0 }}>
          <Inventory characterName={name} heroPath="Ally" inclinations={[]} onInventoryChange={handleAllyInventoryChange}/>
        </div>
      )}
    </div>
  )
}
