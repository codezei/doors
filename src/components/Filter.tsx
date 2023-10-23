import React, {ChangeEvent} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IDoor } from "../types/door.types";

interface IFilterProps {
    doors: IDoor[],
    setFilteredDoors: any
}
interface ICollection {
    name: string,
    value: string,
    checked: boolean
}

const Filter: React.FC<IFilterProps> = ({doors, setFilteredDoors})=> {

    const [collections, setCollections] = React.useState<ICollection[]>(
        createUniqueCollection(doors)
    )
    const [name, setName] = React.useState('')

    const [cost, setCost] = React.useState({
        min: getMinCost(),
        max: getMaxCost()
    })

    const [applyFilteredDoors, setApplyFilteredDoors] = React.useState(doors)


    function getMinCost () {
       return doors.reduce((prevItem, currentItem)=>{
            return currentItem.price < prevItem ? currentItem.price: prevItem
        }, doors[0].price)
    }

    function getMaxCost () {
        return doors.reduce((prevItem, currentItem)=>{
            return currentItem.price > prevItem ? currentItem.price: prevItem
        }, doors[0].price) 
    }

    function changeCostHandler (e: ChangeEvent<HTMLInputElement>) {
        setCost((prevCost)=>{
            return {...prevCost, [e.target.name]: +e.target.value}
        })
    }


    function createUniqueCollection (data: IDoor[]) {
        const collections = data.map((door)=>{
            return {...door.collection, checked: true}
        })
        const uniqueCollections = collections.reduce((result: ICollection[], currentItem: ICollection)=>{
            let found = result.find((item: ICollection)=>{
                return item.name === currentItem.name
            })
            !found && result.push(currentItem)
            return result
        }, [collections[0]])
        return uniqueCollections
    }

    function changeActiveCollectionHandler (currentCollection: ICollection) {
        setCollections((prevCollections)=>{
            return prevCollections.map((collection: ICollection)=>{
                return currentCollection.name === collection.name ? {...collection, checked: !collection.checked} : collection
            })
        })
        
    }
    function changeActiveNameHandler (e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function applyCollectionFilter (doors: IDoor[]) {
        return [...doors.filter((door)=>{
            let result = collections.find((collection)=>{
                return collection.value === door.collection.value && collection.checked
            })
            return result 
        })]
    }

    function applyNameFilter (doors: IDoor[]) {
        var regex = new RegExp(name, "gi");
        return [...doors.filter((door)=>{
            return door.name.match(regex)
        })]
    }

    function applyCostFilter (doors: IDoor[]) {
        return [...doors.filter((door)=>{
            return (door.price >= cost.min) && (door.price <= cost.max)
        })]
    }

    function applyFilters () {
        let result = doors
        result = applyCollectionFilter(result)
        result = applyNameFilter(result)
        result = applyCostFilter(result)
        setFilteredDoors(result)
    }

    React.useEffect(()=>{
        applyFilters()
    }, [name, collections, cost])

    return ( 
    <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="doorName">Door name</Form.Label>
                <Form.Control type="text" placeholder="Enter door name" name="name" id="doorName" onChange={changeActiveNameHandler} value={name} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
                <Row>
                    <Col xs={6}>
                        <Form.Control type="number" placeholder="Minimum" name="min" id="minCost" value={cost.min} onChange={changeCostHandler} />
                    </Col>
                    <Col xs={6}>
                        <Form.Control type="number" placeholder="Maximum" name="max" id="maxCost" value={cost.max} onChange={changeCostHandler} />
                    </Col>
                </Row>
            </Form.Group>

            {
                collections.map((collection: ICollection)=>{
                    return (
                        <Form.Group className="mb-3" controlId={collection.value} key={collection.value}>
                            <Form.Check type="checkbox" label={collection.name} checked={collection.checked} onChange={()=>{changeActiveCollectionHandler(collection)}} />
                        </Form.Group>
                    )
                })
            }
        </Form>
    </> );
}

export default Filter;