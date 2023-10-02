
import Door from './Door';
import { doorsAPI } from '../services/door.service';
import type { IDoor } from '../types/door.types';
import {Row, Col} from "react-bootstrap"


function Doors() {
    const {data: doors, error : errorDoors, isLoading : isLoadingDoors} = doorsAPI.useGetDoorsQuery('')
    const {data: fills, error : errorFills, isLoading : isLoadingFills} = doorsAPI.useGetFillsQuery('')
    return ( 
        <Row>
            {!isLoadingFills && fills && !isLoadingDoors && doors && doors.map((door: IDoor)=>{
                return (
                <Col xs={"auto"} key={door.id}>
                    <Door door={door} fills={fills}></Door>
                </Col>
                )
                
            })}
        </Row> 
    );
}

export default Doors;