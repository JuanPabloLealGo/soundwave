import axios from "axios"
import store from "../redux-store"

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
    console.log('[Error] Unauthorized user: ', error)
  }
})

export default api