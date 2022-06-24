import React, { useContext, useEffect, useState } from 'react';
import { ButtonGroup, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

import Api from '../../service/api';

function QuizHeader(props) {
    const history = useHistory();

    const { createGameSession, setCreateGameSession } = useContext(AppContext);

    const [showModal, setShowModal] = useState(false)
    const [quizInfo, setQuizInfo] = useState({});
    const [quizValidated, setQuizValidated] = useState(false);

    useEffect(()=>{
        if (!createGameSession) {
            setShowModal(true);
        } else {
            setQuizInfo(createGameSession);
        }
        
        
    }, [createGameSession])
    

    function saveQuizInfo (event) {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setQuizValidated(true);
        } else {
            let data = Object.fromEntries(new FormData(form).entries());

            Api.Quiz.add({
                quiz_name: data.title,
                info: data.description
            }).then((res)=>{
                console.log("Success");
                setQuizInfo(data);
                setCreateGameSession(data);
                setShowModal(false)
            })

        }

    }

    function openModle () {
        setShowModal(true)
    }
    function complete() {
        setCreateGameSession(null);
        history.push("/");
    }

    

    return (
        <div className='quiz-header'>
            <div className='quiz-header row my-4 mx-2'>
                <h4 className='col-9'>{quizInfo.title}</h4>
                <div className='complete-button col-3'>
                    <ButtonGroup>
                        <Button variant="outline-secondary" className='mx-4' onClick={openModle}>Edit</Button>
                        <Button variant="success" onClick={complete}>Complete</Button>
                    </ButtonGroup>
                </div>
            </div>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
            >
                <Form noValidate validated={quizValidated} onSubmit={saveQuizInfo}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Kahoot
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row justify-content-between'>
                            <div className='col-7'>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required name="title" type="text" placeholder="Enter kahoot title..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required name="description" as="textarea" rows={5} />
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"  type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default QuizHeader;