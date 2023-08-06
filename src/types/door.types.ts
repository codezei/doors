interface IDoor {
    id: string,
    name: string,
    price: number,
    description: string,
    collection: {
        name: string,
        value: string,
    },
    render: {
        veneer: IRenderPart[]
    }

}
interface IRenderPart {
    width: number,
    height: number,
    startX: number,
    startY: number
}

interface IFills {
    veneer: IFillVeneer[],
    decor?: IFillDecor[]
}
interface IFillVeneer {
    name: string,
    image: {
        thumbnail: string,
        full: string
    }
}
interface IFillDecor {
    name: string,
    color: string
}


export type {IDoor, IRenderPart, IFillVeneer, IFillDecor, IFills}