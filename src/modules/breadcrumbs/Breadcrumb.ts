import * as _ from 'lodash'

import { TranslateFunction } from '../main/Types'
import { BreadcrumbRegistryEntry } from './BreadcrumbRegistryEntry'
import { BreadcrumbTrail } from './BreadcrumbTrail'
import { BreadcrumbTrailEntry } from './BreadcrumbTrailEntry'

export interface BreadcrumbHelpers {
  t: TranslateFunction,
}

export type TrailFunction = (trail: BreadcrumbTrail, data: any, helpers: any) => void

export class Breadcrumb {
  static breadcrumbs: BreadcrumbRegistryEntry[] = []

  /**
   * Clear all breadcrumbs
   *
   * @return Breadcrumb
   */
  static clearAll() : Breadcrumb {
    this.breadcrumbs = []
    return this
  }

  /**
   * Create breadcrumb entry (use in modulesData/breadcrumbs.js)
   *
   * @param name
   * @param trailFunction
   * @return BreadcrumbRegistryEntry
   */
  static create(name: string, trailFunction: TrailFunction) : BreadcrumbRegistryEntry {
    let entry = new BreadcrumbRegistryEntry(name, trailFunction)
    this.breadcrumbs.push(entry)
    return entry
  }

  /**
   * Get breadcrumbs trail by start-point name
   *
   * @param name
   * @param data
   * @param t
   * @param strict
   * @return BreadcrumbTrailEntry[]
   */
  static getTrail(
    name: string,
    data: any,
    t: TranslateFunction,
    strict = true,
  ) : BreadcrumbTrailEntry[] {
    let entry = this.getEntry(name)
    if (!entry) {
      if (strict) {
        throw new Error(`Breadcrumb entry "${name}" not exists`)
      } else {
        return []
      }
    }

    let trail = new BreadcrumbTrail()

    let trailEntries: BreadcrumbTrailEntry[] = []

    entry.trailFunction(trail, data, { t })

    trailEntries = trail.getItems()

    if (trail.hasParent()) {
      let parentEntries = this.getTrail(trail.getParent()?.name ?? '', data, t)
      trailEntries.unshift(...parentEntries)
    }

    return trailEntries
  }

  /**
   * Get one registered registry entry
   *
   * @param name
   * @return BreadcrumbRegistryEntry|undefined
   */
  static getEntry(name: string) : BreadcrumbRegistryEntry|undefined {
    return _.find(this.breadcrumbs, (breadcrumb) => breadcrumb.name === name)
  }
}
