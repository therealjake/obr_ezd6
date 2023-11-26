import React, { useEffect, useState } from 'react'
import Field from './Field'

import { Stack, TextField } from '@mui/material'
import Ancestry from './Ancestry'
import Inclinations from './Inclinations'
import HeroPath from './HeroPath'
import Health from './Health'
import Karma from './Karma'
import HeroDie from './HeroDie'
import Spacer from './Spacer'
import Boons from './Boons'

export default function Character() {
  const [name, setName] = useState('')
  const [heroPath, setHeroPath] = useState('')
  const [ancestry, setAncestry] = useState(null)
  const [inclinations, setInclinations] = useState([])
  const [boons, setBoons] = useState([])

  const handleAncestry = (ancestry) => setAncestry(ancestry)
  const handleHeroPath = (hp) => setHeroPath(hp)

  const handleInclinations = (inclinations) => setInclinations(inclinations)

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 720, height: 500, padding: 20, background: '#eee' }}>
      <TextField label="Name" value={name} onChange={(ev) => setName(ev.target.value)} />

      <Stack direction="row"
             justifyContent="space-between"
             style={{ marginTop: 20 }}
      >
        <Ancestry onChange={handleAncestry} />
        <Spacer />
        <HeroPath onChange={handleHeroPath} />
      </Stack>

      <Stack direction="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Health heroPath={heroPath} />
        <Spacer />
        <Karma />
        <Spacer />
        <HeroDie inclinations={inclinations} />
      </Stack>

      <Inclinations ancestry={ancestry} onChange={handleInclinations} />

      <Boons ancestry={ancestry}
             heroPath={heroPath}
             inclinations={inclinations}
             onCalculate={setBoons}
      />
    </div>
  )
}
