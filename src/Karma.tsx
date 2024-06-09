import { Stack, Typography } from '@mui/material'
import { CircleOutlined, HideSourceOutlined } from '@mui/icons-material'
import { useKarmaContext } from './CharacterStatContext'

type KarmaPointProps = {
  isChecked: boolean
  onIncrement: () => void
  onDecrement: () => void
}
function KarmaPoint({ isChecked, onIncrement, onDecrement }: KarmaPointProps) {
  if (isChecked) {
    return <HideSourceOutlined onClick={onDecrement} />
  } else {
    return <CircleOutlined onClick={onIncrement} />
  }
}

export default function Karma() {
  const { karma, setKarma } = useKarmaContext()

  const lose = () => setKarma(Math.max(0, karma - 1))
  const gain = () => setKarma(karma + 1)

  return (
    <div style={{ flex: 1, border: '1px solid darkGray', padding: 10, borderRadius: 4 }}>
      <Typography variant="h6">Karma</Typography>
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
          }}
      >
        <KarmaPoint isChecked={karma < 1} onIncrement={lose} onDecrement={gain} />
        <KarmaPoint isChecked={karma < 2} onIncrement={lose} onDecrement={gain} />
        <KarmaPoint isChecked={karma < 3} onIncrement={lose} onDecrement={gain} />
      </Stack>
      <Stack direction="row"
            style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <KarmaPoint isChecked={karma < 4} onIncrement={lose} onDecrement={gain} />
        <KarmaPoint isChecked={karma < 5} onIncrement={lose} onDecrement={gain} />
        <KarmaPoint isChecked={karma < 6} onIncrement={lose} onDecrement={gain} />
      </Stack>
    </div>
  )
}
