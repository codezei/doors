
import React from 'react';
import { styled } from 'styled-components';
import { IFillVeneer, IFills, IRenderPart, IFillDecor } from '../types/door.types';

const CanvasDoor = styled.canvas`
width: 200px;
display: block;
`
const CanvasTemp = styled.canvas`
display: none;
`
interface IDoorImageProps {
    render: {
        veneer: IRenderPart[],
        decor?: IRenderPart[]
    },
    fills: IFills,
    activeVeneerProps?: IFillVeneer | null,
    activeDecorProps?: IFillDecor | null
}

const DoorImage: React.FC<IDoorImageProps> = ({render, fills, activeDecorProps, activeVeneerProps})=> {

    const canvasBlockRef = React.useRef<HTMLCanvasElement>(null);
    const canvasFillRef = React.useRef<HTMLCanvasElement>(null);
    const activeVenner = activeVeneerProps || fills.veneer[Math.floor(Math.random() * fills.veneer.length)]
    const activeDecor = activeDecorProps || (fills?.decor && fills?.decor[Math.floor(Math.random() * fills.decor.length)])


    function drawDoor () {
        if (canvasBlockRef.current && canvasFillRef.current) {
            const doorCtx = canvasBlockRef.current.getContext("2d");
            const fillCtx = canvasFillRef.current.getContext("2d");
            const fillImage = new Image()
            fillImage.onload = function () {
                fillCtx?.drawImage(fillImage, 0, 0, fillImage.width, fillImage.height);
                render.veneer.forEach((veneerItem)=>{
                    const fillImageData = fillCtx && fillCtx.getImageData(
                        Math.floor(Math.random() * veneerItem.startX),
                        Math.floor(Math.random() * veneerItem.startY),
                        veneerItem.width,
                        veneerItem.height
                    );
                    if (fillImageData) {
                        doorCtx && doorCtx.putImageData(fillImageData, veneerItem.startX, veneerItem.startY);
                    }
                })

                render.decor && render.decor.forEach((decorItem)=>{
                    if (doorCtx && activeDecor) {
                        doorCtx.fillStyle = activeDecor.color;
                        doorCtx.fillRect(
                            decorItem.startX,
                            decorItem.startY,
                            decorItem.width,
                            decorItem.height
                        );
                    }
 
                })
            }
            fillImage.src = process.env.PUBLIC_URL +'/'+ activeVenner.image.full
        }

        
        
    }

    React.useEffect(()=>{
        drawDoor()
    }, [activeDecorProps, activeVeneerProps])

    return ( 
        <>
            <CanvasDoor
                width={946}
                height={2083}
                ref={canvasBlockRef}
            ></CanvasDoor>
            <CanvasTemp
                width={946}
                height={2083}
                ref={canvasFillRef}
            ></CanvasTemp>
        </> 
    );
}

export default DoorImage;