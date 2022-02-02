import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { RouteDataProviderContext } from '../modules/route/contexts'

import Footer from '../components/Footer'
import Header from '../components/Header'
import MainBanner from '../components/MainBanner'

const MainPageLayout = (data) => {
  let {
    children,
  } = data

  let route = useContext(RouteDataProviderContext)

  let result

  if (route?.isBare()) {
    result = (
      <>
        { children }
      </>
    )
  } else {
    result = (
      <>
        <Header />

        <main className="container">
          <div className="row">
            <div className="col">
              <MainBanner />
              { children }
            </div>
          </div>
        </main>

        <Footer />

        <ToastContainer />
      </>
    )
  }

  return result
}

MainPageLayout.propTypes = {
  breadcrumbData: PropTypes.any,
  title: PropTypes.string,
}

export default MainPageLayout
