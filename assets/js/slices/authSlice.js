import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isFetching: false,
    isLogged: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: state => { state.isFetching = true },
        loginSuccess: state => {
            state.isFetching = false
            state.isLogged = true
        },
        loginError: state => { state.isFetching = false },
        logout: state => { state.isLogged = false }
    }
})

export const { login, loginSuccess, loginError, logout } = authSlice.actions

export default authSlice.reducer

export const loginAttempt = credentials => async dispatch => {
    dispatch(login())
    try {
        const token = await axios.post('http://127.0.0.1:8000/api/login_check', credentials)
          .then(response => {
              return response.data.token
          })

        window.localStorage.setItem('authToken', token)
        axios.defaults.headers['Authorization'] = `Bearer ${token}`

        dispatch(loginSuccess())
    } catch (e) {
        dispatch(loginError())
        throw e
    }
}