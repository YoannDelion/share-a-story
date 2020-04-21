import axios from 'axios'
import { toast } from 'react-toastify'
import { login, loginError, loginSuccess, logout } from '../slices/authSlice'
import { AUTH_API } from '../config'

/** Log user out && delete axios autjhorizatoin */
export const logingOut = () => dispatch => {
    dispatch(logout())
    delete axios.defaults.headers['Authorization']
    toast.info('Successfully logged out')
}

/** Try to log in && sets axios authorization */
export const loginAttempt = credentials => async dispatch => {
    dispatch(login())
    try {
        const token = await axios.post(AUTH_API, credentials)
          .then(response => {
              return response.data.token
          })

        axios.defaults.headers['Authorization'] = `Bearer ${token}`

        dispatch(loginSuccess())
        toast.success('Successfully logged in')
    } catch (e) {
        dispatch(loginError())
        return Promise.reject(e)
    }
}

