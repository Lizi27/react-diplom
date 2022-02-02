import React, { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import 'moment/locale/ru'

import { Application } from './modules/main/Application'

import Routing from './modules/route/components/Routing'

const App: FunctionComponent = () => {
  const { t } = useTranslation()

  Application.bootAllPolyglots(t)

  // Boot modules
  useMemo(() => {
    Application.bootAll()
  }, [])

  // Update modules
  Application.updateAll()

  return (
    <Routing />
  )
}

export default App
