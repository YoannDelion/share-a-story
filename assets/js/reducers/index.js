import { combineReducers } from 'redux'
import storyReducer from '../slices/storySlice'
import authReducer from '../slices/authSlice'

export default combineReducers({ storyReducer, authReducer })