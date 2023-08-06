import { Link } from 'react-router-dom';
import { Section } from '../styles/global';
import { styled } from 'styled-components';

import collectionImg1 from '../images/collection-1.jpg';
import collectionImg2 from '../images/collection-2.jpg';
import collectionImg3 from '../images/collection-3.jpg';
import collectionImg4 from '../images/collection-4.jpg';

const SectionCollections = styled.section`
    /* height: 100vh; */
`

const Collection = styled(Link)`
    width: 50%;
    height: 50vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    /* text-decoration: none; */
    text-transform: uppercase;
    &:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(44, 63, 50, 0.5);
        z-index: -1;
    }
    &:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(47, 93, 61, 0.5);
        z-index: -2;
        transition: all 400ms;
    }
    &:hover:after {
        width: 100%;
        height: 100%;
    }
`

const CollectionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const CollectionImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -3;
    object-fit: cover;
`

function Collections() {

    const collections = [
        {
            id: '1',
            name: 'Collection Classica',
            value: 'classica',
            image: collectionImg1
        },
        {
            id: '2',
            name: 'Collection Moderna',
            value: 'moderna',
            image: collectionImg2
        },
        {
            id: '3',
            name: 'Collection Artigianale',
            value: 'artigianale',
            image: collectionImg3
        },
        {
            id: '4',
            name: 'Collection Elegante',
            value: 'elegante',
            image: collectionImg4
        }
    ]

    return ( 
        <SectionCollections>
            <CollectionRow>
                {collections.map(collection=>{
                    return (
                        <Collection to={`catalog/${collection.value}`} key={collection.id}>
                            {collection.name}
                            <CollectionImg src={collection.image} alt="" />
                        </Collection>
                    )
                })}
            </CollectionRow>
        </SectionCollections>

     );
}

export default Collections;