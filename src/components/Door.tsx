
import type { IDoor, IFills } from '../types/door.types';
import { useParams, useSearchParams } from "react-router-dom";
import DoorImage from './DoorImage';
import { doorsAPI } from '../services/door.service';
import { Link } from 'react-router-dom';
import {Card, Button} from "react-bootstrap"

interface IDoorProps {
    door: IDoor,
    fills: IFills
}



const Door: React.FC<IDoorProps> = ({door, fills}) => {

    return ( 
        <Card as={Link} to={`/${door.id}`} style={{textDecoration: 'none'}}>
            <Card.Body>
                <DoorImage 
                    render={door.render} 
                    activeDecorProps={fills?.decor && fills?.decor[Math.floor(Math.random() * fills.decor.length)]} 
                    activeVeneerProps={fills.veneer[Math.floor(Math.random() * fills.veneer.length)]}
                ></DoorImage>
            </Card.Body>
            <Card.Footer>
                <blockquote className="blockquote mb-0">
                    <p>
                        {door.name}
                    </p>
                    <footer className="blockquote-footer">
                        {door.price} $
                    </footer>
                </blockquote>
            </Card.Footer>
        </Card> 
    );
}

export default Door