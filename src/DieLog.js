import React, { useEffect, useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { reformat } from './BroadcastHandler'
import OBR from '@owlbear-rodeo/sdk'

export default function DieLog() {
  const [log, setLog] = useState([])

  useEffect(() => {
    const onEvent = (event) => {
      const newLogs = [...log]
      newLogs.unshift(reformat(event))
      setLog(newLogs)
    }

    OBR.onReady(() => {
      OBR.broadcast.onMessage('obr_ezd6.rolls', onEvent)
    })
  }, [log])

  const clearLog = () => setLog([])

  if (!log || log.size === 0) {
    return <Typography>No rolls yet</Typography>
  }

  return (
    <Stack direction="column">
      <Typography>Activity Log</Typography>
      <Button onClick={clearLog}>Clear</Button>
      {log.map((entry, idx) => <Typography key={idx}>{entry}</Typography>)}
    </Stack>
  )
}
