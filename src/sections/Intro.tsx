import { styled } from 'styled-components';
import { Container, Section } from '../styles/global';

const IntroSection = styled(Section)`
    
`
const IntroTitle = styled.h1`
    text-align: center;
`


function Intro() {
    return ( 
        <IntroSection>
            <Container>
                <IntroTitle>Catalog</IntroTitle>
            </Container>
        </IntroSection> 
    );
}

export default Intro;