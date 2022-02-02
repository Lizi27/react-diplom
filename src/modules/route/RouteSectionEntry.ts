import _ from 'lodash'

import { RouteComponent, RouteEntry } from './RouteEntry'
import { MiddlewareData, Route } from './Route'

export interface SectionMiddlewareExecutionCallbacks {
  success: () => any,
  rejection: (target: string) => any
}

export class RouteSectionEntry {
  private _code = 'default'

  private _layout: RouteComponent | null = null

  private _middlewares: string[] = []

  private _routes: RouteEntry[] = []

  constructor(code: string) {
    this._code = code
  }

  /**
   * Run middlewares for route
   *
   * @param data
   * @param callbacks
   */
  runMiddlewares(data: MiddlewareData, callbacks: SectionMiddlewareExecutionCallbacks): any {
    let middlewareResult = ''
    let middlewareRejectTarget = ''

    let next = (): void => {
      middlewareResult = 'next'
    }

    let reject = (rejectionTarget: string): void => {
      middlewareResult = 'reject'
      middlewareRejectTarget = rejectionTarget
    }

    _.chain(Route.getMiddlewares())
      .pick(this._middlewares)
      .values()
      .forEach((middleware) => {
        middleware({ data, next, reject })
        if (middlewareResult === 'reject') {
          return false
        }

        return undefined
      })
      .value()

    return middlewareResult === 'reject'
      ? callbacks.rejection(middlewareRejectTarget)
      : callbacks.success()
  }

  /**
   * Get section code
   */
  getCode(): string {
    return this._code
  }

  /**
   * Get section layout
   */
  getLayout(): RouteComponent | null {
    return this._layout
  }

  /**
   * Get section middlewares
   */
  getMiddlewares(): string[] {
    return this._middlewares
  }

  /**
   * Get section routes
   */
  getRoutes(): RouteEntry[] {
    return this._routes
  }

  /**
   * Set route section routes
   *
   * @param list
   */
  routes(list: RouteEntry[]): RouteSectionEntry {
    this._routes = list
    return this
  }

  /**
   * Push route entry to route section routes
   *
   * @param entry
   */
  pushEntry(entry: RouteEntry): RouteSectionEntry {
    this._routes.push(entry)
    return this
  }

  /**
   * Set route section code
   *
   * @param name
   */
  code(name: string): RouteSectionEntry {
    this._code = name
    return this
  }

  /**
   * Set route section layout
   *
   * @param layout
   */
  layout(layout: RouteComponent): RouteSectionEntry {
    this._layout = layout
    return this
  }

  /**
   * Set route section middleware (one or many)
   *
   * @param name
   */
  middleware(...name: string[]): RouteSectionEntry {
    this._middlewares = name
    return this
  }
}
