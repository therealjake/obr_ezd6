import OBR from '@owlbear-rodeo/sdk'
import { Inclination } from './GameTypes'

let timeout = 0
type SyncCharacterProps = {
  name: string,
  ancestry: string,
  heroPath: string,
  subclass: string,
  inclinations: Array<Inclination>,
  karma: number,
  strikes: number,
  inventory: string,
}

export function syncCharacter({
  name,
  ancestry,
  heroPath,
  subclass,
  inclinations,
  karma,
  strikes,
  inventory,
} : SyncCharacterProps) {
  if (timeout) {
    window.clearTimeout(timeout)
  }

  timeout = window.setTimeout(async () => {
    const payload = { name, ancestry, heroPath, subclass, inclinations, karma, strikes, inventory, }
    console.log('Synchronize this character: ', payload)
    if (OBR.isReady) {
      const player = OBR.player
      const metadata = await player.getMetadata()
      metadata['com.snak.obr_ezd6/character'] = payload
      player.setMetadata(metadata)
    }
  }, 2000)
}

export function LoadCharacterField<T>(field: string): T | null {
  return localStorage.getItem(field) as T
}

export function WipeCharacterField(field: string) {
  localStorage.removeItem(field)
}

export function SaveCharacterField<T>(field: string, value: T) {
  localStorage.setItem(field, String(value))
}
