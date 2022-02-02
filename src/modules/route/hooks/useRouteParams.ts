import { useRoute, UseRouteParams } from './useRoute'

export const useRouteParams = (props: UseRouteParams = {}): any|undefined => {
  const route = useRoute(props)
  return route?.getParams()
}
