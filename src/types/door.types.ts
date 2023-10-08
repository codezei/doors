interface IDoor {
    id: string,
    name: string,
    price: number,
    description: string,
    collection: {
        name: string,
        value: string,
    },
    render: IRender

}
interface IRender {
    veneer: IRenderPart[],
    decor?: IRenderPart[]
}
interface IRenderPart {
    width: (string | number) [],
    height: (string | number) [],
    startX: (string | number) [],
    startY: (string | number) [],
}

interface IRenderData {
    width: number,
    height: number,
    startX: number,
    startY: number,
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
    color: string,
    image: string,
}


interface IParams {
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
}

interface IOrder {
    id: string,
    door?: IDoor,
    width: number,
    height: number,
    opening: string,
    veneer?: IFillVeneer,
    decor?: IFillDecor
}


export type {IDoor, IRenderPart, IRender, IFillVeneer, IFillDecor, IFills, IParams, IRenderData, IOrder}