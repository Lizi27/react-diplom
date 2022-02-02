import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

type PageTitleProps = {
  title: string
}

const PageTitle : FunctionComponent<PageTitleProps> = ({ title }) => {
  const { t } = useTranslation()

  const siteName = t('global:sitename.title')

  return (
    <title>
      { `${title} | ${siteName}` }
    </title>
  )
}

export default PageTitle
