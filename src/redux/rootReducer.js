import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import orderReducer from './orderSlice'
import preferencesReducer from './preferencesSlice'

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    preferences: preferencesReducer
})

export default rootReducer