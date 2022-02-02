import React from 'react'

import banner from '../assets/img/banner.jpg'

const MainBanner = () => (
  <div className="banner">
    <img src={ banner } className="img-fluid" alt="К весне готовы!" />
    <h2 className="banner-header">К весне готовы!</h2>
  </div>
)

export default MainBanner
