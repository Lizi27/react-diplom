import React from 'react'
import _ from 'lodash'
import hash from 'object-hash'
import { RouteSectionEntry } from './RouteSectionEntry'

export type RouteComponent = ((data: any) => any) | React.ComponentClass | React.Component | any

export type RouteEntryJson = {
  url: string,
  params: any,
  hash?: string,
}

export class RouteEntry {
  private _url: string

  private _component: RouteComponent | null = null

  private _breadcrumbs: string | null = null

  private _code: string | null = 'unknown'

  private _data: any = null

  private _params: any = null

  private _exact = false

  private _service = false

  private _section: RouteSectionEntry | null = null

  private _bare = false

  constructor(url: string) {
    this._url = url
  }

  /**
   * Get route url
   * */
  getUrl(): string {
    return this._url
  }

  /**
   * Get route component
   * */
  getComponent(): RouteComponent|null {
    return this._component
  }

  /**
   * Get route breadcrumbs
   * */
  getBreadcrumbs(): string|null {
    return this._breadcrumbs
  }

  /**
   * Get route code
   * */
  getCode(): string|null {
    return this._code
  }

  /**
   * Get route target is service page
   * */
  isService(): boolean {
    return this._service
  }

  /**
   * Get route target is common page
   * */
  isCommon(): boolean {
    return !this._service
  }

  /**
   * Get route data
   * */
  getData(): any {
    return this._data
  }

  /**
   * Add value to route data
   *
   * @param key
   * @param value
   */
  addData(key: string, value: any): this {
    if (!this._data) {
      this._data = {
        [key]: value,
      }
    } else {
      this._data[key] = value
    }

    return this
  }

  /**
   * Get route page params
   * */
  getParams(): any {
    return this._params
  }

  /**
   * Get route page params hash
   */
  getParamsHash(): string {
    return hash(this._params)
  }

  /**
   * Get route exact
   * */
  getExact(): boolean {
    return this._exact
  }

  /**
   * Set route section
   */
  section(section: RouteSectionEntry): void {
    this._section = section
  }

  /**
   * Get route section
   */
  getSection(): RouteSectionEntry | null {
    return this._section
  }

  /**
   * Is route has layout
   */
  isBare(): boolean {
    return this._bare
  }

  /**
   * Is route has layout
   */
  bare(bare: boolean): this {
    this._bare = bare
    return this
  }

  /**
   * Set route entry component
   *
   * @param component
   */
  component(component: RouteComponent): this {
    this._component = component
    return this
  }

  /**
   * Set route entry breadcrumbs
   *
   * @param code
   */
  breadcrumbs(code: string): this {
    this._breadcrumbs = code
    return this
  }

  /**
   * Set route entry code
   *
   * @param code
   */
  code(code: string): this {
    this._code = code
    return this
  }

  /**
   * Set route entry breadcrumbs by route entry code
   */
  withBreadcrumbs(): this {
    this._breadcrumbs = this._code
    return this
  }

  /**
   * Set route entry data
   *
   * @param data
   */
  data(data: any): this {
    this._data = data
    return this
  }

  /**
   * Set route entry page params
   *
   * @param params
   */
  params(params: any): this {
    this._params = params
    return this
  }

  /**
   * Set route entry is exact
   */
  exact(): this {
    this._exact = true
    return this
  }

  /**
   * Set route entry is service
   */
  service(): this {
    this._service = true
    return this
  }

  /**
   * Clone entry
   */
  clone(): this {
    return _.cloneDeep(this)
  }

  /**
   * Convert entry to json string
   */
  toJson(): string {
    let rememberable: RouteEntryJson = {
      url: this.getUrl(),
      params: this.getParams(),
    }

    rememberable.hash = hash(rememberable)

    return JSON.stringify(rememberable)
  }

  /**
   * Get entry from json string
   *
   * @param json
   */
  fromJson(json: string): this {
    let routeJson: RouteEntryJson = JSON.parse(json)

    let objectHash = routeJson.hash
    delete routeJson.hash

    let currentObjectHash = hash(routeJson)

    if (currentObjectHash === objectHash) {
      this._url = routeJson.url
      this._params = routeJson.params
    }

    return this
  }

  /**
   * Get entry from json string
   *
   * @param json
   */
  static fromJson(json: string): RouteEntry {
    return new RouteEntry('').fromJson(json)
  }
}
