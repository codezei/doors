import { Container, Row, Col } from "react-bootstrap"
import Doors from "../components/Doors";

function Catalog () {
    return (
        <section>
            <Container>
                <Row>
                    <Col xs={12} md={4}>
                        Filter
                    </Col>
                    <Col xs={12} md={8}>
                        <Doors></Doors>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Catalog;