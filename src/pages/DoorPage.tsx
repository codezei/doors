import { useParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import DoorDetails from "../components/DoorDetails";

const DoorPage: React.FC = ()=> {
    const { id } = useParams()
    const { door } = doorsAPI.useGetDoorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            door: (data?.filter((door) => door.id === id)[0])
        }),
    })
    return (
        <main className="py-4">
            {door && <DoorDetails doorProps={door}></DoorDetails>}
        </main>
    );
}

export default DoorPage;