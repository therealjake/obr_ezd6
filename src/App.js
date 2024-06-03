import { Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material'
import Character from './Character'
import { useEffect, useState } from 'react'
import Rules from './Rules'
import MagicRules from './MagicRules'
import OBR from '@owlbear-rodeo/sdk'
import GmScreen from './GmScreen'
import RollModal from './RollModal'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Josefin Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(',')
  }
})

function App() {
  const [tab, setTab] = useState(0)
  const [gameMaster, setGameMaster] = useState(window.location.search.includes('gm=true'))

  const gmCheck = async () => {
    console.log('Checking for GM role')
    const player = OBR.player
    const role = await player.getRole()

    if (role === 'GM') {
      setGameMaster(true)
      setTab(3)
    } else {
      setGameMaster(false)
    }
  }
  useEffect(() => OBR.onReady(gmCheck), [])

  if (window.location.search.includes('mode=roller')) {
    return <RollModal search={window.location.search} />
  }

  return <ThemeProvider theme={theme}>
    <div style={{ padding: 20, height: '100%', background: '#E8E4D8', display: 'flex', flexDirection: 'column' }}>
      <div>
        <Tabs value={tab} onChange={(ev, newTab) => setTab(newTab)} >
          <Tab label="Character" />
          <Tab label="Rules (Basic)" />
          <Tab label="Rules (Magick)" />
          { gameMaster && <Tab label="GM Screen" /> }
        </Tabs>
      </div>
      { tab === 0 && <Character /> }
      { tab === 1 && <Rules onJumpToMagick={() => setTab(2)} /> }
      { tab === 2 && <MagicRules /> }
      { tab === 3 && <GmScreen /> }

      <Typography variant='caption'>v0.5.1</Typography>
    </div>
  </ThemeProvider>
}

export default App
