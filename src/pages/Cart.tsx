import { Accordion, Container } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/store.hooks"
import DoorDetails from "../components/DoorDetails"
import { IDoor, IOrder } from "../types/door.types"
import { MdDeleteForever } from "react-icons/md"
import { deleteFromCart } from "../store/reducers/orderSlice"
import EmptyMessage from "../components/EmptyMessage"

const Cart: React.FC = ()=>{
    const doors: IOrder[] = useAppSelector(state=>state.orderReducer.cart)


    return (
        <section>
            <Container>
                {
                    doors.length ? <Accordion defaultActiveKey="0">
                        {
                            doors.map((door: IOrder, doorIndex: number)=>{
                                return (
                                    <Accordion.Item eventKey={String(doorIndex)} key={`door-${doorIndex}`}>
                                        <Accordion.Header>

                                            {`# ${doorIndex + 1}. ${door?.door?.name}/${door?.veneer?.name}/${door?.decor?.name || door?.veneer?.name}. ${door.height}*${door.width}. ${door.opening}`}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <DoorDetails orderProps={door}></DoorDetails>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            }) 
                        }
                    </Accordion> : <EmptyMessage message="Basket is empty"></EmptyMessage>
                }

            </Container>
        </section>
    )
}

export default Cart