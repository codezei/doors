import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IParams } from '../types/door.types';


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
            transformResponse: (response: any) => {
                return simulatedDelay(response, 5000)
            }
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




class Params implements IParams {
    widthDoor: number;
    heightDoor: number;
    widthPlatband: number;
    gapBottom: number;
    gapSide: number;
    widthBlock: number;
    heightBlock: number;
    scale: number;

    constructor(
        widthDoor: number,
        heightDoor: number,
        widthPlatband: number,
        gapBottom: number,
        gapSide: number,
        scale: number
    ) {
        this.widthDoor = widthDoor;
        this.heightDoor = heightDoor;
        this.widthPlatband = widthPlatband;
        this.gapBottom = gapBottom;
        this.gapSide = gapSide;
        this.widthBlock = this.widthDoor + this.widthPlatband * 2 + this.gapSide * 2;
        this.heightBlock = this.heightDoor + this.gapBottom + this.widthPlatband + this.gapSide;
        this.scale = scale
    }
}

function tranasformRenderData (data: any) {


    return
}


const doorParams = new Params (800, 2000, 70, 10, 3, 0.4)