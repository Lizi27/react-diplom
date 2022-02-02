import Sugar from 'sugar'
import { Product } from './Product'

export class CartProduct {
  id?: string
  hash?: string
  product?: Product
  quantity?: number
  size?: string

  constructor(initial?: Partial<CartProduct>) {
    let product = new Product(initial?.product)

    Object.assign(this, {
      ...initial,
      hash: product.getHash(),
      id: product.id,
      product,
    })
  }

  getTotalPrice() : any {
    if (this.quantity && this.product && this.product.price) {
      return Sugar.Number.format(this.quantity * this.product.price)
    }

    return 0
  }

  getFormatPrice() : any {
    if (this.product && this.product.price) {
      return Sugar.Number.format(this.product.price)
    }

    return 0
  }
}
