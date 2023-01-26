import axios from "axios"
import ErrorMessageInterface from "../interfaces/ErrorMessageInterface"
import store from "../redux-store"
import { setErrorMessage } from "../redux-store/reducers/uiSlice"

const api = axios.create({})

api.interceptors.request.use((config: any) => {
  const token = store.getState().auth.data?.access_token
  config.headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  return config
})

api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    const errorMessage = {
      title: 'Token Expired',
      error: 'Your token has expired',
      showLoginAgainButton: true
    } as ErrorMessageInterface

    store.dispatch(setErrorMessage(errorMessage))
    console.log('[Error] Unauthorized user: ', error)
    return Promise.reject(error)
  }
})

export default api