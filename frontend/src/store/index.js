import { configureStore } from '@reduxjs/toolkit'
import stockReducer from './stock'

export const store = configureStore({
    reducer : {
        stock: stockReducer,
    },
})

