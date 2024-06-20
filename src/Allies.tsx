import { useEffect, useState } from 'react'

import { Button, Stack, Typography } from '@mui/material'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'
import Ally from './Ally'

type AllyObject = {
  id: number,
  key: number,
}

export default function Allies() {
  const [allies, setAllies] = useState<Array<AllyObject>>([])

  // Load list of allies from local storage
  useEffect(() => {
    const allyKey = `ally-list`
    const _allyIds = LoadCharacterField<string>(allyKey)
    console.log('allyIds', _allyIds)
    if (_allyIds) {
      console.log('Saving the ally list.')
      setAllies(JSON.parse(_allyIds))
    }
  }, [])

  const removeAllyById = (id: number) => {
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
