import { combineReducers } from "redux"
import AppStateInterface from "../../interfaces/state/AppStateInterface"
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
}

const rootReducer = combineReducers<AppStateInterface>({
  auth: authReducer,
  category: categoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer