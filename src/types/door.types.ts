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

interface IDoorImageProps {
    render: {
        veneer: IRenderPart[],
        decor?: IRenderPart[]
    },
    fills: IFills,
    activeVeneerProps?: IFillVeneer | null,
    activeDecorProps?: IFillDecor | null
}

interface IParams {
    widthDoor: number;
    heightDoor: number;
    widthPlatband: number;
    gapBottom: number;
    gapSide: number;
    widthBlock: number;
    heightBlock: number;
    scale: number; 
}


export type {IDoor, IRenderPart, IRender, IFillVeneer, IFillDecor, IFills, IDoorImageProps, IParams}