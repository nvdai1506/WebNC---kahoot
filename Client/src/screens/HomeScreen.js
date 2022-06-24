import React from 'react';
import "./HomeScreen.scss"
import {Button} from "react-bootstrap"
import { Link } from "react-router-dom";
import ListQuiz from '../components/list-quiz/ListQuiz';


import imgPlayGame from "../static/image/play-game.png"
import imgCreateGame from "../static/image/create-game.png"
import imgDeployGame from "../static/image/deploy-game.jpg"


function HomeScreen(props) {
    return (
        <div id='home-screen'>
            <div className='row justify-content-between mt-5'>
                <div className='col-3 select-item'>
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

                <div className='col-3 select-item'>
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

                <div className='col-3 select-item'>
                    <div className='image-item'>
                        <div className='image-wrap'>
                            <img src={imgDeployGame} alt="" />
                        </div>
                    </div>
                    <div className='button'>
                        <Link to="deploy">
                            <Button >Host game</Button>
                        </Link>
                    </div>
                </div>

            </div>

            <ListQuiz></ListQuiz>

        </div>
    );
}

export default HomeScreen;