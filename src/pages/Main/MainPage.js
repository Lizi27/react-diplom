import React from 'react'
import MetaTags from 'react-meta-tags'
import TopSales from '../../components/TopSales'
import Catalog from '../../components/Catalog'
import PageTitle from '../../components/PageTitle'

const MainPage = () => (
  <>
    <MetaTags>
      <PageTitle title="Главная" />
    </MetaTags>
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <TopSales />
    </section>
    <Catalog useSearch={ false } />
  </>
)

export default MainPage
