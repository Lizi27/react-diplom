export type ReduxAction<T> = {
  type: string,
  payload?: T,
}

export type Reducer<S = any, T = any> = (state: S, action: ReduxAction<T>) => S

export type ListState<T> = {
  entityLoading?: boolean,
  entityLoadSuccess?: boolean,
  entityLoadError?: any,
  entityList?: T[],
}

export type EntityState<T> = {
  entityLoading?: boolean,
  entityLoadSuccess?: boolean,
  entityLoadError?: any,
  entity?: T,
}
