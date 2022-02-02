import { useContext } from 'react'
import { Route } from '../Route'
import { RouteEntry } from '../RouteEntry'
import { RouteDataProviderContext } from '../contexts'

export type UseRouteParams = {
  defaultRoute?: RouteEntry,
  from?: 'context'|'global'|'any',
}

export const useRoute = (props: UseRouteParams = {}): RouteEntry|undefined => {
  const {
    defaultRoute,
    from = 'context',
  } = props

  let contextRoute = useContext(RouteDataProviderContext)
  let globalRoute = Route.current() ?? defaultRoute

  switch (from) {
    case 'any':
    default:
      return contextRoute ?? globalRoute
    case 'global':
      return globalRoute
    case 'context':
      return contextRoute
  }
}
