import OBR from '@owlbear-rodeo/sdk'

let timeout = 0
export function syncCharacter({
  name,
  ancestry,
  heroPath,
  subclass,
  inclinations,
  karma,
  strikes,
  inventory,
}) {
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

// export async function loadCharacter() {
//   if (OBR.isReady) {
//     const player = OBR.player
//     const metadata = await player.getMetadata()
//     metadata['com.snak.obr_ezd6'] = { latest: new Date().getTime() }
//     await player.setMetadata(metadata)
//   }
// }

export function LoadCharacterField(field) {
  return localStorage.getItem(field)
}

export function WipeCharacterField(field) {
  localStorage.removeItem(field)
}

export function SaveCharacterField(field, value) {
  localStorage.setItem(field, value)
}
