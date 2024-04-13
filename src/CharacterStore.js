import OBR from '@owlbear-rodeo/sdk'

// export async function saveCharacter({
//   name,
//   ancestry,
//   heroPath,
//   subclass,
//   strikes,
//   karma,
//   heroDice,
//   inclinations,
//   shopGear,
//   magicGear,
//   otherGear
// }) {
//   if (OBR.isReady) {
//     const player = OBR.player
//     const name = await player.getName()
//     const metadata = await player.getMetadata()
//     console.log('My name is: ', name)
//     console.log('My metadata is: ', metadata)
//   }
// }

let timeout = 0
export function syncCharacter({
  name,
  ancestry,
  heroPath,
  subclass,
  inclinations,
  karma,
  strikes,
}) {
  if (timeout) {
    window.clearTimeout(timeout)
  }

  timeout = window.setTimeout(async () => {
    const payload = { name, ancestry, heroPath, subclass, inclinations, karma, strikes }
    console.log('Synchronize this character: ', payload)
    if (OBR.isReady) {
      const player = OBR.player
      const metadata = await player.getMetadata()
      metadata['com.snak.obr_ezd6/character'] = payload
      player.setMetadata(metadata)
    }
  }, 2000)
}

export async function loadCharacter() {
  if (OBR.isReady) {
    const player = OBR.player
    const metadata = await player.getMetadata()
    metadata['com.snak.obr_ezd6'] = { latest: new Date().getTime() }
    await player.setMetadata(metadata)
  }
}

export function LoadCharacterField(field) {
  return localStorage.getItem(field)
  // if (OBR.isReady) {
  //   const player = OBR.player
  //   const metadata = await player.getMetadata()
  //   console.log('Loaded metadata like so: ', metadata)
  //   const fieldValue = metadata[`com.snak.obr_ezd6/character/${field}`]

  //   if (fieldValue) {
  //     console.log('Loaded field ', { [field]: fieldValue[field] })
  //     return fieldValue[field]
  //   } else {
  //     console.log('No value for field ', field)
  //     return null
  //   }
  // }

  // console.log('OBR disabled ', { [field]: null })

  // return ''
}

export function WipeCharacterField(field) {
  localStorage.removeItem(field)
}

export function SaveCharacterField(field, value) {
  localStorage.setItem(field, value)
  // console.log('Saving field ', { [field]: value })
  // if (OBR.isReady) {
  //   const player = OBR.player
  //   const metadata = await player.getMetadata()
  //   metadata[`com.snak.obr_ezd6/character/${field}`] = { [field]: value }
  //   await player.setMetadata(metadata)
  // }
}
