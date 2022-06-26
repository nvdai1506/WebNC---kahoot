import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'

import Answer4 from '../../static/image/4-answer.jpg';
import Answer2 from '../../static/image/2-answer.jpg';

const DEFAULT_Q = {type: 1, question: '', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: null,};

function ListQuestion(props) {
    const {listSavedQuestion, currentQuestion, setCurrentQuestion, pushQuestion, saveListQuestion, removeQuestion} = props;

    const [listQuestion, setListQuestion] = useState([]);
    const [showModalLayout, setShowModalLayout] = useState(false);
    const [showModalError, setShowModalError] =useState(false);


    let refLayout1;


    useEffect(()=>{
        if (listSavedQuestion.length) {
            setListQuestion(listSavedQuestion);
        } else {
            setListQuestion([{...DEFAULT_Q, index: 0}]);
            setCurrentQuestion({...DEFAULT_Q, index: 0});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listSavedQuestion])

    useEffect(()=>{
        if(listQuestion.length && currentQuestion && listQuestion[currentQuestion.index] && listQuestion[currentQuestion.index].saved) {
            try {
                if (!isEqual(currentQuestion, listQuestion[currentQuestion.index])) {
                    let _list = [...listQuestion];
                    _list[currentQuestion.index] = {...currentQuestion, saved: false};
                    setListQuestion(_list);
                }
                
            } catch (error) {
                
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestion])

    function isEqual(objA, objB) {
        
        let arr = ['question', 'type','index', 'answer1', 'answer2', 'answer3', 'answer4', 'correctAnswer'];
        for (let index = 0; index < arr.length; index++) {
            if (objA[arr[index]] !== objB[arr[index]]) {
                return false;
            }
        }
        return true;
    }


    function activeQuestion(index) {
        if(!listQuestion[currentQuestion.index].saved && index !== currentQuestion.index) {
            setShowModalError(true);
        } else {
            setCurrentQuestion(listQuestion[index]);
        }
       
    }

    function addQuestion () {
        if (!listQuestion[currentQuestion.index].saved) {
            setShowModalError(true);
        } else {
            let _list = [...listQuestion];
            let _item = {...DEFAULT_Q, index: _list.length};
            _list.push(_item);
            setListQuestion(_list);
            setCurrentQuestion(_item);
            openModalLayout(true);
        }
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
        let targetIndex = parseInt(e.dataTransfer.getData("index"));

        let _list = listQuestion.filter((_item, _index) => _index !== targetIndex);
        let _listResult = [..._list.slice(0, index), listQuestion[targetIndex], ..._list.slice(index)]

        let arrSuccess = [];
        for (let i = 0; i < _listResult.length; i++) {
            if (_listResult[i].saved && _listResult[i].index !== i) {
                pushQuestion({..._listResult[i], index: i}).then((res)=>{
                    arrSuccess.push({..._listResult[i], index: i});

                    if(i === _listResult.length - 1) {
                        saveListQuestion(arrSuccess);
                    }
                })
            }
        }

        

        setListQuestion(_listResult);
    }
    function allowDrop(e) {
        e.preventDefault();
    }

    return (
        <div className='list-question-wrap'>
            <ListGroup className='list-question'>
                {listQuestion.map((item, index) =>{
                    return  (
                        <ListGroup.Item 
                            className={'item-question row d-flex' + (item.index === currentQuestion.index ? ' active' : '') + (item.saved ? ' saved' : '')} 
                            key={index} 
                            draggable={currentQuestion.saved}
                            onDragStart={(e) => handleDrag(e, index)} 
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={allowDrop}
                            onClick={() => {activeQuestion(index)}}
                        >
                            <div className='col-2'>
                                <div className='item-index'>{index}</div>
                            </div>
                            <div className='col-8'>
                                <div className='item-name'>{item.question}</div>
                            </div>
                            <div className='col-1 iq-icon'>
                                {(item.index === currentQuestion.index || currentQuestion.saved)&& <BsTrash onClick={()=>removeQuestion(index)}/>}
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

            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalError}
            >
                <Modal.Header className="justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter" style={{color: "red"}}>
                        Error!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">Please save the question!</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>setShowModalError(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListQuestion;