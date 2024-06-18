import { LooksOneTwoTone, LooksTwoTwoTone, Looks3TwoTone, Looks4TwoTone, Looks5TwoTone, Looks6TwoTone } from '@mui/icons-material'
import { useEffect, useState } from 'react'

export function rollDie() {
  return 1 + Math.floor(Math.random() * 6)
}

type DieProps = {
  value?: number,
  size?: number
}

export function Die({ value, size }: DieProps) {
  if (value === 1) {
    return <D1 size={size} />
  } else if (value === 2) {
    return <D2 size={size} />
  } else if (value === 3) {
    return <D3 size={size} />
  } else if (value === 4) {
    return <D4 size={size} />
  } else if (value === 5) {
    return <D5 size={size} />
  } else if (value === 6) {
    return <D6 size={size} />
  } else {
    return <span>BAD DIE: {value}</span>
  }
}

export function AnimatedDie({ value, size, animateUntil }: { value: number, size: number, animateUntil: number }) {
  const [visibleFace, setVisibleFace] = useState(rollDie())

  useEffect(() => { setVisibleFace(value) }, [value])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (new Date().getTime() > animateUntil) {
        clearInterval(intervalId)
        setVisibleFace(value)
      } else {
        setVisibleFace(rollDie())
      }
    }, 50)
  }, [value, animateUntil])

  return <Die value={visibleFace} size={size} />
}

export function D1({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <LooksOneTwoTone sx={{ color: "red", width: ss, height: ss, verticalAlign: 'middle' }} />
}

export function D2({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <LooksTwoTwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}

export function D3({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <Looks3TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}

export function D4({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <Looks4TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}

export function D5({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <Looks5TwoTone sx={{ width: ss, height: ss, verticalAlign: 'middle' }} />
}

export function D6({ size }: DieProps) {
  const ss = size ? Number(size) : 20
  return <Looks6TwoTone sx={{ color: "green", width: ss, height: ss, verticalAlign: 'middle' }} />
}

// export default function Dice() {
//   const padding = 20
//   const spacer = 20
//   const characterSheet = 680
//   const width = 1000 - (padding * 2) - {spacer} - characterSheet

//   const rollOne = () => {
//     if (OBR.isReady) {
//       const me = OBR.player.getName()
//       const roll = 1 + Math.round(Math.random() * 6)
//       OBR.notification.show(`${me} just rolled a ${roll}`)
//     } else {
//       window.alert('No OBR found')
//     }
//   }

//   return (
//     <div style={{ width }}>
//       <Stack>
//         <b>Roll dice here</b>
//         <Button onClick={rollOne}>Roll One Die</Button>
//         <Button onClick={rollOne}>Roll Two Dice</Button>
//         <Button onClick={rollOne}>Roll Three Dice</Button>
//         <Button onClick={rollOne}>Roll Four Dice</Button>
//       </Stack>
//     </div>
//   )
// }
