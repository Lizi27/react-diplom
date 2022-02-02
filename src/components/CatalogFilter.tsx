import React, { FunctionComponent } from 'react'
import { Category } from '../models/Category'

type CatalogFilterProps = {
    categories?: Category[]
    selectedCategory: any
    setCategory(id?: any): void
}

const CatalogFilter : FunctionComponent<CatalogFilterProps> = (data) => {
  let { categories, selectedCategory, setCategory } = data

  return (

    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a className={ `nav-link${selectedCategory === undefined ? ' active' : ''}` } onClick={ () => { setCategory(undefined) } }>Все</a>
      </li>
      {
            categories?.map((category) => (
              <li className="nav-item" key={ `category${category?.id}` }>
                { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                <a className={ `nav-link${selectedCategory === category?.id ? ' active' : ''}` } onClick={ () => { setCategory(category?.id) } }>{ category?.title }</a>
              </li>
            ))

        }
    </ul>
  )
}

export default CatalogFilter
