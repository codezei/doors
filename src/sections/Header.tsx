import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/global';

const HeaderBlock = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 10;
`

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
        <HeaderBlock>
            <Container>
                <HeaderRow>
                    <Link to="/">
                        <img src="" alt="" />
                    </Link>
                    <HeaderMenu>
                        <Link to="/">Home</Link>
                        <Link to="/catalog">Catalog</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/contacts">Contacts</Link>
                    </HeaderMenu>
                </HeaderRow>
            </Container>
        </HeaderBlock>
     );
}

export default Header;