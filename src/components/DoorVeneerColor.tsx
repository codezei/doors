import React from "react"
import { doorsAPI } from "../services/door.service";
import { ListGroup} from "react-bootstrap";
import { IFillVeneer, IOrder } from "../types/door.types";
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

const DoorVeneerColor: React.FC<IDoorVeneerColorProps> = ({ order, setOrder })=>{
    const { data: fills, error: errorFills, isLoading: isLoadingFills } = doorsAPI.useGetFillsQuery('')


    function changeActiveVeneerHandler(newActiveVeneer: IFillVeneer) {
        setOrder({ ...order, veneer: newActiveVeneer })
    }


    React.useEffect(() => {
        if (fills && fills.veneer && !order.veneer) {
            setOrder((prevOrder: IOrder) => {
                return {
                    ...prevOrder, veneer: fills.veneer[Math.floor(Math.random() * fills.veneer.length)]
                }
            })
        }
    }, [fills])

    return (
        <ListGroup.Item>
            <b>Coverage:</b><br />
            {fills && fills.veneer && fills.veneer.map((item: IFillVeneer) => {
                return <Fill onClick={() => { changeActiveVeneerHandler(item) }} key={item.name} $active={order.veneer?.name === item.name} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + item.image.thumbnail})` }}></Fill>
            })}
        </ListGroup.Item>
    )
}

export default DoorVeneerColor