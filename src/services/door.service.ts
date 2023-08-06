import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doorsAPI = createApi({
    reducerPath: 'doorsAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/db'}),
    endpoints: (builder)=>({
        getDoors: builder.query({
            query: () => ({
                url: '/doors.json'
            })
        }),
        getFills: builder.query({
            query: () => ({
                url: '/fiils.json'
            })
        }),
        getCollections: builder.query({
            query: () => ({
                url: '/collections.json'
            })
        })
    })

})

