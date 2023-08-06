import { styled } from 'styled-components';
import Filter from '../components/Filter';
import Doors from '../components/Doors';
import { Container } from '../styles/global';

const CatalogRow = styled.div`
    display: flex;
`


function CatalogDoors() {
    return ( 
        <Container>
            <CatalogRow>
            <Filter></Filter>
            <Doors></Doors>
        </CatalogRow>
        </Container>

     );
}

export default CatalogDoors;