import {
  ConfigureStoreOptions,
  TypedUseSelectorHook,
  configureStore,
  useDispatch,
  useSelector,
} from './lib/redux'
import { rtkQueryToasterHandler } from './rtkErrorLogger'
import { api } from './servicers/api'
import userSlice from './userSlice'

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      user: userSlice,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, rtkQueryToasterHandler),
    ...options,
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
