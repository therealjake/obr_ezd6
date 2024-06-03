import OBR from '@owlbear-rodeo/sdk'
import { LoadCharacterField } from './CharacterStore'

export const CHARACTER_UPDATE_CHANNEL = 'obr_ezd6.character'

var registered = false
const rollHistory = []
const listeners = []

async function popNotification(msg) {
  if (OBR.isReady) {
    await OBR.notification.show(msg)
  }
}

export const reformat = (msg) => {
  const parts = msg.data.split('|')
  let formatted = 'Could not recognize'
  if (parts[2] === 'roll') {
    formatted = `${parts[1]} rolled ${parts[3]}`
  } else if (parts[2] === 'upgrade') {
    formatted = `${parts[1]} upgrades to ${parts[3]}`
  } else if (parts[2] === 'newSet') {
    formatted = `------------ ${parts[1]} starts a new roll ------------`
  } else {
    console.log("Could not recognize message. here are the parts: ", parts)
  }
  return formatted
}

export const BroadcastHandler = {
  getHistory: () => rollHistory,

  registerListener: (listener) => {
    // console.log('Here we are with ', listener)
    listeners.push(listener)
    // console.log('Listener count is now ', listeners.length)
  },

  clearListeners: () => {
    // console.log("Clearing all listeners")
    listeners.length = 0
  },

  handle: (msg) => {
    // console.log('Got die-roll message: ', msg)

    if (!rollHistory) {
      console.log('Somehow, rollHistory does not exist. Why? What about getHistory()? ', this.getHistory())
    } else {
      if (rollHistory.some(v => v === msg)) {
      } else {
        const formatted = reformat(msg)

        try {
          rollHistory.unshift(formatted)
        } catch (ex) {
          console.log('Error adding message to history: ', ex)
        }

        try {
          listeners.forEach(l => l(rollHistory))
        } catch (ex) {
          console.log('Error sending message to listener(s): ', ex)
        }

        try {
          popNotification(formatted)
        } catch (ex) {
          console.log('Error showing notification: ', ex)
        }
      }
    }
  },

  clearHistory: () => rollHistory.length = 0,

  register() {
    if (registered) {
      console.log('Already registered broadcast handler')
      return
    }

    console.log('Registering broadcast handler!')
    OBR.onReady(() => OBR.broadcast.onMessage('obr_ezd6.rolls', this.handle))
    registered = true
  },

  async markNewRollSet() {
    if (OBR.isReady) {
      const myName = await OBR.player.getName()
      const msg = `${myName}|${LoadCharacterField('name')}|newSet||${new Date().toISOString()}`
      OBR.broadcast.sendMessage('obr_ezd6.rolls', msg)
    }
  },

  async sendRoll(rolls) {
    if (OBR.isReady) {
      const myName = await OBR.player.getName()
      const rollText = rolls.map(r => r.value).join(', ')
      const msg = `${myName}|${LoadCharacterField('name')}|roll|${rollText}|${new Date().toISOString()}`
      OBR.broadcast.sendMessage('obr_ezd6.rolls', msg)
    }
  },

  async sendUpgrade(rolls) {
    if (OBR.isReady) {
      const myName = await OBR.player.getName()
      const rollText = rolls.map(r => r.value).join(', ')
      const msg = `${myName}|${LoadCharacterField('name')}|upgrade|${rollText}|${new Date().toISOString()}`
      OBR.broadcast.sendMessage('obr_ezd6.rolls', msg)
    }
  },

  async notifyOfCharacterUpdate() {
    if (OBR.isReady) {
      OBR.broadcast.sendMessage(CHARACTER_UPDATE_CHANNEL, '')
    }
  }
}
