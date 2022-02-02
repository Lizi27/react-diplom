import { createContext } from 'react'
import { RouteEntry } from './RouteEntry'

export const RouteDataProviderContext = createContext<RouteEntry|undefined>(undefined)
