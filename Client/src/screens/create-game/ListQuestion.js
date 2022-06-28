import React, { useState } from 'react';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';
import Api from '../../service/api';

import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'

import Answer4 from '../../static/image/4-answer.jpg';
import Answer2 from '../../static/image/2-answer.jpg';

const DEFAULT_Q = {type: 1, question: '', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: null,};

function ListQuestion(props) {
    const {listQuestion, setListQuestion, currentQuestion, setCurrentQuestion, saveCurrentQuestion} = props;

    const [showModalLayout, setShowModalLayout] = useState(false);

    const [dropIndex, setDropIndex] = useState(-1);

    let refLayout1, timerDrop;



    function activeQuestion(index) {
        saveCurrentQuestion();
        if (index !== currentQuestion.index) {
            setCurrentQuestion(listQuestion[index]);
        }
    }

    function addQuestion () {
        let _list = [...listQuestion];
        _list[currentQuestion.index] = currentQuestion;
        let _item = {...DEFAULT_Q, index: _list.length};
        _list.push(_item);
        setListQuestion(_list);
        setCurrentQuestion(_item);
        openModalLayout(true);
    }

    function removeQuestion (index) {
        if (listQuestion[index].id) {
            Api.Question.delete(listQuestion[index].id);
        }

        let _list = [...listQuestion].filter((_item, _index) => _index !== index).map(( el, i)=>{
            return {...el, index: i};
        });
        setListQuestion(_list);
    }

    function openModalLayout () {
        setShowModalLayout(true);
    }

    function saveModalLayout () {
        let _type = refLayout1.checked ? 1 : 2;
        setCurrentQuestion({...currentQuestion, type: _type});
        setShowModalLayout(false);
    }


    function handleDrag(e, index) {
        e.dataTransfer.setData("index", index);
    }

    function handleDrop(e, index) {
        e.preventDefault();
        setDropIndex(-1);
        let targetIndex = parseInt(e.dataTransfer.getData("index"));
        
        let _list = [...listQuestion].filter((_item, _index) => _index !== targetIndex);
        let _listResult = [..._list.slice(0, index), listQuestion[targetIndex], ..._list.slice(index)].map(( el, i)=>{
            if (el.index === currentQuestion.index) {
                setCurrentQuestion({...el, index: i});
            }
            return {...el, index: i};
        });;
        setListQuestion(_listResult);

    }

    function allowDrop(e, index) {
        if (index !== dropIndex ) {
            clearTimeout(timerDrop);
            setDropIndex(index);
        }
        e.preventDefault(); 
    }

    function onDragLeave() {
        if (dropIndex !== -1 ) {
            timerDrop = setTimeout(()=>{
                setDropIndex(-1);
            }, 1000)
        }
    }

    return (
        <div className='list-question-wrap'>
            <ListGroup className='list-question'>
                {listQuestion.map((item, index) =>{
                    return  (
                        <ListGroup.Item 
                            className={
                                'item-question row d-flex mt-2' 
                                + (item.index === currentQuestion.index ? ' active' : '') 
                                + (item.isValid ? ' saved' : '')
                                + (index === dropIndex ? ' borderTop' : '')
                            } 
                            key={index} 
                            draggable
                            onDragStart={(e) => handleDrag(e, index)} 
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={(e) => allowDrop(e, index)}
                            onDragLeave={onDragLeave}
                        > 
                            <div className='col-2'>
                                <div className='item-index'>{index + 1}</div>
                            </div>
                            
                            <div className='col-8' onClick={() => {activeQuestion(index)}}>
                                <div className='item-name'>{item.question}</div>
                            </div>
                            <div className='col-1 iq-icon'>
                                <BsTrash onClick={()=>removeQuestion(index)}/>
                                {item.index === currentQuestion.index && <FiEdit onClick={openModalLayout}/>}
                            </div>
                        </ListGroup.Item>
                    );
                })
                }
                <Button className='button-add' variant="primary" onClick={addQuestion}>Add question</Button>
            </ListGroup>

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
                                    /> :
                                    <Form.Check
                                        reverse
                                        name="group1"
                                        type='radio'
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

export default ListQuestion;