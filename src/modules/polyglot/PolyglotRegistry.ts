import { TranslateFunction } from '../../types/General'
import { PolyglotLocaleManager } from './PolyglotLocaleManager'

export type PolyglotLowLevelInterface = {
  languageChange: (language: string) => string|void,
}

export interface PolyglotDefaultLowLevel {
  changeLanguage: (code: string) => void,
}

export class PolyglotRegistry {
  private translateFunction?: TranslateFunction
  private currentLocaleManager: PolyglotLocaleManager = new PolyglotLocaleManager()
  private lowLevelManager?: any
  private lowLevelInterface?: PolyglotLowLevelInterface

  /**
   * Set current translate function
   */
  setTranslationFunction(t: TranslateFunction): void {
    this.translateFunction = t
  }

  /**
   * Get current translate function
   */
  getTranslationFunction(): TranslateFunction|undefined {
    return this.translateFunction
  }

  /**
   * Get current locale manager
   */
  localeManager(): PolyglotLocaleManager {
    return this.currentLocaleManager
  }

  /**
   * Set current locale manager
   *
   * @param manager
   */
  setLocaleManager(manager: PolyglotLocaleManager): void {
    this.currentLocaleManager = manager
  }

  /**
   * Set default behaviour low-level manager
   *
   * @param manager
   */
  setDefaultLowLevel(manager: PolyglotDefaultLowLevel): void {
    this.setLowLevelManager(manager)
    this.setLowLevelInterface({
      languageChange: (language) => {
        manager.changeLanguage(language)
      },
    })
  }

  /**
   * Set current low-level translation manager
   *
   * @param manager
   */
  setLowLevelManager(manager: any): void {
    this.lowLevelManager = manager
  }

  /**
   * Get current low-level translation manager
   */
  getLowLevelManager<T = any>(): T|undefined {
    return this.lowLevelManager as T|undefined
  }

  /**
   * Set current low-level interface
   *
   * @param lowLevelInterface
   */
  setLowLevelInterface(lowLevelInterface: PolyglotLowLevelInterface): void {
    this.lowLevelInterface = lowLevelInterface
  }

  /**
   * Get current low-level interface
   */
  getLowLevelInterface(): PolyglotLowLevelInterface|undefined {
    return this.lowLevelInterface
  }
}
