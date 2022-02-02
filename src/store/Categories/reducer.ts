import { ListState, ReduxAction } from '../types'
import { Category } from '../../models/Category'
import * as types from './actionTypes'

export type CategoriesState = ListState<Category>

export type CategoriesStateMappedProps = {
    categories: CategoriesState,
}

const initialState: CategoriesState = {
  entityList: undefined,
  entityLoading: undefined,
  entityLoadSuccess: undefined,
  entityLoadError: undefined,
}

const reducer = (state = initialState, action: ReduxAction<any>): CategoriesState => {
  switch (action.type) {
    case types.CATEGORIES_LOAD:
      state = {
        ...state,
        entityList: undefined,
        entityLoading: true,
        entityLoadSuccess: false,
        entityLoadError: undefined,
      }
      break

    case types.CATEGORIES_LOAD_SUCCESS:
      state = {
        ...state,
        entityLoadSuccess: true,
        entityLoading: false,
      }
      break

    case types.CATEGORIES_LOAD_FAIL:
      state = {
        ...state,
        entityLoading: false,
        entityLoadError: action.payload,
      }
      break

    case types.CATEGORIES_LOAD_ERROR_CLEAR:
      state = {
        ...state,
        entityLoadError: undefined,
      }
      break

    case types.CATEGORIES_SET:
      state = {
        ...state,
        entityList: action.payload,
      }
      break

    case types.CATEGORIES_CLEAR:
      state = {
        ...state,
        entityList: undefined,
      }
      break

        // no default
  }

  return state
}

export default reducer
