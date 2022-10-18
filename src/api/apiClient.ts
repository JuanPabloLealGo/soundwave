import axios from "axios"
import store from "../redux-store"

const api = axios.create({})

api.interceptors.request.use((config: any) => {
  const token = store.getState().auth.data?.access_token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api