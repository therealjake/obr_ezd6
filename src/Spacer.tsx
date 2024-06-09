import React from 'react'

type SpacerProps = {
  size?: number
}

export default function Spacer({ size }: SpacerProps) {
  const effectiveSize = size || 20

  return <div style={{ width: effectiveSize, height: effectiveSize }}/>
}
