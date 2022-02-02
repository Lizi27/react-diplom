export class Category {
  id?: string
  title?: string
  
  constructor(initial?: Partial<Category>) {
    Object.assign(this, {
      ...initial,
    })
  }
}
