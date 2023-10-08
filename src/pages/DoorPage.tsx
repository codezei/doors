import { useParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import React, { ChangeEvent, FormEvent } from "react";
import { IDoor, IFillDecor, IFillVeneer, IOrder } from "../types/door.types";
import DoorImage from "../components/DoorImage";
import { styled } from "styled-components";
import Loader from "../components/Loader";
import { Card, Container, Col, Row, ListGroup, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/store.hooks";
import { addToCart } from "../store/reducers/orderSlice";


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

interface IDoorProps {
    orderProps?: IOrder
}

const DoorPage : React.FC<IDoorProps> = ({orderProps})=> {
    const { id } = useParams()
    const { door } = doorsAPI.useGetDoorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            door: (data?.filter((door) => door.id === id)[0])
        }),
    })
    const { data: fills, error: errorFills, isLoading: isLoadingFills } = doorsAPI.useGetFillsQuery('')
    const [order, setOrder] = React.useState<IOrder>({
        id: React.useId(),
        width: 800,
        height: 2000,
        opening: 'left',
    })
    const dispatch = useAppDispatch()

    function changeActiveVeneerHandler(newActiveVeneer: IFillVeneer) {
        setOrder({...order, veneer: newActiveVeneer})
    }
    function changeActiveDecorHandler(newActiveDecor: IFillDecor) {
        setOrder({...order, decor: newActiveDecor})
    }
    function changeDoorParamHandler (e: ChangeEvent<HTMLInputElement>) {
        if (+e.target.value < +e.target.max && +e.target.value > +e.target.min) {
            setOrder({...order, [e.target.name]: +e.target.value})
        }
    } 
    function changeDoorOpeningHandler (e: ChangeEvent<HTMLInputElement>) {
        setOrder({...order, [e.target.name]: e.target.value})
    }
    function addToCartHandler (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(addToCart(order))
    }

    React.useEffect(() => {
        if (fills && fills.veneer && !order.veneer) {
            setOrder((prevOrder)=>{return {
                ...prevOrder, veneer: fills.veneer[Math.floor(Math.random() * fills.veneer.length)]
            }})
        }
        if (fills && fills?.decor && !order.decor) {
            setOrder((prevOrder)=>{return {
                ...prevOrder, decor: fills.decor && fills.decor[Math.floor(Math.random() * fills.decor.length)]
            }})
        }
    }, [fills])

    React.useEffect(() => {
        if (door) {
            setOrder((prevOrder)=> {
                return {...prevOrder, door: door}
            })
        }
    }, [door])

    React.useEffect(() => {
        setOrder((prevOrder)=> {
            return {...prevOrder, ...orderProps}
        })
    }, [orderProps])

    return (
        <main>
            <Container>
                {order.door ?
                    <Card>
                        <Card.Header>
                            <Card.Title>{order.door.name}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={"auto"}>
                                    {<DoorImage render={order.door.render} activeDecorProps={order.decor} activeVeneerProps={order.veneer} doorHeight={order.height} doorWidth={order.width}></DoorImage>}
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <b>Collection:</b> {order.door.collection.name}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <b>Description:</b> {order.door.description}
                                        </ListGroup.Item>
                                        <ListGroup.Item><b>Price:</b> &mdash;{order.door.price} $</ListGroup.Item>
                                        <ListGroup.Item>
                                            <b>Coverage:</b><br />
                                            {fills && fills.veneer && fills.veneer.map((item: IFillVeneer) => {
                                                return <Fill onClick={() => { changeActiveVeneerHandler(item) }} key={item.name} $active={order.veneer?.name === item.name} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + item.image.thumbnail})` }}></Fill>
                                            })}
                                        </ListGroup.Item>
                                        {
                                            order.door.render?.decor &&
                                            <ListGroup.Item>
                                                <b>Decor:</b><br />
                                                {fills && fills?.decor && fills.decor.map((item: IFillDecor) => {
                                                    return <Fill onClick={() => { changeActiveDecorHandler(item) }} key={item.name} $active={order.decor?.name === item.name} style={{ backgroundColor: item.color }}></Fill>
                                                })}
                                            </ListGroup.Item>
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={addToCartHandler}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Door height</Form.Label>
                                            <Form.Control type="number" placeholder="Enter door height" name="height" onChange={changeDoorParamHandler} value={order.height} min={1800} max={2200} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Door width</Form.Label>
                                            <Form.Control type="number" placeholder="Enter door width" name="width" onChange={changeDoorParamHandler} value={order.width} min={500} max={900}  />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group className="mb-3" controlId="right-opening">
                                        <Form.Check type="radio" label="Right side" onChange={changeDoorOpeningHandler} value={'right'} checked={order.opening === 'right'} name="opening" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="left-opening">
                                        <Form.Check type="radio" label="Left side" onChange={changeDoorOpeningHandler} value={'left'} checked={order.opening === 'left'} name="opening" />
                                    </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Button variant="primary" type="submit">
                                            To cart
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Footer>
                    </Card>
                    : <Loader></Loader>}
            </Container>
        </main>
    );
}

export default DoorPage;