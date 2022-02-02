import { Breadcrumb } from '../modules/breadcrumbs/Breadcrumb'
import { BreadcrumbRegistryEntry } from '../modules/breadcrumbs/BreadcrumbRegistryEntry'

export const registerBreadcrumbs = (): BreadcrumbRegistryEntry[] => {
  Breadcrumb.clearAll()

  return Breadcrumb.breadcrumbs
}
