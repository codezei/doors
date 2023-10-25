import {Modal} from 'react-bootstrap'
import React from 'react'
import { IOrder } from '../types/door.types'

interface ModalWindowsProps {
  showModal: boolean,
  showModalHandler: ()=> void,
  order: IOrder
}

const ModalWindow: React.FC<ModalWindowsProps> = ({showModal, showModalHandler, order})=>{
    return (
        <Modal show={showModal} onHide={showModalHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Product added to cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`${order?.door?.name}/${order?.veneer?.name}/${order?.decor?.name || order?.veneer?.name}. ${order.height}*${order.width}. ${order.opening}`}  
          </Modal.Body>
      </Modal>
    )
}

export default ModalWindow