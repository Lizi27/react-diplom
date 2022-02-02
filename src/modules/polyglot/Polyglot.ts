import { TranslateFunction } from '../../types/General'
import { PolyglotLocaleManager } from './PolyglotLocaleManager'
import { PolyglotRegistry } from './PolyglotRegistry'

export type PolyglotConfigurationFunction = (registry: PolyglotRegistry) => void

export class Polyglot {
  private static registry = new PolyglotRegistry()

  /**
   * Translate text
   *
   * @param text
   * @param params
   */
  static translate(text: string, ...params: any): string {
    return this.registry.getTranslationFunction()?.(text, ...params) ?? ''
  }

  /**
   * Get polyglot registry
   */
  static getRegistry(): PolyglotRegistry {
    return this.registry
  }

  /**
   * Set polyglot registry
   *
   * @param registry
   */
  static setRegistry(registry: PolyglotRegistry): void {
    this.registry = registry
  }

  /**
   * Configure polyglot
   *
   * @param callback
   */
  static configure(callback: PolyglotConfigurationFunction): void {
    callback(this.getRegistry())
  }
}

/**
 * @see Polyglot.translate
 */
export const p: TranslateFunction = (text: string, ...params: any): string => (
  Polyglot.translate(text, ...params)
)

/**
 * @see Polyglot.localeManager
 */
export const polyglotLocale = (): PolyglotLocaleManager => (
  Polyglot.getRegistry().localeManager()
)

/**
 * @see Polyglot.getLowLevelManager
 */
export function polyglotLowLevel<T>(): T|undefined {
  return Polyglot.getRegistry().getLowLevelManager<T>()
}
