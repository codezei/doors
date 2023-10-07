import { useParams, useSearchParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import React, { ChangeEvent } from "react";
import { IDoor, IFillDecor, IFillVeneer } from "../types/door.types";
import DoorImage from "../components/DoorImage";
import { styled } from "styled-components";
import Loader from "../components/Loader";
import { Card, Container, Col, Row, ListGroup, Button, Form } from "react-bootstrap";


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

function DoorPage() {
    const { id } = useParams()

    const { door } = doorsAPI.useGetDoorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            door: data?.filter((door) => door.id === id)[0],
        }),
    })

    const { data: fills, error: errorFills, isLoading: isLoadingFills } = doorsAPI.useGetFillsQuery('')

    const [activeVeneer, setActiveVeneer] = React.useState<IFillVeneer | null>(null)
    const [activeDecor, setActiveDecor] = React.useState<IFillDecor | null>(null)

    const [order, setOrder] = React.useState({
        width: 800,
        height: 2000,
        opening: 'left'
    })
    const [doorLoad, setDoorLoad] = React.useState(false)

    function changeActiveVeneerHandler(newActiveVeneer: IFillVeneer) {
        setActiveVeneer(newActiveVeneer)
    }
    function changeActiveDecorHandler(newActiveDecor: IFillDecor) {
        setActiveDecor(newActiveDecor)
    }
    function changeDoorParamHandler (e: ChangeEvent<HTMLInputElement>) {
        if (+e.target.value < +e.target.max && +e.target.value > +e.target.min) {
            setOrder({...order, [e.target.name]: +e.target.value})
        }
        
    } 
    function changeDoorOpeningHandler (e: ChangeEvent<HTMLInputElement>) {
        setOrder({...order, [e.target.name]: e.target.value})
    }


    React.useEffect(() => {
        if (fills && fills.veneer) {
            setActiveVeneer(fills.veneer[Math.floor(Math.random() * fills.veneer.length)])
        }
        if (fills && fills?.decor) {
            setActiveDecor(fills.decor[Math.floor(Math.random() * fills.decor.length)])
        }
    }, [fills])


    return (
        <main>
            <Container>
                {door ?
                    <Card>
                        <Card.Header>
                            <Card.Title>{door.name}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={"auto"}>
                                    {doorLoad ? <Loader></Loader> : door && <DoorImage render={door.render} activeDecorProps={activeDecor} activeVeneerProps={activeVeneer} doorHeight={order.height} doorWidth={order.width}></DoorImage>}
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <b>Collection:</b> {door.collection.name}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <b>Description:</b> {door.description}
                                        </ListGroup.Item>
                                        <ListGroup.Item><b>Price:</b> &mdash;{door.price} $</ListGroup.Item>
                                        <ListGroup.Item>
                                            <b>Coverage:</b><br />
                                            {fills.veneer && fills.veneer.map((item: IFillVeneer) => {
                                                return <Fill onClick={() => { changeActiveVeneerHandler(item) }} key={item.name} $active={activeVeneer?.name === item.name} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + item.image.thumbnail})` }}></Fill>
                                            })}
                                        </ListGroup.Item>
                                        {
                                            door.render?.decor &&
                                            <ListGroup.Item>
                                                <b>Decor:</b><br />
                                                {fills.decor && fills.decor.map((item: IFillDecor) => {
                                                    return <Fill onClick={() => { changeActiveDecorHandler(item) }} key={item.name} $active={activeDecor?.name === item.name} style={{ backgroundColor: item.color }}></Fill>
                                                })}
                                            </ListGroup.Item>
                                        }
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Form>
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
                                            Submit
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