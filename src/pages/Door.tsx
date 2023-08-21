import { useParams } from "react-router-dom";
import { doorsAPI } from "../services/door.service";
import React from "react";
import { IDoor, IFillDecor, IFillVeneer } from "../types/door.types";
import DoorImage from "../components/DoorImage";
import { styled } from "styled-components";
import { Col, Container, Row } from "../styles/global";
import Loader from "../components/Loader";


const DoorWrapper = styled.div`

`
const FillVeneer = styled.button<{$active: boolean}>`
    width: 50px;
    height: 70px;
    border: none;
    padding: 0;
    border-radius: 5px;
    overflow: hidden;
    margin: 5px;
    cursor: pointer;
    border: 1px solid ${props => props.$active && "red" || "transparent"}};
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 400ms;
    }
    &:hover img {
        transform: scale(1.1)
    }
`

const FillDecor = styled(FillVeneer)`

`

function Door() {
    const {id} = useParams()
    const {door} = doorsAPI.useGetDoorsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            door: data?.filter((door) => door.id === id)[0],
        }),
    })
    const {data: fills, error : errorFills, isLoading : isLoadingFills} = doorsAPI.useGetFillsQuery('')

    const [activeVeneer, setActiveVeneer] = React.useState<IFillVeneer | null>(null)
    const [activeDecor, setActiveDecor] = React.useState<IFillDecor | null>(null)

    function changeActiveVeneerHandler (newActiveVeneer: IFillVeneer) {
        setActiveVeneer(newActiveVeneer)
    }
    function changeActiveDecorHandler (newActiveDecor: IFillDecor) {
        setActiveDecor(newActiveDecor)
    }

    React.useEffect(()=>{
        if (fills && fills.veneer) {
            setActiveVeneer(fills.veneer[Math.floor(Math.random() * fills.veneer.length)])
        }
        if (fills && fills?.decor) {
            setActiveDecor(fills.decor[Math.floor(Math.random() * fills.decor.length)])
        }
    }, [fills])


    return ( 
        <>
            {door &&
                (<DoorWrapper>
                    <Container>
                        <Row>
                            <Col>
                                {door && <DoorImage render={door.render} activeDecorProps={activeDecor} activeVeneerProps={activeVeneer}></DoorImage>}
                            </Col> 
                            <Col>
                                <p><b><u>Model:</u> {door.name}</b></p>
                                <p><u>Collection:</u> {door.collection.name}</p>
                                <p><u>Description:</u> {door.description}</p>
                                <div>
                                    {fills.veneer && fills.veneer.map((item:IFillVeneer)=>{
                                        return <FillVeneer onClick={()=>{changeActiveVeneerHandler(item)}} key={item.name} $active={activeVeneer?.name === item.name}>
                                            <img src={process.env.PUBLIC_URL + item.image.thumbnail} alt="" />
                                        </FillVeneer>
                                    })} 
                                </div>
                                
                                <div>
                                    {fills?.decor && fills.decor.map((item:IFillDecor)=>{
                                        return <FillDecor onClick={()=>{changeActiveDecorHandler(item)}} key={item.name} $active={activeDecor?.name === item.name}></FillDecor>
                                    })}
                                </div>

                            </Col> 
                        </Row>
                    </Container>
                </DoorWrapper>)}
                {!door && <Loader></Loader>}
        </>
    );
}

export default Door;