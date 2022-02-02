import _ from 'lodash'
import { RouteEntry, RouteComponent } from './RouteEntry'
import { RouteSectionEntry } from './RouteSectionEntry'

export type RouteMiddlewareEntry = (data: any) => boolean

export type RouteSectionsDictionary = { [code: string]: RouteSectionEntry }
export type RouteMiddlewaresDictionary = { [code: string]: RouteMiddlewareEntry }
export type RouteRoutesDictionary = { [code: string]: RouteEntry }

export type RouteVisitEventCallback = (route: RouteEntry) => void

export const ROUTE_PARAMETER_MATCH = /:(\w+)/g
export const SECTION_NAME_DEFAULT = 'default'

export interface MiddlewareData {
  auth: any,
  route: RouteEntry,
}

export const ROUTE_LAST_VISITED_STORAGE_KEY = 'lastVisitedRoute'

export class Route {
  private static sections: RouteSectionsDictionary = {}

  private static middlewares: RouteMiddlewaresDictionary = {}

  private static allRoutes: RouteRoutesDictionary = {}

  private static currentSectionName = 'string'

  private static currentSection: RouteSectionEntry|null = null

  private static currentRouteEntry: RouteEntry|null = null

  private static visitEventCallback: RouteVisitEventCallback|undefined

  /**
   * Redirect to page
   *
   * @param target code or url
   * @param parameters
   * @param defaultValue
   */
  static redirect(
    target: string,
    parameters: any = null,
    defaultValue: string | null = null,
  ): string {
    window.location.href = this.url(target, parameters, defaultValue)
    return window.location.href
  }

  /**
   * Reload page
   */
  static reload(): void {
    window.location.reload()
  }

  /**
   * Get all registered sections
   */
  static getSections(): RouteSectionsDictionary {
    return this.sections
  }

  /**
   * Get all registered middlewares
   */
  static getMiddlewares(): RouteMiddlewaresDictionary {
    return this.middlewares
  }

  /**
   * Get all registered routes
   */
  static getRoutes(): RouteRoutesDictionary {
    return this.allRoutes
  }

  /**
   * Initialize module
   */
  static initialize(): void {
    this.middlewares = {}
    this.sections = {
      [SECTION_NAME_DEFAULT]: new RouteSectionEntry(SECTION_NAME_DEFAULT),
    }
    this.allRoutes = {}
  }

  /**
   * Prepare route module for use in pages
   */
  static prepareForPageUse(): void {
    this.syncRoutesList()
  }

  /**
   * Register visit event callback
   *
   * @param visitEventCallback
   */
  static onAnyPageVisited(visitEventCallback: RouteVisitEventCallback): void {
    this.visitEventCallback = visitEventCallback
  }

  /**
   * Call route visited event
   *
   * @param route
   */
  static routeVisited(route: RouteEntry): void {
    this.visitEventCallback?.(route)
  }

  /**
   * Remember last visited route
   *
   * @param storage
   * @param route
   */
  static rememberLastRoute(storage: Storage, route: RouteEntry): void {
    storage.setItem(ROUTE_LAST_VISITED_STORAGE_KEY, route.toJson())
  }

  /**
   * Forget last visited route
   *
   * @param storage
   */
  static forgetLastRoute(storage: Storage): void {
    storage.removeItem(ROUTE_LAST_VISITED_STORAGE_KEY)
  }

  /**
   * Redirect to last remembered route
   *
   * @param storage
   */
  static redirectToLastVisitedRoute(storage: Storage): boolean {
    let lastRoute = storage.getItem(ROUTE_LAST_VISITED_STORAGE_KEY)

    if (!lastRoute) {
      return false
    }

    let entry = RouteEntry.fromJson(lastRoute)

    this.redirect(entry.getUrl(), entry.getParams())

    return true
  }

  /**
   * Synchronize routes with allRoutes list
   */
  static syncRoutesList(): void {
    this.allRoutes = _.chain(this.sections)
      .values()
      .flatMap((section) => section.getRoutes())
      .keyBy('_code')
      .value()
  }

  /**
   * Get current route entry
   */
  static current(): RouteEntry | null {
    return this.currentRouteEntry
  }

  /**
   * Set current route entry
   */
  static setCurrent(entry: RouteEntry): void {
    this.currentRouteEntry = entry
  }

  /**
   * Clear all data
   */
  static clearAll(): void {
    this.initialize()
  }

  /**
   * Register middleware
   *
   * @param code
   * @param middleware
   */
  static middleware(code: string, middleware: RouteMiddlewareEntry): RouteMiddlewareEntry {
    this.middlewares[code] = middleware

    return middleware
  }

  /**
   * Get route url
   *
   * @param target code or url
   * @param parameters
   * @param defaultValue
   */
  static url(
    target: string,
    parameters: any = null,
    defaultValue: string|null = null,
  ): string {
    let route = this.get(target)
    let url = route?.getUrl() ?? (defaultValue ?? target)

    if (parameters !== null) {
      let availableParametersMatch = url.matchAll(ROUTE_PARAMETER_MATCH)
      let innerMatch

      let inlineParametersList = []

      while (!(innerMatch = availableParametersMatch.next()).done) {
        inlineParametersList.push(innerMatch.value[1])
      }

      if (!_.isEmpty(inlineParametersList)) {
        _.forIn(_.pick(parameters, inlineParametersList), (value, key) => {
          url = url.replace(`:${key}`, value)
        })
      }

      let queryParameters = _.chain(parameters)
        .omit(inlineParametersList)
        .mapValues((value, key) => key + (value ? `=${value}` : ''))
        .values()
        .join('&')
        .value()

      if (queryParameters) {
        url += (url.includes('?') ? '$' : '?') + queryParameters
      }
    }

    return url
  }

  /**
   * Get email url
   *
   * @param email
   */
  static email(email: string): string {
    return `mailto:${email}`
  }

  /**
   * Get route
   *
   * @param code
   */
  static get(code: string): RouteEntry | null {
    return this.allRoutes[code] ?? null
  }

  /**
   * Get section
   *
   * @param code if = null returns current section
   */
  static getSection(code: string | null = null): RouteSectionEntry | null {
    let result

    if (code !== null) {
      result = this.sections[code] ?? this.getDefaultSection()
    } else {
      result = this.currentSection ?? this.getDefaultSection()
    }

    return result
  }

  /**
   * Get default section
   */
  static getDefaultSection(): RouteSectionEntry | null {
    return this.sections[SECTION_NAME_DEFAULT]
  }

  /**
   * Only-registration methods goes next
   */

  /**
   * Register section
   *
   * @param code
   * @param registrationCallback
   */
  static section(
    code: string,
    registrationCallback: (section: RouteSectionEntry) => void,
  ): RouteSectionEntry {
    let section = new RouteSectionEntry(code)

    this.sections[code] = section

    this.currentSectionName = code
    this.currentSection = section
    registrationCallback(section)
    this.currentSection = null
    this.currentSectionName = SECTION_NAME_DEFAULT

    return section
  }

  /**
   * Register route to [url]
   *
   * @param url
   * @param registrationCallback
   */
  static to(url: string, registrationCallback: (entry: RouteEntry) => void): RouteEntry {
    let entry = new RouteEntry(url)

    registrationCallback(entry)

    let section = this.getSection()

    if (section) {
      entry.section(section.pushEntry(entry))
    }

    return entry
  }

  /**
   * Register route [url] to page [component]
   *
   * @param url
   * @param component
   */
  static page(url: string, component: RouteComponent): RouteEntry {
    return this.to(url, (entry) => {
      entry.component(component)
    })
  }

  /**
   * Register index route
   *
   * @param component
   */
  static index(component: RouteComponent): RouteEntry {
    return this.page('/', component)
      .code('index')
      .exact()
  }

  /**
   * Register [code] error route
   *
   * @param code
   * @param component
   */
  static error(code: number, component: RouteComponent): RouteEntry {
    let entry = new RouteEntry(`error:${code}`)
      .component(component)
      .code('not-found')
      .service()

    this.getDefaultSection()?.pushEntry(entry)

    return entry
  }
}
