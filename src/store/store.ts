import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { doorsAPI } from '../services/door.service'
import doorReducer from './reducers/doorSlice'


const rootReducer = combineReducers({
  doorReducer,
  [doorsAPI.reducerPath]: doorsAPI.reducer
})





export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(doorsAPI.middleware)
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch