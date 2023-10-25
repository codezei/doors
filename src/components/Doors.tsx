
import Door from './Door';
import { doorsAPI } from '../services/door.service';
import type { IDoor, IFills } from '../types/door.types';
import {Row, Col} from "react-bootstrap"
import React from 'react'
import EmptyMessage from './EmptyMessage';

interface IDoorsProps {
    doors: IDoor[],
    fills: IFills
}

const Doors:React.FC<IDoorsProps> = ({doors, fills})=> {

    return ( 
        <Row className='justify-content-center'>
            {doors.length ? doors.map((door: IDoor)=>{
                return (
                <Col xl={3} md={4} sm={6} xs={"auto"} key={door.id}>
                    <Door door={door} fills={fills}></Door>
                </Col>
                )
                
            }) : <EmptyMessage message='Not found'></EmptyMessage>}
        </Row> 
    );
}

export default Doors;