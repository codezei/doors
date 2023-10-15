import { useParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import { Container} from "react-bootstrap";
import DoorDetails from "../components/DoorDetails";

const DoorPage = ()=> {
    const { id } = useParams()
    const { door } = doorsAPI.useGetDoorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            door: (data?.filter((door) => door.id === id)[0])
        }),
    })


    return (
        <main>
            <Container>
                {door && <DoorDetails doorProps={door}></DoorDetails>}
            </Container>
        </main>
    );
}

export default DoorPage;