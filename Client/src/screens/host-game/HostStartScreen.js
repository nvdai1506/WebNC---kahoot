import React from 'react';

import "./HostStartScreen.scss"
import {FaUser} from "react-icons/fa";
import {FiUserCheck} from "react-icons/fi"
import { Button } from 'react-bootstrap';


function HostStartScreen(props) {

    const { code, players, startQuestion } = props;

    function handleNextQuestion() {
        startQuestion(0);
    }

    return (
        <div id="host-start">
            <div className='host-container'>
                <div className='h-head'>
                    <div className='code-pin'>
                        <p>Code pin:</p>
                        <h1>{code}</h1>
                    </div>
                </div>
                <div className='h-main'>
                    <div className='count-user'>
                        <FaUser /> <span>{players.length}</span>
                    </div>
                    <div className='list-user'>
                        <div className='row'>
                            {players.map((item, index) => {
                                return (
                                    <div className='player col-3 align-items-center' key={index}>
                                        <div className="content row">
                                            <FiUserCheck className="col-3" /> 
                                            <span className="col-9">{item.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='buttons'>
                        {players.length && <Button variant='primary' onClick={handleNextQuestion}>Start</Button>}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HostStartScreen;