import React, { FunctionComponent } from 'react'
import Loader from './Loader'

export type LoadingBlockTextData = {
    loading?: boolean|null,
}

export type LoadingBlockErrorData = {
    exclusion?: any|null
    exclusionText?: string,
}

export type LoadingBlockClassname = {
    customClass?: string
}

export type LoadingBlockProps = LoadingBlockTextData & LoadingBlockErrorData & LoadingBlockClassname

const LoadingBlock : FunctionComponent<LoadingBlockProps> = (date) => {
  let {
    loading,
    exclusion,
    exclusionText,
    children,
    customClass,
  } = date

  const isLoading = loading !== false

  if (isLoading) {
    return <Loader customClass={ customClass } />
  }

  if (exclusion) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Произошла ошибка при загрузке данных</h4>
        <p>{ exclusionText }</p>
        <hr />
        <p className="mb-0">{ exclusion }</p>
      </div>
    )
  }

  return (
    <>
      { children }
    </>
  )
}

export default LoadingBlock
