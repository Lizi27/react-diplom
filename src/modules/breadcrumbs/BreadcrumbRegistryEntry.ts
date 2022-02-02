import { TrailFunction } from './Breadcrumb'

export class BreadcrumbRegistryEntry {
  name: string

  trailFunction: TrailFunction
  
  constructor(
    name: string,
    trailFunction: TrailFunction,
  ) {
    this.name = name
    this.trailFunction = trailFunction
  }
}
