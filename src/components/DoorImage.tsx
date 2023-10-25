
import React from 'react';
import { styled } from 'styled-components';
import { IFillVeneer, IRenderPart, IRenderData, IFillDecor, IParams, IRender } from '../types/door.types';
import { Params } from '../services/door.service';

const CanvasDoor = styled.canvas<{$active: boolean}>`
width: 200px;
max-width: 100%;
display: block;
transform: ${props=> props.$active ? 'scale(-1, 1)' : 'scale(1, 1)'}
`
const CanvasTemp = styled.canvas`
display: none;
`
interface IDoorImageProps {
    render: IRender,
    activeVeneerProps?: IFillVeneer | null,
    activeDecorProps?: IFillDecor | null,
    doorWidth?: number,
    doorHeight?: number,
    opening?: string
}


const DoorImage: React.FC<IDoorImageProps> = ({render, activeDecorProps, activeVeneerProps, doorWidth, doorHeight, opening})=> {

    // const doorParams: IParams = new Params (2000, 800,  70, 10, 3, 0.4)
    const [doorParams, setDoorParams] = React.useState<IParams>(new Params ( 2000 || doorHeight, 800 || doorWidth,  70, 10, 3, 0.4))
    const [renderData, setRenderData] = React.useState<{veneer: IRenderData[], decor?: IRenderData[]}>(transformRenderData(render))
    

    const canvasBlockRef = React.useRef<HTMLCanvasElement>(null);
    const canvasFillRef = React.useRef<HTMLCanvasElement>(null);
    const canvasFillHorizontalRef = React.useRef<HTMLCanvasElement>(null);
    const canvasDecorRef = React.useRef<HTMLCanvasElement>(null);



    function transformRenderData (data: IRender) : {veneer: IRenderData[], decor?: IRenderData[]} {
        let result = Object.fromEntries(
            Object.entries(data).map(([typeRenderKey, typeRenderValue] : [string, IRenderPart[]]) => {
                    let newTypeRenderValue = typeRenderValue.map((renderItem:IRenderPart)=> {
                        return Object.fromEntries(
                            Object.entries(renderItem).map(([renderItemKey, renderItemValues]: [string, (string | number)[]])=> {
                                let newRenderItemValues = renderItemValues.reduce((prevRenderItemValue:number, renderItemValue: string | number)=>{                                   
                                    if (typeof renderItemValue === "string") {
                                        return Math.floor(doorParams[renderItemValue as keyof IParams] * doorParams.scale + prevRenderItemValue)
                                    }
                                    return Math.floor(renderItemValue * doorParams.scale + prevRenderItemValue)
                                    
                                    
                                }, 0)
                                return [renderItemKey, newRenderItemValues]
                            })
                        )
                    })
                    return [typeRenderKey, newTypeRenderValue]
            })
        );
        return JSON.parse(JSON.stringify(result))
    }
    function drawDoor () {

        if (canvasBlockRef.current && canvasFillRef.current && canvasFillHorizontalRef.current && activeVeneerProps) {
            const doorCtx : CanvasRenderingContext2D | null = canvasBlockRef.current.getContext("2d", { willReadFrequently: true });
            const fillCtx : CanvasRenderingContext2D | null = canvasFillRef.current.getContext("2d", { willReadFrequently: true });
            const fillHorizontalCtx : CanvasRenderingContext2D | null = canvasFillHorizontalRef.current.getContext("2d", { willReadFrequently: true });
            const fillImage : HTMLImageElement = new Image()
            fillImage.src = process.env.PUBLIC_URL +'/'+ activeVeneerProps.image.full
            const furnitureImage : HTMLImageElement = new Image ()
            furnitureImage.src = process.env.PUBLIC_URL +'/doorhandle.png'

            if (doorCtx) {
                doorCtx.clearRect(0, 0, canvasBlockRef.current.width, canvasBlockRef.current.height)
            }


            fillImage.onload = function (): void {
                // отрисовка вертикальной текстуры на полотно
                if (canvasFillRef.current) {
                    fillCtx?.drawImage(fillImage, 0, 0, canvasFillRef.current.width, canvasFillRef.current.height);
                }
                

                // отрисовка горизонтальной текстуры на полотно
                if (canvasFillHorizontalRef.current) {
                    fillHorizontalCtx?.drawImage(fillImage, 0, 0, canvasFillHorizontalRef.current.width, canvasFillHorizontalRef.current.width);
                    if (!fillHorizontalCtx?.getTransform().e) {
                        fillHorizontalCtx?.translate(canvasFillHorizontalRef.current.width, 0);
                        fillHorizontalCtx?.rotate((90 * Math.PI) / 180);
                    }
                }
                


                renderData.veneer.forEach((veneerItem: IRenderData)=>{
                    // вырезание на полотне необходимых участков
                    let currentCtx = veneerItem.width > veneerItem.height ? fillHorizontalCtx : fillCtx
                    const fillImageData = currentCtx && currentCtx.getImageData(
                        Math.floor(Math.random() * veneerItem.startX),
                        Math.floor(Math.random() * veneerItem.startY),
                        veneerItem.width,
                        veneerItem.height
                    );

                    if (fillImageData) {
                        if (doorCtx) {
                            // отрисовка вырезанных участков
                            doorCtx.putImageData(fillImageData, veneerItem.startX, veneerItem.startY);
                            // отрисовка теней
                            doorCtx.strokeStyle = "rgba(0, 0, 0, 0.1)";
                            doorCtx.lineWidth = 1;
                            doorCtx.strokeRect(
                                veneerItem.startX,
                                veneerItem.startY,
                                veneerItem.width,
                                veneerItem.height
                            );

                            // doorCtx.shadowColor = "rgba(0, 0, 0, 0.5)";
                            // doorCtx.shadowBlur = 5;
                            // doorCtx.shadowOffsetX = 0;
                            // doorCtx.shadowOffsetY = 0;
                            // doorCtx.strokeRect(veneerItem.startX, veneerItem.startY, veneerItem.width,
                            //     veneerItem.height);
                        }
                    }
                })

                const furnitureImage : HTMLImageElement = new Image ()
                furnitureImage.src = process.env.PUBLIC_URL +'/doorhandle.png'
                furnitureImage.onload = function (): void {
                    doorCtx && doorCtx.drawImage(furnitureImage, doorParams.handleWidth, 1050 * doorParams.scale, furnitureImage.width * doorParams.scale, furnitureImage.height * doorParams.scale)
                }
            

            }
            
        }
        if (activeDecorProps && canvasDecorRef.current && canvasBlockRef.current) {
            const doorCtx : CanvasRenderingContext2D | null = canvasBlockRef.current.getContext("2d", { willReadFrequently: true });
            const decorCtx : CanvasRenderingContext2D | null = canvasDecorRef.current.getContext("2d", { willReadFrequently: true });
            const decorImage : HTMLImageElement = new Image ()
            decorImage.src = process.env.PUBLIC_URL +'/'+ activeDecorProps.image
            decorImage.onload = function (): void {
                // отрисовка текстуры на полотно
                decorCtx?.drawImage(decorImage, 0, 0, decorImage.width, decorImage.height);
                // отрисовка декора
                renderData.decor && renderData.decor.forEach((decorItem: IRenderData)=>{
                    // вырезание на полотне необходимых участков
                    const decorImageData = decorCtx && decorCtx.getImageData(
                        Math.floor(Math.random() * decorItem.startX),
                        Math.floor(Math.random() * decorItem.startY),
                        decorItem.width,
                        decorItem.height
                    );
                    if (decorImageData) {
                        if (doorCtx) {
                            // отрисовка вырезанных участков
                            doorCtx.putImageData(decorImageData, decorItem.startX, decorItem.startY);
                            doorCtx.globalAlpha = 0.95
                            doorCtx.fillStyle = activeDecorProps.color;
                            doorCtx.fillRect(
                                decorItem.startX,
                                decorItem.startY,
                                decorItem.width,
                                decorItem.height
                            );
                            doorCtx.globalAlpha = 1
                            const gradient = doorCtx.createLinearGradient(decorItem.startX, decorItem.startY, decorItem.width,
                                decorItem.height);
                            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
                            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                            doorCtx.fillStyle = gradient;
                            doorCtx.fillRect(decorItem.startX, decorItem.startY, decorItem.width,
                                decorItem.height);


                            // тень
                            doorCtx.shadowColor = "rgba(0, 0, 0, 0.2)";
                            doorCtx.shadowBlur = 10;
                            doorCtx.shadowOffsetX = 0;
                            doorCtx.shadowOffsetY = 0;
                            doorCtx.strokeRect(decorItem.startX, decorItem.startY, decorItem.width,
                                decorItem.height);
                        }
                    }
                })
            }
        }
    }

    React.useEffect(()=>{
        if (renderData) {
            drawDoor()
        }
    }, [activeDecorProps, activeVeneerProps, renderData])

    React.useEffect(()=>{
        if (doorHeight && doorWidth) {
            setDoorParams({...doorParams, ...new Params (doorHeight, doorWidth,  70, 10, 3, 0.4)})
        }
        
    }, [doorWidth, doorHeight])

    React.useEffect(()=>{
        setRenderData(transformRenderData(render))
    }, [doorParams])

    return ( 
        <>
            <CanvasDoor
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
                ref={canvasBlockRef}
                $active={opening === 'left'}
            ></CanvasDoor>
            <CanvasTemp
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
                ref={canvasFillRef}
            ></CanvasTemp>
            <CanvasTemp
                width={doorParams.heightBlock}
                height={doorParams.widthBlock}
                ref={canvasFillHorizontalRef}
            ></CanvasTemp>
            <CanvasTemp
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
                ref={canvasDecorRef}
            ></CanvasTemp>
        </> 
    );
}

export default DoorImage;