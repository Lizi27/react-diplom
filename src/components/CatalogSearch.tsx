import React, { FunctionComponent } from 'react'

type CatalogSearchProps = {
    inputText?: string
    setInputText?: any
}

const CatalogSearch : FunctionComponent<CatalogSearchProps> = (data) => {
  let { inputText, setInputText } = data
    
  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" value={ inputText } onChange={ (e) => setInputText(e.target.value) } />
    </form>
  )
}

export default CatalogSearch
