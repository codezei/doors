import {Link} from 'react-router-dom'
import { Container, Row, Navbar, Nav } from 'react-bootstrap';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useAppSelector } from '../hooks/store.hooks';

function Header() {
    const cartCount = useAppSelector(state=>state.orderReducer.cart.length)
    return ( 
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">DoorSStyle</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className='align-items-center'>
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about">
                                About Us
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className='position-relative fs-4'>
                                <AiOutlineShoppingCart></AiOutlineShoppingCart>
                                <span className='fs-6 bottom-0 position-absolute right-0 bg-primary text-white rounded-4 px-2 width-4'>{cartCount}</span>
                                
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;