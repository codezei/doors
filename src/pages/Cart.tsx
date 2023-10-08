import { Accordion, Container } from "react-bootstrap"
import { useAppSelector } from "../hooks/store.hooks"
import { IOrder } from "../types/door.types"
import DoorPage from "./DoorPage"

const Cart: React.FC = ()=>{
    const doors: any = useAppSelector(state=>state.orderReducer.cart)
    return (
        <section>
            <Container>
            <Accordion defaultActiveKey="0">
                {
                    doors.map((door: any, doorIndex: number)=>{
                        return (
                            <Accordion.Item eventKey={String(doorIndex)} key={`door-${doorIndex}`}>
                                <Accordion.Header>
                                    {`# ${doorIndex + 1}. ${door.door.name}/${door.veneer.name}/${door.decor.name || door.veneer.name}. ${door.height}*${door.width}. ${door.opening}`}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <DoorPage orderProps={door}></DoorPage>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
                </Accordion>
            </Container>
        </section>
    )
}

export default Cart