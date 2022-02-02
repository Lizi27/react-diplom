import React, { FunctionComponent } from 'react'

type LoaderProps= {
    customClass?: string
}

const Loader : FunctionComponent<LoaderProps> = (data) => {
  const { customClass } = data

  return (
    <div className={ `preloader mt-5 mb-5 ${customClass}` }>
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}

export default Loader
