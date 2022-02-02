import React, { FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { TopSalesStateMappedProps } from '../store/TopSales/reducer'
import * as topSalesActions from '../store/TopSales/actions'
import CatalogProduct from './CatalogProduct'
import LoadingBlock from './LoadingBlock'

type TopSalesProps = TopSalesStateMappedProps & typeof topSalesActions

const TopSales: FunctionComponent<TopSalesProps> = (data) => {
  let { topSales, topSalesLoad } = data

  useEffect(() => {
    topSalesLoad()
  }, [ topSalesLoad ])

  return (
    <LoadingBlock
      loading={ topSales.entityLoading }
      exclusion={ topSales.entityLoadError }
      exclusionText="К сожалению, не удалось загрузить список популярных товаров, попробуйте позже"
    >
      <div className="row">
        { topSales.entityList?.map((topSale) => <CatalogProduct key={ `topSale-${topSale.id}` } product={ topSale } />) }
      </div>
    </LoadingBlock>
  )
}

const stateProps = (state: any): TopSalesStateMappedProps => ({
  topSales: state.TopSales,
})

export default connect(stateProps, topSalesActions)(TopSales)
