import { authStore } from './auth/reducer'
import { combineReducers } from 'redux';

const AppReducer = combineReducers({
    authStore
})

export default AppReducer
