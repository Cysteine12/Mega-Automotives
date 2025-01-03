import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const authStore = useAuthStore()
      try {
        await authStore.refreshToken()

        return API(originalRequest)
      } catch (refreshError) {
        await authStore.logout()

        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default API
