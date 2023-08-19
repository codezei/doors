import { Section, Container, Button } from '../styles/global';
import styled from 'styled-components';
import promoBg from '../images/promo-bg.jpg';
import promoDoor from '../images/promo-door.png';
import promoPlant from '../images/promo-plant.png';

const PromoSection = styled(Section)`
    background-image:  url(${promoDoor}), url(${promoPlant}), url(${promoBg});
    background-size: auto 100%, auto 100%, auto 100%;
    background-position: top center, top left, top center;
    background-repeat: no-repeat, no-repeat, repeat;
    display: flex;
    align-items: center;
    min-height: 100vh;
`

const PromoContent = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    padding: 15px;
    display: inline-block;
    & > *:first-child {
        margin-top: 0;
    }
    & > *:last-child {
        margin-bottom: 0;
    }
`

const PromoTitle = styled.h1`
    /* color: #fff; */
`


function Promo() {
    return ( 
        <PromoSection>
            <Container>
                <PromoContent>
                    <PromoTitle>Stylish and cozy interior <br/>can only be with doors "Doors of Style"</PromoTitle>
                    <Button href="">View Catalog</Button>
                </PromoContent>
            </Container>
        </PromoSection>
    );
}

export default Promo;