
import { styled } from 'styled-components';
import type { IDoor, IFills } from '../types/door.types';
import DoorImage from './DoorImage';
import { doorsAPI } from '../services/door.service';
import { Link } from 'react-router-dom';

interface IDoorProps {
    door: IDoor,
    fills: IFills
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


const DoorCard: React.FC<IDoorProps> = ({door, fills}) => {
    
    return ( 
        <Door to={'/' + door.id}>
            <DoorView 
                render={door.render} 
                activeDecorProps={fills?.decor && fills?.decor[Math.floor(Math.random() * fills.decor.length)]} 
                activeVeneerProps={fills.veneer[Math.floor(Math.random() * fills.veneer.length)]}
            ></DoorView>
            <DoorInfo>
                <p>Model: <b>{door.name}</b></p>
                <p>Collection: <b>{door.collection.name}</b></p>
                <p>Price: <b>{door.price} $</b></p>
            </DoorInfo>
        </Door> 
    );
}

export default DoorCard;