import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from "../../types/door.types";

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
        addToCart(state, action: PayloadAction<IOrder>) {
            state.cart.push(action.payload)
        },
        changeCart(state, action: PayloadAction<IOrder>) {
            state.cart = state.cart.map((cartItem: IOrder) => {
                return (cartItem.id === action.payload.id ? action.payload : cartItem)
            })
        }, deleteFromCart (state, action: PayloadAction<string>) {
            state.cart = state.cart.filter((cartItem: IOrder) => {
                return cartItem.id !== action.payload
            })
        }
    }

})

export const { addToCart, changeCart, deleteFromCart } = orderSlice.actions
export default orderSlice.reducer