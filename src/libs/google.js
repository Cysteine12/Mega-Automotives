import { googleTokenLogin } from 'vue3-google-login'

const login = () =>
  googleTokenLogin({
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'openid email profile',
  })

export { login }
