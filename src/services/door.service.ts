import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDoor, IFills, IParams } from '../types/door.types';


const simulatedDelay = <T>(data: T, delayMs: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delayMs));

export const doorsAPI = createApi({
    reducerPath: 'doorsAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/db'}),
    endpoints: (builder)=>({
        getDoors: builder.query({
            query: () => ({
                url: '/doors.json'
            }),
            transformResponse: (response: IDoor[]) => {
                return simulatedDelay(response, 5000)
            }
        }),
        getFills: builder.query({
            query: () => ({
                url: '/fills.json'
            })
        }),
        getCollections: builder.query({
            query: () => ({
                url: '/collections.json'
            })
        })
    })

})