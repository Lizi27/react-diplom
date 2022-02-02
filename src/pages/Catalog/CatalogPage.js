import React from 'react'
import MetaTags from 'react-meta-tags'
import Catalog from '../../components/Catalog'
import PageTitle from '../../components/PageTitle'

const CatalogPage = () => (
  <>
    <MetaTags>
      <PageTitle title="Каталог" />
    </MetaTags>
    <Catalog useSearch />
  </>
)

export default CatalogPage
