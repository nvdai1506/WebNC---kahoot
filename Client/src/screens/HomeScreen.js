import React from 'react';
import "./HomeScreen.scss"
import {Button, Modal} from "react-bootstrap"
import { Link } from "react-router-dom";
import ListQuiz from '../components/list-quiz/ListQuiz';


import imgPlayGame from "../static/image/play-game.png"
import imgCreateGame from "../static/image/create-game.png"
import imgDeployGame from "../static/image/deploy-game.jpg"


function HomeScreen(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div id='home-screen'>
            <div className='row justify-content-between mt-5'>
                <div className='col-md-3 mt-4 select-item'>
                    <div className='image-item'>
                        <div className='image-wrap'>
                            <img src={imgPlayGame} alt="" />
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="play">
                            <Button >Play game</Button>
                        </Link>
                    </div>
                </div>

                <div className='col-md-3 mt-4 select-item'>
                    <div className='image-item'>
                        <div className='image-wrap'>
                            <img src={imgCreateGame} alt="" />
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="create">
                            <Button >Create game</Button>
                        </Link>
                    </div>
                </div>

                <div className='col-md-3 mt-4 select-item'>
                    <div className='image-item'>
                        <div className='image-wrap'>
                            <img src={imgDeployGame} alt="" />
                        </div>
                    </div>
                    <div className='button'>
                        
                        <Button onClick={() => setModalShow(true)}>Host game</Button>
                       
                    </div>
                </div>

            </div>

            <ListQuiz></ListQuiz>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Games: 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListQuiz isHost={true} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HomeScreen;