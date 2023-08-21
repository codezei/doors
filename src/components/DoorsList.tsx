import { styled } from 'styled-components';
import DoorCard from './DoorCard';
import { doorsAPI } from '../services/door.service';
import type { IDoor } from '../types/door.types';

const DoorsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
`

function DoorsList() {
    const {data: doors, error : errorDoors, isLoading : isLoadingDoors} = doorsAPI.useGetDoorsQuery('')
    const {data: fills, error : errorFills, isLoading : isLoadingFills} = doorsAPI.useGetFillsQuery('')
    return ( 
        <DoorsRow>
            {!isLoadingFills && fills && !isLoadingDoors && doors && doors.map((door: IDoor)=>{
                return <DoorCard door={door} fills={fills} key={door.id}></DoorCard>
            })}
        </DoorsRow> 
    );
}

export default DoorsList;