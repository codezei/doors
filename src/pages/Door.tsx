import { useParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import React from "react";
import { IDoor } from "../types/door.types";
import DoorImage from "../components/DoorImage";

function Door() {
    const {id} = useParams()
    const {data: doors, error, isLoading} = doorsAPI.useGetDoorsQuery('')
    const [door, setDoor] = React.useState<IDoor | null>(null)

    React.useEffect(()=>{
        if (!isLoading && !error && doors) {
            setDoor({...doors.filter(doorItem => doorItem.id === id)[0]})
        }
    }, [doors])
    return ( 
        <>
            {!isLoading && !error && door && <DoorImage render={door.render}></DoorImage>}
        </> 
    );
}

export default Door;