import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface IOrder {

}

interface IState {
    cart: IOrder[]
}

const initialState: IState = {
    cart: []
}


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToCart (state, action: PayloadAction<IOrder>) {
            state.cart.push(action.payload)
        }
    }

})

export const {addToCart} = orderSlice.actions
export default orderSlice.reducer