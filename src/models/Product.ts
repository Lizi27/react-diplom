import hash from 'object-hash'
import { Size } from './Size'

export class Product {
  id?: number
  category?: number
  title?: string
  price?: number
  images?: string[]
  sku?: string
  manufacturer?: string
  color?: string
  material?: string
  reason?: string
  season?: string
  heelSize?: string
  sizes?: Size[]

  constructor(initial?: Partial<Product>) {
    Object.assign(this, {
      ...initial,
      sizes: initial?.sizes?.map((entity) => (
        new Size(entity)
      )),
    })
  }

  getHash() : any {
    return hash(JSON.stringify(this))
  }
}
