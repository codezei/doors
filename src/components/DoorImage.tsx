
import React from 'react';
import { styled } from 'styled-components';
import { IFillVeneer, IFills, IRenderPart, IFillDecor, IDoorImageProps, IParams, IRender } from '../types/door.types';

const CanvasDoor = styled.canvas`
width: 200px;
display: block;
`
const CanvasTemp = styled.canvas`
display: none;
`


const DoorImage: React.FC<IDoorImageProps> = ({render, fills, activeDecorProps, activeVeneerProps})=> {
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
            this.scale = scale;
            this.widthBlock = (this.widthDoor + this.widthPlatband * 2 + this.gapSide * 2) * this.scale;
            this.heightBlock = (this.heightDoor + this.gapBottom + this.widthPlatband + this.gapSide) * this.scale;
        }
    }

    const doorParams: any = new Params (800, 2000, 70, 10, 3, 0.4)
    const [renderData, setRenderData] = React.useState(tranasformRenderData(render))

    const canvasBlockRef = React.useRef<HTMLCanvasElement>(null);
    const canvasFillRef = React.useRef<HTMLCanvasElement>(null);
    const canvasFillHorizontalRef = React.useRef<HTMLCanvasElement>(null);
    const canvasDecorRef = React.useRef<HTMLCanvasElement>(null);

    const activeVenner = activeVeneerProps || fills.veneer[Math.floor(Math.random() * fills.veneer.length)]
    const activeDecor = activeDecorProps || (fills?.decor && fills?.decor[Math.floor(Math.random() * fills.decor.length)])

    function tranasformRenderData (data: any) {
        let transformedRenderData = {...data}
        for (let renderType in transformedRenderData) {
            transformedRenderData = {...transformedRenderData, [renderType]: transformedRenderData[renderType].map((renderItem: any)=>{
                let transformedProperties:any = {}
                for (let renderProperty in renderItem) {
                    transformedProperties[renderProperty] = renderItem[renderProperty].reduce((prevItem: any, currentItem: any)=>{
                        
                        return (doorParams[currentItem] || currentItem) * doorParams.scale + prevItem
                    }, 0)
                   
                }
                return {...transformedProperties}
            })}
        }
        return transformedRenderData
    }
    
    
    


    function drawDoor () {
        if (canvasBlockRef.current && canvasFillRef.current && canvasFillHorizontalRef.current) {
            const doorCtx = canvasBlockRef.current.getContext("2d");
            const fillCtx = canvasFillRef.current.getContext("2d");
            const fillHorizontalCtx = canvasFillHorizontalRef.current.getContext("2d");
            const fillImage = new Image()
            fillImage.src = process.env.PUBLIC_URL +'/'+ activeVenner.image.full
            const furnitureImage = new Image ()
            furnitureImage.src = process.env.PUBLIC_URL +'/doorhandle.png'


            fillImage.onload = function () {
                // отрисовка вертикальной текстуры на полотно
                fillCtx?.drawImage(fillImage, 0, 0, fillImage.width, fillImage.height);

                // отрисовка горизонтальной текстуры на полотно
                fillHorizontalCtx?.drawImage(fillImage, 0, 0, fillImage.width, fillImage.width);
                fillHorizontalCtx?.translate(fillImage.width, 0);
                fillHorizontalCtx?.rotate((90 * Math.PI) / 180);

                renderData.veneer.forEach((veneerItem: IRenderPart)=>{
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

                        }
  
                    }
                })

            }
            
        }
        if (activeDecor && canvasDecorRef.current && canvasBlockRef.current) {
            const doorCtx = canvasBlockRef.current.getContext("2d");
            const decorCtx = canvasDecorRef.current.getContext("2d");
            const decorImage = new Image ()
            decorImage.src = process.env.PUBLIC_URL +'/'+ activeDecor.image

            decorImage.onload = function () {
                // отрисовка текстуры на полотно
                decorCtx?.drawImage(decorImage, 0, 0, decorImage.width, decorImage.height);
                // отрисовка декора
                renderData.decor && renderData.decor.forEach((decorItem: IRenderPart)=>{
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
                            doorCtx.fillStyle = activeDecor.color;
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
                            // doorCtx.shadowColor = "rgba(0, 0, 0, 0.5)";
                            // doorCtx.shadowBlur = 10;
                            // doorCtx.shadowOffsetX = 5;
                            // doorCtx.shadowOffsetY = 5;

                            // doorCtx.strokeRect(decorItem.startX, decorItem.startY, decorItem.width,
                            //     decorItem.height);
                        }
                    }
                })
            }
        }

        // if (canvasBlockRef.current) {
        //     const doorCtx = canvasBlockRef.current.getContext("2d");
        //     const furnitureImage = new Image ()
        //     furnitureImage.src = process.env.PUBLIC_URL +'/doorhandle.png'
        //     furnitureImage.onload = function () {
        //         doorCtx && doorCtx.drawImage(furnitureImage, 90 * doorParams.scale, 1050 * doorParams.scale, furnitureImage.width * doorParams.scale, furnitureImage.height * doorParams.scale)
        //     }
        // }
    }

    React.useEffect(()=>{
        if (renderData) {
            drawDoor()
        }
        
    }, [activeDecorProps, activeVeneerProps])

    // React.useEffect(()=>{
    //     tranasformRenderData(newData)
    // }, [])

    return ( 
        <>
            <CanvasDoor
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
                ref={canvasBlockRef}
            ></CanvasDoor>
            <CanvasTemp
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
                ref={canvasFillRef}
            ></CanvasTemp>
            <CanvasTemp
                width={doorParams.widthBlock}
                height={doorParams.heightBlock}
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