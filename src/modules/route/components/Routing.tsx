import React, { FunctionComponent, ReactNode } from 'react'
import {
  Switch, Route as BrowserRoute, Redirect,
} from 'react-router-dom'

import _ from 'lodash'
import { Route } from '../Route'
import { RouteEntry } from '../RouteEntry'
import { RouteDataProviderContext } from '../contexts'
import MainLayout from '../../../layout/MainLayout'

export type RoutingProvidedProps = {
  routeController: 'route' | 'drawer',
  routeParams: any,
  routeData: any,
  route: RouteEntry,
}

const Routing: FunctionComponent = () => {
  const pageRouteRenderer = (route: RouteEntry): ReactNode => {
    const section = route.getSection()
    const Component = route.getComponent()

    let result
    let auth = {}

    if (route.isCommon()) {
      const SectionLayout = section?.getLayout() ?? MainLayout

      result = (
        <BrowserRoute
          // component={ route.getComponent() }
          path={ route.getUrl() }
          exact={ route.getExact() }
          key={ `${section?.getCode()}:${route.getCode()}` }
          render={ (props) => (
            section?.runMiddlewares({ auth, route }, {
              success: () => {
                // eslint-disable-next-line react/prop-types
                let pageRoute = route.params(props.match?.params)

                Route.setCurrent(route)
                Route.routeVisited(route)

                return (
                  <SectionLayout key={ pageRoute.getParamsHash() }>
                    <RouteDataProviderContext.Provider value={ pageRoute }>
                      <Component
                        { ...props }
                        routeController="route"
                        routeParams={ pageRoute.getParams() }
                        routeData={ pageRoute.getData() }
                        route={ pageRoute }
                      />
                    </RouteDataProviderContext.Provider>
                  </SectionLayout>
                )
              },
              rejection: (routeCode: string) => (
                <Redirect
                  to={ {
                    pathname: Route.url(routeCode),
                    state: {
                      from: props.location,
                    },
                  } }
                />
              ),
            })
          ) }
        />
      )
    } else if (route.getUrl() === 'error:404') {
      result = (
        <BrowserRoute
          key={ `error:${route.getCode()}` }
          component={ Component }
        />
      )
    } else {
      result = null
    }

    return result
  }

  const routes = _.chain(Route.getRoutes())
    .values()
    .sortBy((route) => route.isService())
    .map(pageRouteRenderer)
    .value()

  return (
    <Switch>
      { routes }
    </Switch>
  )
}

export default Routing
