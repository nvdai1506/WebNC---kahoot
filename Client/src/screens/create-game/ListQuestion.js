import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';

import {BsTrash} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'

import Answer4 from '../../static/image/4-answer.jpg';
import Answer2 from '../../static/image/2-answer.jpg';


function ListQuestion(props) {
    const {currentQuestion, setCurrentQuestion, saveCQ} = props;

    const [listQuestion, setListQuestion] = useState([]);
    const [showModalLayout, setShowModalLayout] = useState(false);


    let refLayout1;

    useEffect(()=>{
        setListQuestion([{type: 1, active: true}])
    },[])


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