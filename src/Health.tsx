import { BRUTE } from './HeroPath'
import { Stack, Typography } from '@mui/material'
import { CircleOutlined, HideSourceOutlined } from '@mui/icons-material'
import { useStrikesContext } from './CharacterStatContext'

type StrikeProps = {
  isChecked: boolean,
  onIncrement: () => void,
  onDecrement: () => void,
}

export function Strike({ isChecked, onIncrement, onDecrement }: StrikeProps) {
  if (isChecked) {
    return <HideSourceOutlined onClick={onDecrement} />
  } else {
    return <CircleOutlined onClick={onIncrement} />
  }
}

type HealthProps = {
  heroPath: string,
}

export default function Health({ heroPath }: HealthProps) {
  const { strikes, setStrikes } = useStrikesContext()

  let maxHealth = 3

  if (heroPath === BRUTE) {
    maxHealth = 5
  }

  const damage = () => {
    setStrikes(Math.max(0, strikes - 1))
  }

  const heal = () => {
    setStrikes(Math.min(maxHealth, strikes + 1))
  }

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', borderRadius: 4, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
      <Typography variant="h6">Strikes</Typography>
      <Stack direction="row"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 5,
            }}
      >
        <Strike isChecked={strikes < 1} onIncrement={damage} onDecrement={heal} />
        <Strike isChecked={strikes < 2} onIncrement={damage} onDecrement={heal} />
        <Strike isChecked={strikes < 3} onIncrement={damage} onDecrement={heal} />
      </Stack>

      {maxHealth === 5 && (
        <Stack direction="row"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: 5,
                width: '100%'
              }}
        >
          <div/>
          <Strike isChecked={strikes < 4} onIncrement={damage} onDecrement={heal} />
          <Strike isChecked={strikes < 5} onIncrement={damage} onDecrement={heal} />
          <div/>
        </Stack>
      )}

      { strikes < 1 && (
        <div style={{ width: '100%' }}>
          <Typography variant='body2' sx={{ mt: 1 }}><center>NOT REAL HEALTHY! Remember your hero dice and karma</center></Typography>
        </div>
      )}
    </div>
  )
}
