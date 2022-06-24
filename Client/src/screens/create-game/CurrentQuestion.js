import React, { useEffect, useState } from 'react';
import {Button, Form, InputGroup } from 'react-bootstrap';

// Question type: 1- 4 answer, 2- 2 answer

function CurrentQuestion(props) {
    const {listQuestion, setListQuestion} = props;

    const [currentQuestion, setCurrentQuestion] = useState({})

    const [cqValidated, setCqValidated] = useState(false);


    useEffect(()=>{
        setCurrentQuestion({type: 1, name: '', answer1: '', answer2: '', answer3: '', question4: ''})
        setListQuestion([
            { name: '', type: 1, active: true, saved: false },
        ])
    }, [setListQuestion])


    function saveCQ (event) {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setCqValidated(true);
        } else {
            let _list = [...listQuestion];
            let _index = getActiveIndex();

            _list[_index] = {..._list[_index], ...currentQuestion};

            if (currentQuestion.type === 2) {
                _list[_index].answer3 = _list[_index].answer4 = '';
            }

            _list[_index].saved = true;
            setListQuestion(_list);
        }
        
    }

    function setCQName (value) {
        setCurrentQuestion({
            ...currentQuestion,
            name: value
        })
    }

    function setCQAnswer (index ,value) {
        let _q = {...currentQuestion};
        _q["answer" + index] = value;
        setCurrentQuestion(_q);
    }

    function getActiveIndex () {
        return listQuestion.findIndex(item => item.active);
    }

    return (
        <div className='content-question container'>
            <Form noValidate validated={cqValidated} onSubmit={saveCQ}>
                <div className='question-title'>
                    <Form.Group>
                        <Form.Label className='title'>Question:</Form.Label>
                        <Form.Control
                            required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                            <Form.Select required size="lg">
                                <option>1</option>
                                <option>2</option>
                                {currentQuestion.type === 1 && <option>3</option>}
                                {currentQuestion.type === 1 && <option>4</option>}
                            </Form.Select>
                        </div>
                    </div>
                    <Button className='button-add' variant="primary" style={{float: 'right'}} type="submit">Save</Button>
                </div>
            </Form>
        </div>
    );
};

export default CurrentQuestion;