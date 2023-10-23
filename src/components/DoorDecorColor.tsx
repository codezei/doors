import React from "react"
import { doorsAPI } from "../services/door.service";
import { ListGroup} from "react-bootstrap";
import { IFillDecor, IOrder } from "../types/door.types";
import { styled } from "styled-components";


interface IDoorVeneerColorProps {
    order: IOrder,
    setOrder: React.Dispatch<React.SetStateAction<IOrder>>
}

const Fill = styled.button<{ $active: boolean }>`
    width: 50px;
    height: 70px;
    border: none;
    padding: 0;
    border-radius: 5px;
    overflow: hidden;
    margin: 5px;
    cursor: pointer;
    box-shadow: 2px 2px 4px ${props => props.$active && "#007380" || "#ccc"};
    transition: all 400ms;
    background: linear-gradient(135deg, rgba(255,255,255,0) 0%, ${props => props.$active && "rgba(255,255,255,0.4) 50%" || "rgba(255,255,255,0.2) 50%"},rgba(255,255,255,0) 100%);
`

const DoorDecorColor: React.FC<IDoorVeneerColorProps> = ({ order, setOrder })=>{
    const { data: fills, error: errorFills, isLoading: isLoadingFills } = doorsAPI.useGetFillsQuery('')


    function changeActiveDecorHandler(newActiveDecor: IFillDecor) {
        setOrder({ ...order, decor: newActiveDecor })
    }

    React.useEffect(() => {
        if (fills && fills?.decor && !order.decor) {
            setOrder((prevOrder: IOrder) => {
                return {
                    ...prevOrder, decor: fills.decor && fills.decor[Math.floor(Math.random() * fills.decor.length)]
                }
            })
        }
    }, [fills])

    return (
        <ListGroup.Item>
            <b>Decor:</b><br />
            {fills && fills?.decor && fills.decor.map((item: IFillDecor) => {
                return <Fill onClick={() => { changeActiveDecorHandler(item) }} key={item.name} $active={order.decor?.name === item.name} style={{ backgroundColor: item.color }}></Fill>
            })}
        </ListGroup.Item>
    )
}

export default DoorDecorColor