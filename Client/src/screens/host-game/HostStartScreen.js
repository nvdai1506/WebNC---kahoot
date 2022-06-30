import React, { useEffect, useState } from 'react';

import "./HostStartScreen.scss"
import {FaUser} from "react-icons/fa";
import {FiUserCheck} from "react-icons/fi"
import { Button } from 'react-bootstrap';

import { io } from "socket.io-client";
import Api from '../../service/api';

let socket;

function HostStartScreen(props) {
    const id = useState();

    const [code, setCode] = useState();
    const [players, setPlayers] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [listQuestion, setListQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(()=>{
        Api.Quiz.get(id).then((res) => {
            setQuizInfo(res.data);
        })
        Api.Question.getByQuiz(id).then((res)=>{
            if (res.data.length) {
                let _list = res.data.sort((a, b)=>{
                    return a.question_index - b.question_index;
                })
                setListQuestion(res.data);
            } 
        })

        let _pin = Math.round(Math.random() * 10000);
        setCode(_pin);

        socket = io("localhost:3001");
        socket.on("connect", () => {
            console.log('Connect socket server success.', socket.id); 

            socket.emit('host-join', {pin: _pin})

            socket.on('room-joined', (data) => {
                setPlayers([...players].push({...data, score: 0}));
            })

            socket.on('player-answer', (data) => {
                if (data.answer === listQuestion[currentQuestion].correctAnswer) {
                    let _index = players.findIndex(item => item.id === data.id);
                    let _players = [...players];
                    _players[_index].score += 10;
                    setPlayers(_players);
                }

            })
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                                    <div className='player col-3' key={index}>
                                        <div className="content">
                                            <FiUserCheck /> <span>{item.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='buttons'>
                        <Button variant='primary'>Start</Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HostStartScreen;