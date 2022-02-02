import React from 'react'
import MetaTags from 'react-meta-tags'
import MainLayout from '../../layout/MainLayout'
import PageTitle from '../../components/PageTitle'

const NotFound = () => (

  <MainLayout>
    <MetaTags>
      <PageTitle title="Страница не найдена" />
    </MetaTags>
    <section className="top-sales">
      <h2 className="text-center">Страница не найдена</h2>
      <p>
        Извините, такая страница не найдена!
      </p>
    </section>
  </MainLayout>
    
)

export default NotFound
