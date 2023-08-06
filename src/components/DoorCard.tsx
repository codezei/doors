
import { styled } from 'styled-components';
import type { IDoor } from '../types/door.types';
import DoorImage from './DoorImage';
import { doorsAPI } from '../services/door.service';

interface IDoorProps {
    door: IDoor
}

const DoorRow = styled.div`
    /* display: flex; */
`
const DoorInfo = styled.div`

`
const DoorView = styled(DoorImage)`
    
`

const DoorCard: React.FC<IDoorProps> = ({door}) => {
    const {data, error, isLoading} = doorsAPI.useGetFillsQuery('')
    return ( 
        <DoorRow>
           {!isLoading && <DoorView render={door.render} fills={data} activeDecorProps={null} activeVeneerProps={null}></DoorView>} 
            <DoorInfo>
                <h2>{door.name}</h2>
                <h3>{door.collection.name}</h3>
                <p>{door.description}</p>
                <h4>{door.price}</h4>
            </DoorInfo>
        </DoorRow> 
    );
}

export default DoorCard;