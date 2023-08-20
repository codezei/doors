
import { styled } from 'styled-components';
import type { IDoor } from '../types/door.types';
import DoorImage from './DoorImage';
import { doorsAPI } from '../services/door.service';
import { Link } from 'react-router-dom';

interface IDoorProps {
    door: IDoor
}

const Door = styled(Link)`
    position: relative;
    color: inherit;
    text-decoration: none;
    padding: 0 5px;
    /* display: flex; */
`
const DoorInfo = styled.div`
    padding: 0 5px;
    p {
        margin: 5px 0;
    }
`
const DoorTitle = styled.h4`

`
const DoorCollection = styled.div`

`
const DoorView = styled(DoorImage)`
    
`


const DoorCard: React.FC<IDoorProps> = ({door}) => {
    const {data: fills, error, isLoading} = doorsAPI.useGetFillsQuery('')
    return ( 
        <Door to={'/' + door.id}>
            {!isLoading && <DoorView render={door.render}></DoorView>} 
            {!isLoading && <DoorInfo>
                <p>Model: <b>{door.name}</b></p>
                <p>Collection: <b>{door.collection.name}</b></p>
                <p>Price: <b>{door.price} $</b></p>
            </DoorInfo>}
        </Door> 
    );
}

export default DoorCard;