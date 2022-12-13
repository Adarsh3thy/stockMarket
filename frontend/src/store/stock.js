import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: 9000,
    strategies: ["Ethical Investing", "Value Investing"]
}

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload
        },
        setStrategies: (state, action) => {
            state.strategies = action.payload
        }
    }
})

export const {setAmount, setStrategies} = stockSlice.actions

export default stockSlice.reducer