import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface IOrder {

}

interface IState {
    orders: IOrder[]
}

const initialState: IState = {
    orders: []
}


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder (state, action: PayloadAction<IOrder>) {
            state.orders.push(action.payload)
        }
    }

})

export const {addOrder} = orderSlice.actions
export default orderSlice.reducer