
import { Card, Col, Row, ListGroup, Button } from "react-bootstrap";
import React from "react";
import { IDoor, IOrder } from "../types/door.types";
import DoorImage from "../components/DoorImage";
import Loader from "../components/Loader";
import DoorInfo from "./DoorInfo";
import DoorVeneerColor from "./DoorVeneerColor";
import DoorDecorColor from "./DoorDecorColor";
import DoorForm from "./DoorForm";
import { useAppDispatch } from "../hooks/store.hooks";
import { changeCart } from "../store/reducers/orderSlice";
import { nanoid } from "@reduxjs/toolkit";
import { deleteFromCart } from "../store/reducers/orderSlice"

interface IDoorProps {
    orderProps?: IOrder,
    doorProps?: IDoor
}

const DoorDetails: React.FC<IDoorProps> = ({ orderProps, doorProps }) => {
    const dispatch = useAppDispatch()
    const [order, setOrder] = React.useState<IOrder>({
        id: nanoid(),
        width: 800,
        height: 2000,
        opening: 'right',
        ...orderProps
    })
    function deleteFromCartHandler (id: string): void {
        dispatch(deleteFromCart(id))
    }
    React.useEffect(() => {
        if (doorProps) {
            setOrder((prevOrder) => {
                return { ...prevOrder, door: doorProps }
            })
        }
    }, [doorProps])

    React.useEffect(() => {
        dispatch(changeCart(order))
    }, [order])


    return (
        <>
            {
                order.door ? 
                <Card>
                <Card.Header>
                    <Card.Title>{order.door.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={"auto"}>
                            <DoorImage opening={order.opening} render={order.door.render} activeDecorProps={order.decor} activeVeneerProps={order.veneer} doorHeight={order.height} doorWidth={order.width}></DoorImage>
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <DoorInfo door={order.door}></DoorInfo>
                                <DoorVeneerColor order={order} setOrder={setOrder}></DoorVeneerColor>
                                {order.door.render?.decor && <DoorDecorColor order={order} setOrder={setOrder}></DoorDecorColor>}
                            </ListGroup>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <DoorForm order={order} setOrder={setOrder}>
                        <Col xs={12}>
                            {!orderProps ? 
                                <Button variant="primary" type="submit">To cart</Button>
                                : <Button variant="danger" type="button" onClick={()=>{deleteFromCartHandler(order.id)}}>Remove</Button>
                            }
                        </Col> 
                            
                    </DoorForm>
                </Card.Footer>
            </Card>
            : <Loader></Loader>
            }
        </>

    )
}
export default DoorDetails