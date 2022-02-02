import React, {
  FunctionComponent, useEffect, useState,
} from 'react'

import { connect } from 'react-redux'
import * as categoriesActions from '../store/Categories/actions'
import * as catalogActions from '../store/Catalog/actions'
import { CatalogStateMappedProps } from '../store/Catalog/reducer'
import { CategoriesStateMappedProps } from '../store/Categories/reducer'
import { useDebouncedSearch } from '../hooks/useDebouncedSearch'
import CatalogSearch from './CatalogSearch'
import CatalogFilter from './CatalogFilter'
import CatalogProduct from './CatalogProduct'
import LoadingBlock from './LoadingBlock'

type CatalogProps = CatalogStateMappedProps & typeof catalogActions &
    CategoriesStateMappedProps & typeof categoriesActions
    & {
      useSearch: boolean
    }

const Catalog : FunctionComponent<CatalogProps> = (data) => {
  let {
    categories, catalog, catalogLoadMore, categoriesLoad, catalogLoad, catalogClear, useSearch,
  } = data

  const [ category, setCategory ] = useState(undefined)
  const [ offset, setOffset ] = useState(0)
  const [ search, setSearch ] = useState('')

  const setSearchPrimary = (searchFilter: any) : any => {
    setOffset(0)
    setSearch(searchFilter)
  }

  const {
    inputText,
    setInputText,
  } = useDebouncedSearch((text: string) => setSearchPrimary(text))

  useEffect(() => {
    setInputText(search)
  }, [ search ])

  useEffect(() => {
    categoriesLoad()
  }, [ categoriesLoad ])

  useEffect(() => {
    catalogClear()

    let filter : any = {}

    if (category) {
      filter.categoryId = category
    }

    if (offset && offset > 0) {
      filter.offset = offset
    }

    if (search && search.length > 0) {
      filter.q = search
    }
    
    catalogLoad(filter)
  }, [ category, search ])

  const loadMore = () : any => {
    let newOffset = offset + 6
    setOffset(newOffset)

    let filter : any = {
      offset: newOffset,
    }

    if (category) {
      filter.categoryId = category
    }

    if (search && search.length > 0) {
      filter.q = search
    }

    catalogLoadMore(filter)
  }

  const setCategoryPrimary = (id: any) : any => {
    setOffset(0)
    setSearch('')
    setCategory(id)
  }

  // if (catalog.entityLoading || categories.entityLoading) {
  //   return <Loader />
  // }

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        { useSearch && <CatalogSearch inputText={ inputText } setInputText={ setInputText } /> }
        <LoadingBlock
          loading={ categories.entityLoading }
          exclusion={ categories.entityLoadError }
          exclusionText="К сожалению, не удалось загрузить список категорий, попробуйте позже"
        >
          <CatalogFilter
            categories={ categories.entityList }
            selectedCategory={ category }
            setCategory={ setCategoryPrimary }
          />
        </LoadingBlock>
        <LoadingBlock
          loading={ catalog.entityLoading }
          exclusion={ catalog.entityLoadError }
          exclusionText="К сожалению, не удалось загрузить список товаров, попробуйте позже"
        >
          <div className="row">
            {
            catalog.entityList?.map((product) => <CatalogProduct key={ `catalogProduct${product.id}` } product={ product } />)
          }
          </div>
          {
            !catalog.loadMoreEmpty && (
            <div className="text-center">
              <button type="button" className="btn btn-outline-primary" onClick={ loadMore }>Загрузить ещё</button>
            </div>
            )
          }
        </LoadingBlock>

      </section>
    </>
  )
}

const stateProps = (state: any): CatalogStateMappedProps & CategoriesStateMappedProps => ({
  catalog: state.Catalog,
  categories: state.Categories,
})

export default connect(stateProps, { ...catalogActions, ...categoriesActions })(Catalog)
