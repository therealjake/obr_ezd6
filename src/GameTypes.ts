export type Boon = {
  source: string,
  label: string,
}

export type Inclination = {
  inclination: string,
  note: string,
  boonLabel?: string,
}

export type Item = {
  label: string,
  qty: number,
  large?: boolean,
  note?: boolean,
}
