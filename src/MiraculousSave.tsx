import { Box, TextField, Typography } from '@mui/material'
import { FRIAR, RASCAL, SKALD } from './HeroPath'

export default function MiraculousSave({ heroPath }: { heroPath: string }) {
  let save = 6
  let label = ''

  if (heroPath === FRIAR) {
    save = 5
    label = 'Blessed'
  } else if (heroPath === SKALD) {
    save = 5
    label = 'Soothsayer'
  } else if (heroPath === RASCAL) {
    save = 5
    label = 'Trickster'
  } else {
    label = 'Save'
  }

  return (
    <div style={{
      display: 'flex',
      border: '1px solid darkGray',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 4,
    }}>
      <Typography variant="h6">Miraculous</Typography>

      <Box width={60} sx={{ mb: 1 }}>
        <TextField disabled value={`${save}${save < 6 ? '+' : ''}`} size="small" />
      </Box>

      <span>{label}</span>

      { heroPath === RASCAL && (
        <Typography sx={{ mt: 1 }} variant="caption">With Advantage</Typography>
      )}
    </div>
  )
}
