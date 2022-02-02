import React from 'react'
import Sugar from 'sugar'
import moment from 'moment'

import axios from 'axios'
import { registerBreadcrumbs } from '../../modulesData/breadcrumb'
import { registerRoutes } from '../../modulesData/route'
import { p, Polyglot, PolyglotConfigurationFunction } from '../polyglot/Polyglot'
import { languages } from '../../locales/languages'
import { TranslateFunction } from './Types'

export class Application {
  /**
     * Configure all polyglot instances
     *
     * @param t
     */
  static bootAllPolyglots(t: TranslateFunction): void {
    Application.configureAllPolyglots((registry) => {
      registry.setTranslationFunction(t)
      registry.localeManager().setLanguagesDescription(languages)
    })
  }

  /**
     * Boot all
     */
  static bootAll(): void {
    Application.updateOnce()
  }

  /**
     * Update all
     * @param data
     */
  static updateAll(): void {
    Application.update()
  }

  /**
     * @see Polyglot.configure
     *
     * @param callback
     */
  static configureAllPolyglots(callback: PolyglotConfigurationFunction): void {
    Application.configurePolyglot(callback)
  }

  /**
     * @see Polyglot.configure
     *
     * @param callback
     */
  static configurePolyglot(callback: PolyglotConfigurationFunction): void {
    Polyglot.configure(callback)
  }

  /**
     * Update modules once
     */
  static updateOnce(): void {
    this.configureSugar()
    this.registerModules()
    this.configureAxios()
  }

  /**
     * Update modules
     */
  static update(): void {
    moment.locale(p('global:xx'))
  }

  /**
     * Configure sugar package
     */
  static configureSugar(): void {
    Sugar.Number.setOption('decimal', ',')
    Sugar.Number.setOption('thousands', ' ')
  }

  static configureAxios(): void {
    axios.defaults.baseURL = 'http://localhost:7070/api/'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  }

  /**
     * Register inner modules
     */
  static registerModules(): void {
    registerRoutes()
    registerBreadcrumbs()
  }
}
