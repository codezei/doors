import { Container } from "react-bootstrap";
import promoBg from '../images/promo-bg.jpg'



const Promo: React.FC = ()=> {
    return (

        <section style={{
            paddingTop: 200,
            paddingBottom: 200,
            backgroundImage: `url(${promoBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center'
        }}>
            <Container>
                <h1 style={{color: '#fff'}}>Stylish and cozy interior <br/>can only be with doors "Doors of Style"</h1>
            </Container>
        </section>

    );
}

export default Promo;