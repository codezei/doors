import { ListGroup } from "react-bootstrap"
import { IDoor } from "../types/door.types"

interface doorInfoProps {
    door: IDoor
}

const DoorInfo: React.FC<doorInfoProps> = ({door})=>{
    return (
        <>
            <ListGroup.Item>
                <b>Collection:</b> {door.collection.name}
            </ListGroup.Item>
            <ListGroup.Item>
                <b>Description:</b> {door.description}
            </ListGroup.Item>
            <ListGroup.Item><b>Price:</b> &mdash;{door.price} $</ListGroup.Item>
        </>
    )
}
export default DoorInfo