import { styled } from 'styled-components';
import DoorCard from './DoorCard';
import { doorsAPI } from '../services/door.service';
import type { IDoor } from '../types/door.types';

const DoorsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
`

function Doors() {
    const {data: doors, error, isLoading} = doorsAPI.useGetDoorsQuery('')
    return ( 
        <DoorsRow>
            {doors && doors.map((door: IDoor)=>{
                return <DoorCard door={door} key={door.id}></DoorCard>
            })}
        </DoorsRow> 
    );
}

export default Doors;