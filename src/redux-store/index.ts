import { configureStore } from "@reduxjs/toolkit"
import persistStore from "redux-persist/es/persistStore"
import persistedReducer from "./reducers"

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true
      }
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)