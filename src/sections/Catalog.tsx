import { Container, Row, Col } from "react-bootstrap"
import Doors from "../components/Doors";
import Filter from "../components/Filter";
import { doorsAPI } from '../services/door.service';
import React from 'react'
import { IDoor } from "../types/door.types";

function Catalog () {

    const {data: doors, error : errorDoors, isLoading : isLoadingDoors} = doorsAPI.useGetDoorsQuery('')
    const {data: fills, error : errorFills, isLoading : isLoadingFills} = doorsAPI.useGetFillsQuery('')

    const [filteredDoors, setFilteredDoors] = React.useState(doors)

    React.useEffect(()=>{
        setFilteredDoors(doors)
    }, [doors])

    return (
        <section>
            <Container>
                <Row>
                    <Col xs={12} md={3}>
                        {!isLoadingFills && fills && !isLoadingDoors && doors && <Filter doors={doors} setFilteredDoors={setFilteredDoors}></Filter>}
                    </Col>
                    <Col xs={12} md={9}>
                        {!isLoadingFills && fills && !isLoadingDoors && filteredDoors && <Doors doors={filteredDoors} fills={fills}></Doors>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Catalog;