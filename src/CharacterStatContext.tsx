import React, { useState, useContext, useEffect, createContext } from 'react'
import { LoadCharacterField, SaveCharacterField } from './CharacterStore'

const noOp = () => {}

const KarmaCtx = createContext<{ karma: number, setKarma: (v: number) => void }>({ karma: 0, setKarma: noOp })
const StrikesCtx = createContext<{ strikes: number, setStrikes: (v: number) => void }>({ strikes: 0, setStrikes: noOp })
const HeroDiceCtx = createContext<{ heroDice: number, setHeroDice: (v: number) => void }>({ heroDice: 0, setHeroDice: noOp })

export const useKarmaContext = () => useContext(KarmaCtx)
export const useStrikesContext = () => useContext(StrikesCtx)
export const useHeroDiceContext = () => useContext(HeroDiceCtx)

export default function CharacterStatContext({ children }: { children: React.ReactNode }) {
  const [strikes, setStrikes] = useState<number>(LoadCharacterField<number>('strikes') || 1)
  const [karma, setKarma] = useState<number>(LoadCharacterField<number>('karma') || 0)
  const [heroDice, setHeroDice] = useState<number>(LoadCharacterField<number>('heroDice') || 0)

  useEffect(() => {
    console.log('Karma updated, saving to local storage')
    SaveCharacterField('karma', karma)
  }, [karma])
  
  useEffect(() => {
    console.log('Hero dice updated to ' + heroDice + ', saving to local storage')
    SaveCharacterField('heroDice', heroDice)
  }, [heroDice])
  
  useEffect(() => {
    console.log('Strikes updated, saving to local storage')
    SaveCharacterField('strikes', strikes)
  }, [strikes])

  return (
    <KarmaCtx.Provider value={{ karma, setKarma }}>
      <StrikesCtx.Provider value={{ strikes, setStrikes }}>
        <HeroDiceCtx.Provider value={{ heroDice, setHeroDice }}>
          {children}
        </HeroDiceCtx.Provider>
      </StrikesCtx.Provider>
    </KarmaCtx.Provider>
  )
}
