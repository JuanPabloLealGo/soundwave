import { combineReducers } from "redux"
import AppStateInterface from "../../interfaces/state/AppStateInterface"
import authReducer from "./authSlice"

const rootReducer = combineReducers<AppStateInterface>({
  auth: authReducer
})

export default rootReducer