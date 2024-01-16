// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import useToast from 'src/components/Toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(false)

        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(e => {
            console.log('error', e)
            window.localStorage.removeItem(authConfig.storageTokenKeyName)
            window.localStorage.removeItem('userData')
            router.push('/login')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Toast } = useToast({ zIndex: 1000, position: 'top-end' })
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token) : null
        const returnUrl = router.query.returnUrl
        setUser(response.data.payload)
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.payload)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        Toast.fire({
          icon: 'success',
          title: 'Login successfully'
        }).then(() => {
          router.replace(redirectURL)
        })
      })
      .catch(err => {
        console.log(err)

        Toast.fire({
          icon: 'error',
          title: 'Email or password is incorrect'
        })

        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
