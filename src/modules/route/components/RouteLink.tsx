import React, {
  FunctionComponent, MouseEventHandler, ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../Route'

type RouteAndDataProps = {
  route: string,
  routeData?: any,
}

type RouteLinkProps = RouteAndDataProps & {
  children: ReactNode,
  onClick?: MouseEventHandler,
  [key: string]: any,
}

const RouteLink: FunctionComponent<RouteLinkProps> = (data) => {
  let {
    route,
    routeData,
    children,
    ...props
  } = data

  return (
    <Link
      to={ Route.url(route, routeData) }
      { ...props }
    >
      { children }
    </Link>
  )
}

export default RouteLink
