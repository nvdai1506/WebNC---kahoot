import React, { useEffect, useState } from 'react';

import {Modal, Button, Form, ListGroup, ButtonGroup, InputGroup } from 'react-bootstrap';
import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'

import './CreateGameScreen.scss'

import Answer4 from '../static/image/4-answer.jpg';
import Answer2 from '../static/image/2-answer.jpg';

// Question type: 1- 4 answer, 2- 2 answer

function CreateGameScreen(props) {
    const _this = this;

    const [showModal, setShowModal] = useState(false)
    const [showModalLayout, setShowModalLayout] = useState(false)

    const [quizInfo, setQuizInfo] = useState({title: '', description: ''})
    const [currentQuestion, setCurrentQuestion] = useState({})

    const [listQuestion, setListQuestion] = useState([]);

    let refLayout1, refLayout2;

    useEffect(()=>{

        setCurrentQuestion({type: 1, name: '', answer1: '', answer2: '', answer3: '', question4: ''})
        setListQuestion([
            { name: '', type: 1, active: true, saved: false },
        ])
        setShowModal(true);
        
    }, [])
    

    function saveQuizInfo () {
        setShowModal(false)
    }

    function openModle () {
        setShowModal(true)
    }

    function openModalLayout () {
        setShowModalLayout(true);
    }

    function saveModalLayout () {
        let _type = refLayout1.checked ? 1 : 2;
        setCurrentQuestion({...currentQuestion, type: _type});
        setShowModalLayout(false);
    }

    function setTitleQuiz (value) {
        setQuizInfo({
            ...quizInfo,
            title: value
        })
    }

    function setDescriptionQuiz (value) {
        setQuizInfo({
            ...quizInfo,
            description: value
        })
    }

    function setCQName (value) {
        setCurrentQuestion({
            ...currentQuestion,
            name: value
        })
    }

    function setCQAnswer (index ,value) {
        let _q = [...currentQuestion];
        _q["answer" + index] = value;
        setCurrentQuestion(_q);
    }

    function saveCQ () {
        let _list = [...listQuestion];
        let _index = getActiveIndex();
        _list[_index] = {..._list[_index], ...currentQuestion};
        _list[_index].saved = true;
        setListQuestion(_list);
    }

    function saveAndAdd () {
        saveCQ();
        let _list = [...listQuestion]

        _list = _list.map((item)=>{
            return {...item, active: false};
        });
        _list.push({type: 1, active: true, name: '', answer1: '', answer2: '', answer3: '', question4: ''});
        setCurrentQuestion(_list[_list.length - 1]);

        setListQuestion(_list);
        openModalLayout();
    }

    // function removeItem(index) {
    //     let _list = [...listQuestion]
    //     _list.re
    // }

    function activeQuestion(index) {
        setListQuestion(listQuestion.map((_item, _index) => {
            if (index === _index) {
                return {..._item, active: true};
            } else {
                return {..._item, active: false};
            }
        }));
        setCurrentQuestion(listQuestion[index]);
    }

    function getActiveIndex () {
        return listQuestion.findIndex(item => item.active);
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
                                    <div className='col-1 iq-icon'>
                                        <BsTrash />
                                        {item.active && <FiEdit onClick={openModalLayout}/>}
                                    </div>
                                </ListGroup.Item>
                            );
                        })
                        }
                        <Button className='button-add' variant="primary" onClick={saveAndAdd}>Save & Add</Button>
                    </ListGroup>
                </div>
                <div className='col-9'>
                    <div className='quiz-header row my-4 mx-2'>
                        <h4 className='col-9'>{quizInfo.title}</h4>
                        <div className='complete-button col-3'>
                            <ButtonGroup>
                                <Button variant="outline-secondary" className='mx-4' onClick={openModle}>Edit</Button>
                                <Button variant="success">Complete</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className='content-question container'>
                        <div className='question-title'>
                            <Form.Group>
                                <Form.Label className='title'>Question:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Typing your question here"
                                    className='text-area'
                                    onChange={()=>{}}
                                    value={currentQuestion.name}
                                    onChangeCapture={(e)=>setCQName(e.target.value)}
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
                                            onChange={()=>{}}
                                            value={currentQuestion.answer1}
                                            onChangeCapture={(e)=>setCQAnswer(1, e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                                <div className='item-answer item-2 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-2 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-2'
                                            placeholder='Answer 2'
                                            onChange={()=>{}}
                                            value={currentQuestion.answer2}
                                            onChangeCapture={(e)=>setCQAnswer(2, e.target.value)}
                                        />
                                    </InputGroup>
                                </div>
                                {currentQuestion.type === 1 && 
                                <div className='item-answer item-3 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-3 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-3'
                                            placeholder='Answer 3'
                                            onChange={()=>{}}
                                            value={currentQuestion.answer3}
                                            onChangeCapture={(e)=>setCQAnswer(3, e.target.value)}
                                        />
                                    </InputGroup>
                                </div>}
                                {currentQuestion.type === 1 && 
                                <div className='item-answer item-4 col-5'>
                                    <InputGroup className="mb-3">
                                        <div className='icon-4 icon col-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            id='input-answer-4'
                                            placeholder='Answer 4'
                                            onChange={()=>{}}
                                            value={currentQuestion.answer4}
                                            onChangeCapture={(e)=>setCQAnswer(4 , e.target.value)}
                                        />
                                    </InputGroup>
                                </div>}
                            </div>
                            <div className='answer'>
                                <div className='form-answer'>
                                    <Form.Label className='title'>Answer:</Form.Label>
                                    <Form.Select size="lg">
                                        <option>1</option>
                                        <option>2</option>
                                        {currentQuestion.type === 1 && <option>3</option>}
                                        {currentQuestion.type === 1 && <option>4</option>}
                                    </Form.Select>
                                </div>
                            </div>
                            <Button className='button-add' variant="primary" style={{float: 'right'}} onClick={saveCQ}>Save</Button>
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
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kahoot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='row justify-content-between'>
                            <div className='col-7'>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter kahoot title..." 
                                        value={quizInfo.title}
                                        onChange={()=>{}}
                                        onChangeCapture={(e)=>setTitleQuiz(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control  as="textarea" rows={5} 
                                        value={quizInfo.description}
                                        onChange={()=>{}}
                                        onChangeCapture={(e)=>setDescriptionQuiz(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-5'>
                            {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cover image</Form.Label>
                                <Form.Control type="file" style={{pointerEvents: 'none'}}/>
                            </Form.Group> */}
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Language</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Tiếng Việt</option>
                                </Form.Select>
                            </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={saveQuizInfo}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalLayout}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Kahoot
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='row justify-content-between select-type'>
                            <div className='col-6 item'>
                                <img className='prev-img' src={Answer4} alt=''/>
                            </div>
                            <div className='col-6 item'>
                                <img className='prev-img' src={Answer2} alt=''/>
                            </div>

                            <div className='col-6 item mt-3'>
                                {currentQuestion.type === 1 ?
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type='radio'
                                        checked
                                        onChange={()=>{}}
                                        ref={(e) => refLayout1 = e}
                                    /> :
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type='radio'
                                        onChange={()=>{}}
                                        ref={(e) => refLayout1 = e}
                                    />
                                }
                            </div>
                            <div className='col-6 item mt-3'>
                            {currentQuestion.type === 2 ?
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type='radio'
                                        checked
                                        onChange={()=>{}}
                                        ref={(e) => refLayout2 = e}
                                    /> :
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type='radio'
                                        onChange={()=>{}}
                                        ref={(e) => refLayout2 = e}
                                    />
                                }
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={saveModalLayout}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateGameScreen;