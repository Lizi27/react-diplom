import _ from 'lodash'
import { Polyglot } from './Polyglot'

export type PolyglotLocales = Record<string, Record<string, any>>

export type PolyglotLanguage = {
  codeShort: string,
  codeLong: string,
  name: string,
  title: string,
}

export type PolyglotLanguageCollection = Record<string, PolyglotLanguage>

export class PolyglotLocaleManager {
  private locales: PolyglotLocales = {}
  private languages: PolyglotLanguageCollection = {}
  private defaultLanguage?: string

  /**
   * Set current working locales registry
   *
   * @param locales
   */
  setLocales(locales: PolyglotLocales): this {
    this.locales = locales
    return this
  }

  /**
   * Merge locale with locale registry
   *
   * @param locale
   */
  mergeLocale(locale: PolyglotLocales): this {
    this.locales = _.merge(this.locales, locale)
    return this
  }

  /**
   * Clear registered locales
   */
  clearLocales(): this {
    this.locales = {}
    return this
  }

  /**
   * Set languages description
   *
   * @param languages
   */
  setLanguagesDescription(languages: PolyglotLanguageCollection): this {
    this.languages = languages
    return this
  }

  /**
   * Get languages description
   */
  getLanguages(): PolyglotLanguageCollection {
    return this.languages
  }

  /**
   * Set current default language
   *
   * @param language
   */
  setDefaultLanguage(language: string): this {
    this.defaultLanguage = language
    return this
  }

  /**
   * Get current default language
   */
  getDefaultLanguage(): undefined|string {
    return this.defaultLanguage
  }

  /**
   * Set current language
   *
   * @param language
   */
  setCurrentLanguage(language: string): this {
    let result = Polyglot
      .getRegistry()
      .getLowLevelInterface()
      ?.languageChange?.(language)

    localStorage.setItem('POLYGLOT_LANGUAGE', result ?? language)
    return this
  }

  /**
   * Get current (or default) language
   *
   * @param useDefault
   */
  getCurrentLanguage(useDefault = true): string|undefined {
    return localStorage.getItem('POLYGLOT_LANGUAGE')
      ?? (useDefault ? this.defaultLanguage : undefined)
  }
}
