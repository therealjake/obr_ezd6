import React from 'react'

import { Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Cancel } from '@mui/icons-material'

type CoinbagProps = {
  onClear: () => void,
  copper: number,
  setCopper: (copper: number) => void,
  silver: number,
  setSilver: (silver: number) => void,
  gold: number,
  setGold: (gold: number) => void,
}

export default function Coinbag({ onClear, copper, setCopper, silver, setSilver, gold, setGold }: CoinbagProps) {
  return (
    <Grid item xs={6}>
      <Stack direction="row" sx={{ mt: 2, ml: 1, mr: 1, alignItems: 'center' }}>

      <TextField label="Copper"
                    variant="outlined"
                    fullWidth
                    value={copper}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCopper(Number(ev.target.value))}
                    type="number"
                    style={{ marginRight: 5}}
        />
        <TextField label="Silver"
                    variant="outlined"
                    fullWidth
                    value={silver}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSilver(Number(ev.target.value))}
                    type="number"
                    style={{ marginRight: 5}}
        />
        <TextField label="Gold"
                    variant="outlined"
                    fullWidth
                    value={gold}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setGold(Number(ev.target.value))}
                    type="number"
                    style={{ marginRight: 5}}
        />

        <IconButton onClick={onClear}><Cancel /></IconButton>
      </Stack>
      { (Number(copper) + Number(silver) + Number(gold)) > 2000 && <Typography sx={{ ml: 1, mt: 1 }} variant="caption" color="error">Bags can only hold 2,000 coins</Typography>}
    </Grid>
  )
}
