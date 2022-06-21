import React, { useEffect, useState } from 'react';

import {Modal, Button, Form, ListGroup, FloatingLabel, InputGroup } from 'react-bootstrap';
import './CreateGameScreen.scss'

function CreateGameScreen(props) {
    const [showModal, setShowModal] = useState(false)

    const [listQuestion, setListQuestion] = useState([]);

    useEffect(()=>{
        setListQuestion([
            { name: 'Cras justo odio', active: true, saved: true },
            { name: 'Dapibus ac facilisis in' },
            { name: 'Morbi leo risus' },
            { name: 'Porta ac consectetur ac' },
            { name: 'Vestibulum at eros' },
        ])
    }, [setListQuestion])
    

    function closeModal () {
        setShowModal(false)
    }

    function activeQuestion(index) {
        setListQuestion(listQuestion.map((_item, _index) => {
            if (index === _index) {
                return {..._item, active: true};
            } else {
                return {..._item, active: false};
            }
        }))
    }

    function handleDrag(e, index) {
        e.dataTransfer.setData("index", index);
    }
    function handleDrop(e, index) {
        let targetIndex = parseInt(e.dataTransfer.getData("index"));

        let _list = listQuestion.filter((_item, _index) => _index !== targetIndex);
        let _listResult = [..._list.slice(0, index), listQuestion[targetIndex], ..._list.slice(index)]
        setListQuestion(_listResult);
    }
    function allowDrop(e) {
        e.preventDefault();
    }

    return (
        <div id="create-game">
            <div className='row'>
                <div className='col-3'>
                    <ListGroup className='list-question'>
                        {listQuestion.map((item, index) =>{
                            return  (
                                <ListGroup.Item 
                                    className={'item-question row d-flex' + (item.active ? ' active' : '') + (item.saved ? ' saved' : '')} 
                                    key={index} 
                                    draggable 
                                    onDragStart={(e) => handleDrag(e, index)} 
                                    onDrop={(e) => handleDrop(e, index)}
                                    onDragOver={allowDrop}
                                    onClick={() => {activeQuestion(index)}}
                                >
                                    <div className='col-2'>
                                        <div className='item-index'>{index}</div>
                                    </div>
                                    <div className='col-8'>
                                        <div className='item-name'>{item.name}</div>
                                    </div>
                                    <div className='col-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </div>
                                </ListGroup.Item>
                            );
                        })
                        }
                        <Button className='button-add' variant="primary">Add question</Button>
                    </ListGroup>
                </div>
                <div className='col-9'>
                    <div className='content-question container'>
                        <div className='question-title'>
                            <Form.Group>
                                <Form.Label className='title'>Question:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Typing your question here"
                                    className='text-area'
                                />
                            </Form.Group>
                        </div>
                        <div className='question-answers'>
                            <div className='list-answer row'>
                                <div className='item-answer item-1 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-1 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-1'
                                            placeholder='Answer 1'
                                        />
                                    </InputGroup>
                                </div><div className='item-answer item-2 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-2 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-2'
                                            placeholder='Answer 2'
                                        />
                                    </InputGroup>
                                </div><div className='item-answer item-3 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-3 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-3'
                                            placeholder='Answer 3'
                                        />
                                    </InputGroup>
                                </div><div className='item-answer item-4 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-4 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-4'
                                            placeholder='Answer 4'
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className='answer'>
                                <div className='form-answer'>
                                    <Form.Label className='title'>Answer:</Form.Label>
                                    <Form.Select size="lg">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                    </div>
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