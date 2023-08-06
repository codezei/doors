import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/global';

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
`
const HeaderMenu = styled.nav`
    display: flex;
    align-items: center;
    a {
        color: inherit;
        text-decoration: none;
        padding: 0.5rem 1rem
    }
`


function Header() {
    return ( 
        <header>
            <Container>
                <HeaderRow>
                    <Link to="/">
                        <img src="" alt="" />
                    </Link>
                    <HeaderMenu>
                        <Link to="/">Home</Link>
                        <Link to="catalog">Catalog</Link>
                        <Link to="about">About Us</Link>
                        <Link to="contacts">Contacts</Link>
                    </HeaderMenu>
                </HeaderRow>
            </Container>
        </header>
     );
}

export default Header;