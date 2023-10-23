
import Door from './Door';
import { doorsAPI } from '../services/door.service';
import type { IDoor, IFills } from '../types/door.types';
import {Row, Col} from "react-bootstrap"
import React from 'react'

interface IDoorsProps {
    doors: IDoor[],
    fills: IFills
}

const Doors:React.FC<IDoorsProps> = ({doors, fills})=> {

    return ( 
        <Row>
            {doors.map((door: IDoor)=>{
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