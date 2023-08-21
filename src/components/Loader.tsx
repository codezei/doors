import { styled } from "styled-components"

const LoaderBlock = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`

function Loader () {
    return (<LoaderBlock>...Loading</LoaderBlock>)
}

export default Loader