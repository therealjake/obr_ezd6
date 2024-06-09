import React, { useState } from 'react'
import { CircleOutlined, HideSourceOutlined } from '@mui/icons-material'

type SubSlotProps = {
  onIncrement: () => void,
  onDecrement: () => void,
  startExpended: boolean,
}

export default function SubSlot({ onIncrement, onDecrement, startExpended }: SubSlotProps) {
  const [expended, setExpended] = useState(startExpended)

  const expend = () => {
    setExpended(true)
    onIncrement()
  }

  const unexpend = () => {
    setExpended(false)
    onDecrement()
  }

  if (expended) {
    return <HideSourceOutlined onClick={() => unexpend()} />
  } else {
    return <CircleOutlined onClick={() => expend()} />
  }
}
