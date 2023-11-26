import React from 'react'

export default function Spacer({ size }) {
  const effectiveSize = size || 20

  return <div style={{ width: effectiveSize, height: effectiveSize }}/>
}
