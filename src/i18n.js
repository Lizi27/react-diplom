import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import _ from 'lodash'

import { Application } from './modules/main/Application'
import * as ru from './locales/ru'

const resources = _.chain({
  ru,
})
  .value()

export const DEFAULT_LANGUAGE = 'ru'

let currentLanguage = DEFAULT_LANGUAGE

Application.configureAllPolyglots((registry) => {
  registry.localeManager().setDefaultLanguage(DEFAULT_LANGUAGE)
  registry.setDefaultLowLevel(i18n)
  currentLanguage = registry.localeManager().getCurrentLanguage(true)
})

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: currentLanguage,
    fallbackLng: 'ru',
    // keySeparator: false, // no keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
