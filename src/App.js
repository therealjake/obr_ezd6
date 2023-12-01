import { ThemeProvider, createTheme } from '@mui/material'
import Character from './Character'
import Dice from './Dice'
import Spacer from './Spacer'

const theme = createTheme({
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
  return <ThemeProvider theme={theme}>
    <div style={{ padding: 20, height: '100%', background: '#E8E4D8', display: 'flex', flexDirection: 'row' }}>
      <Character />
    </div>
  </ThemeProvider>
}

export default App
