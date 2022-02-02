import { Route } from '../modules/route/Route'

const registerMiddlewares = () => {
  Route.middleware('non-auth', ({ next }) => (
    next()
  ))
}

export {
  registerMiddlewares,
}
