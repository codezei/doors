import { Accordion, Container } from "react-bootstrap"
import { useAppSelector } from "../hooks/store.hooks"
import DoorDetails from "../components/DoorDetails"
import { IOrder } from "../types/door.types"

const Cart: React.FC = ()=>{
    const doors: IOrder[] = useAppSelector(state=>state.orderReducer.cart)
    return (
        <section>
            <Container>
            <Accordion defaultActiveKey="0">
                {
                    doors.length ? doors.map((door: any, doorIndex: number)=>{
                        return (
                            <Accordion.Item eventKey={String(doorIndex)} key={`door-${doorIndex}`}>
                                <Accordion.Header>
                                    {`# ${doorIndex + 1}. ${door.door.name}/${door.veneer.name}/${door?.decor?.name || door.veneer.name}. ${door.height}*${door.width}. ${door.opening}`}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <DoorDetails orderProps={door}></DoorDetails>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }) : "Сart is empty"
                }
                </Accordion>
            </Container>
        </section>
    )
}

export default Cart