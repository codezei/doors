import { styled } from 'styled-components';
import FilterList from '../components/FilterList';
import DoorsList from '../components/DoorsList';
import { Container } from '../styles/global';

const CatalogRow = styled.div`
    display: flex;
`


function CatalogDoors() {
    return ( 
        <Container>
            <CatalogRow>
                <FilterList></FilterList>
                <DoorsList></DoorsList>
            </CatalogRow>
        </Container>

     );
}

export default CatalogDoors;