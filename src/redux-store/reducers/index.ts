import { combineReducers } from "redux"
import AppStateInterface from "../../interfaces/state/AppStateInterface"
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import playlistReducer from "./playlistSlice"
import playlistPageReducer from "./playlistPageSlice"
import uiReducer from "./uiSlice"
import storage from "redux-persist/lib/storage"
import trackReducer from "./trackSlice"
import persistReducer from "redux-persist/es/persistReducer"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'] // only these will be persisted
}

const rootReducer = combineReducers<AppStateInterface>({
  auth: authReducer,
  category: categoryReducer,
  playlist: playlistReducer,
  playlistPage: playlistPageReducer,
  track: trackReducer,
  ui: uiReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer