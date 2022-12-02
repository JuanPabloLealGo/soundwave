import { combineReducers } from "redux"
import AppStateInterface from "../../interfaces/state/AppStateInterface"
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import playlistsReducer from "./playlistsSlice"
import uiReducer from "./uiSlice"
import storage from "redux-persist/lib/storage"
import tracksReducer from "./tracksSlice"
import persistReducer from "redux-persist/es/persistReducer"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'] // only these will be persisted
}

const rootReducer = combineReducers<AppStateInterface>({
  auth: authReducer,
  category: categoryReducer,
  ui: uiReducer,
  playlists: playlistsReducer,
  tracks: tracksReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer