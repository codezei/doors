import { useAppDispatch } from "../hooks/store.hooks";
import { addToCart, changeCart } from "../store/reducers/orderSlice";
import React, { ChangeEvent, FormEvent, ReactNode } from "react";
import { IOrder } from "../types/door.types";
import { Col, Row, Button, Form } from "react-bootstrap";
import { nanoid } from "nanoid";
import ModalWindow from "./ModalWindow";

interface DoorFormProps {
    order: IOrder,
    setOrder: React.Dispatch<React.SetStateAction<IOrder>>,
    children: ReactNode | null
}

const DoorForm: React.FC<DoorFormProps> = ({order, setOrder, children})=>{
    const dispatch = useAppDispatch()

    function changeDoorParamHandler(e: ChangeEvent<HTMLInputElement>) {
        if (+e.target.value < +e.target.max && +e.target.value > +e.target.min) {
            setOrder((prevOrder: IOrder)=>{
                return {
                    ...prevOrder, [e.target.name]: +e.target.value
                }
            })
        }
    }
    function changeDoorOpeningHandler(e: ChangeEvent<HTMLInputElement>) {
        setOrder((prevOrder: IOrder)=>{
            return {
                ...prevOrder, [e.target.name]: e.target.value
            }
        })
    }
    function addToCartHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(addToCart({...order, id: nanoid()}))
        showModalHandler()
        setTimeout(()=>{ showModalHandler()}, 2000)
    }

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const showModalHandler = () => setShowModal((prevShowModal)=>{return !prevShowModal});


    return (
        <>
                <Form onSubmit={addToCartHandler}>
            <Row>
                <Col xs={12} sm={"auto"}>
                    <Form.Group className="mb-3">
                        <Form.Label>Door height</Form.Label>
                        <Form.Control type="number" placeholder="Enter door height" name="height" onChange={changeDoorParamHandler} value={order.height} max={2200} />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={"auto"}>
                    <Form.Group className="mb-3">
                        <Form.Label>Door width</Form.Label>
                        <Form.Control type="number" placeholder="Enter door width" name="width" onChange={changeDoorParamHandler} value={order.width} max={900} />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={"auto"}>
                    <Form.Group className="mb-3" controlId="right-opening">
                        <Form.Check type="radio" label="Right side" onChange={changeDoorOpeningHandler} value={'right'} checked={order.opening === 'right'} name="opening" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="left-opening">
                        <Form.Check type="radio" label="Left side" onChange={changeDoorOpeningHandler} value={'left'} checked={order.opening === 'left'} name="opening" />
                    </Form.Group>
                </Col>
                {children}
            </Row>
        </Form>
        {showModal && <ModalWindow showModal={showModal} showModalHandler={showModalHandler} order={order}></ModalWindow>}
        </>

    )
}

export default DoorForm