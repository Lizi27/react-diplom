export class Size {
  size?: string
  avalible?: boolean

  constructor(initial?: Partial<Size>) {
    Object.assign(this, {
      ...initial,
    })
  }
}
