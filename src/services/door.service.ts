import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDoor, IFills, IParams } from '../types/door.types';


const simulatedDelay = <T>(data: T, delayMs: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delayMs));

export const doorsAPI = createApi({
    reducerPath: 'doorsAPI',
    baseQuery: fetchBaseQuery({baseUrl: './db'}),
    endpoints: (builder)=>({
        getDoors: builder.query({
            query: () => ({
                url: '/doors.json'
            }),
            transformResponse: (response: IDoor[]) => {
                return simulatedDelay(response, 1000)
            }
        }),
        getFills: builder.query({
            query: () => ({
                url: '/fills.json'
            })
            ,
            transformResponse: (response: IFills) => {
                return simulatedDelay(response, 1000)
            }
        }),
        getCollections: builder.query({
            query: () => ({
                url: '/collections.json'
            })
        })
    })

})


export  class Params implements IParams {

    heightDoor: number;
    widthDoor: number;
    widthPlatband: number;
    gapBottom: number;
    gapSide: number;
    scale: number;
    widthBlock: number;
    heightBlock: number;
    handleWidth: number;
    handleHeight: number;
    constructor(
        heightDoor: number,
        widthDoor: number,
        widthPlatband: number,
        gapBottom: number,
        gapSide: number,
        scale: number,
    ) {
        this.heightDoor = heightDoor;
        this.widthDoor = widthDoor;
        this.widthPlatband = widthPlatband;
        this.gapBottom = gapBottom;
        this.gapSide = gapSide;
        this.scale = scale;
        this.widthBlock = (this.widthDoor + this.widthPlatband * 2 + this.gapSide * 2) * this.scale;
        this.heightBlock = (this.heightDoor + this.gapBottom + this.widthPlatband + this.gapSide) * this.scale;
        this.handleWidth = (this.widthPlatband + this.gapSide + 25) * this.scale;
        this.handleHeight = (this.heightDoor + this.gapBottom + this.widthPlatband + this.gapSide - 1050) * this.scale
    }
}
