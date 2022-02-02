import { BreadcrumbRegistryEntry } from './BreadcrumbRegistryEntry'
import { BreadcrumbTrailEntry } from './BreadcrumbTrailEntry'
import { Breadcrumb } from './Breadcrumb'

export class BreadcrumbTrail {
  _parent: BreadcrumbRegistryEntry|null = null

  _items: BreadcrumbTrailEntry[] = []
  
  /**
   * Set parent for breadcrumbs in trail
   *
   * @param name
   */
  parent(name: string) : BreadcrumbTrail {
    let parentBreadcrumb = Breadcrumb.getEntry(name)

    if (!parentBreadcrumb) {
      throw new Error(`Breadcrumb with name ${name} not exists`)
    }

    this._parent = parentBreadcrumb

    return this
  }

  /**
   * Add breadcrumb item in trail
   *
   * @param title
   * @param link
   */
  item(title: string, link: string) : BreadcrumbTrail {
    this._items.push({
      title,
      link,
    })

    return this
  }

  /**
   * Has parent in trail
   *
   * @return boolean
   */
  hasParent() : boolean {
    return this._parent !== null
  }

  /**
   * Get parent in trail
   *
   * @return BreadcrumbRegistryEntry|null
   */
  getParent() : BreadcrumbRegistryEntry|null {
    return this._parent
  }

  /**
   * Get current items in trail
   *
   * @return BreadcrumbTrailEntry[]
   */
  getItems() : BreadcrumbTrailEntry[] {
    return this._items
  }
}
