import _ from 'lodash'
import { PolyglotLanguageCollection } from '../modules/polyglot/PolyglotLocaleManager'

import { locales } from './index'

export const languages: PolyglotLanguageCollection = _.mapValues(locales, (value) => {
  const { global } = value

  return {
    codeShort: global.xx,
    codeLong: global['xx-XX'],
    name: global.XXX,
    title: global.XXXX,
  }
})
