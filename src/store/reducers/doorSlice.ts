import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {IDoor} from '../../types/door.types'

interface IState {
    doors: IDoor[] | any
}


const initialState: IState = {
    doors: []
}


const doorsSlice = createSlice({
    name: 'doors',
    initialState,
    reducers: {
        setDoors(state, action: PayloadAction<IDoor>) {
            state.doors = action.payload
        }
    }
})

export const { setDoors } = doorsSlice.actions
export default doorsSlice.reducer