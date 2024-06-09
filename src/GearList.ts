import { Item } from "./GameTypes"

export const ITEMS: Array<Item> = [
  { label: '', qty: 0 },

  // Specialty Gear
  { label: 'Delvers Pack (bulky)', qty: 1, large: true },
  { label: 'Healing Kit (6)', qty: 6 },
  { label: 'Lockpicks (3)', qty: 3 },

  // Random Gear
  { label: '10\' Pole (bulky)', qty: 1, large: true, },
  { label: 'Chalk sticks', qty: 1 },
  { label: 'Chisel', qty: 1 },
  { label: 'Coinbag', qty: 1, note: true, },
  { label: 'Crowbar', qty: 1 },
  { label: 'Grappling hook', qty: 1 },
  { label: 'Horn', qty: 1 },
  { label: 'Hunting Knife', qty: 1, },
  { label: 'Lantern', qty: 1, },
  { label: 'Metal spikes', qty: 1, },
  { label: 'Nails', qty: 1 },
  { label: 'Oil flask (2)', qty: 2 },
  { label: 'Other Item', qty: 1, note: true },
  { label: 'Padlock and key', qty: 1 },
  { label: 'Pot of grease', qty: 1 },
  { label: 'Potion', qty: 1, note: true },
  { label: 'Rations (4)', qty: 4, },
  { label: 'Rope (50\')', qty: 1, },
  { label: 'Scroll', qty: 1, note: true },
  { label: 'Small hammer', qty: 1 },
  { label: 'Torches (2)', qty: 2, },
  { label: 'Waterskin', qty: 1 },
  { label: 'Whistle', qty: 1 },

  // Weapons
  { label: 'Axe', qty: 1,  },
  { label: 'Crossbow (bulky)', qty: 1, large: true,  },
  { label: 'Dagger', qty: 1 },
  { label: 'Hammer', qty: 1 },
  { label: 'Long Bow (bulky)', qty: 1, large: true },
  { label: 'Long Sword', qty: 1,  },
  { label: 'Mace', qty: 1 },
  { label: 'Short Bow (bulky)', qty: 1, large: true,  },
  { label: 'Short Sword', qty: 1, },
  { label: 'Spear (bulky)', qty: 1, large: true,  },
  { label: 'Staff', qty: 1 },
  { label: 'Two-handed Sword (bulky)', qty: 1, large: true },

  // Armor
  { label: 'Leather Armor', qty: 1, },
  { label: 'Chainmail', qty: 1, large: false, },
  { label: 'Plate Armor (bulky)', qty: 1, large: true, },
  { label: 'Shield', qty: 1, },
]
