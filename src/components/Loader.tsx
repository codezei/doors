import { styled } from "styled-components"
import {Spinner} from "react-bootstrap"

const LoaderBlock = styled.div`
// position: fixed;
// top: 0;
// left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`

function Loader () {
    return (<LoaderBlock>
            <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </LoaderBlock>)
}

export default Loader