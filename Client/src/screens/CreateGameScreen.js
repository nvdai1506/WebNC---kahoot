import React, { useEffect, useState } from 'react';

import {Modal, Button, Form, ListGroup } from 'react-bootstrap';
import './CreateGameScreen.scss'

function CreateGameScreen(props) {
    const [showModal, setShowModal] = useState(false)

    const [listQuestion, setListQuestion] = useState([]);

    useEffect(()=>{
        setListQuestion([
            { name: 'Cras justo odio' },
            { name: 'Dapibus ac facilisis in' },
            { name: 'Morbi leo risus' },
            { name: 'Porta ac consectetur ac' },
            { name: 'Vestibulum at eros' },
        ])
    }, [setListQuestion])
    

    function closeModal () {
        setShowModal(false)
    }

    return (
        <div id="create-game">
            <div className='row'>
                <div className='col-3'>
                    <ListGroup className='list-question'>
                        {listQuestion.map((item, index) =>{
                            return  (
                                <ListGroup.Item className='item-question row d-flex'>
                                    <div className='col-3'>
                                        <div className='item-index'>{index}</div>
                                    </div>
                                    <div className='col-9'>
                                        <div className='item-name'>{item.name}</div>
                                    </div>
                                </ListGroup.Item>
                            );
                        })
                        }
                    </ListGroup>
                </div>
                <div className='col-9'>

                </div>
            </div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kahoot summary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='row justify-content-between'>
                            <div className='col-7'>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter kahoot title..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control  as="textarea" rows={5} />
                                </Form.Group>
                            </div>
                            <div className='col-5'>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cover image</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Language</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Tiếng Việt</option>
                                    <option value="2">English</option>
                                </Form.Select>
                            </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">Save</Button>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateGameScreen;