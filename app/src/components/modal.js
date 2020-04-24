import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import check from '../assets/check.svg';
import oops from '../assets/oops.svg';

const MyModal = (props) => {
    return(
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header style={{alignItems: 'center'}} closeButton>
                {props.success ? 
                    <img alt="" style={{height: '3em', marginRight: 15}} src={check}/>
                    :
                    <img alt="" style={{height: '3em', marginRight: 15}} src={oops}/>
                }
                <Modal.Title id="contained-modal-title-vcenter">
                {props.success ? 'Success!': 'Oops!'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p style={{padding: 20}}>{props.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default MyModal;