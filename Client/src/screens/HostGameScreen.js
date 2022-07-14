import React, { useEffect, useState } from 'react';
import HostStartScreen from './host-game/HostStartScreen';

import { Switch, Route, useHistory } from "react-router-dom";

import { io } from "socket.io-client";
import Api from '../service/api';
import { useParams } from 'react-router-dom';
import HostQuestion from './host-game/HostQuestion';
import CountDown from './host-game/CountDown';
import HostOver from './host-game/HostOver';

import api from "../service/api"

let socket;
let qList = [];
let qIndex = 0;
let qStatistic = {
        answer1: 0,
        answer2: 0,
        answer3: 0,
        answer4: 0,
        total: 0
    }



const TIME_PLAY = 20;

function HostGameScreen(props) {
    const {id} = useParams();
    const history = useHistory();

    const [code, setCode] = useState();
    const [players, setPlayers] = useState([]);
    const [quizInfo, setQuizInfo] = useState({});
    const [listQuestion, setListQuestion] = useState(qList);
    const [currentQuestion, setCurrentQuestion] = useState(qIndex);
    const [statistic, setStatistic] = useState(qStatistic);
    const [timePlay, setTimePlay] = useState(TIME_PLAY);

    useEffect(()=>{
       
    }, [id])

    useEffect(()=>{
        Api.Quiz.get(id).then((res) => {
            setQuizInfo(res.data);
        })

        

        Api.Question.getByQuiz(id).then((res)=>{
            if (res.data.length) {
                qList = res.data.sort((a, b)=>{
                    return a.question_index - b.question_index;
                }).map((item, index)=>{
                    return {
                        id: item.id,
                        type: item.answer3 && item.answer4  ? 1 : 2, 
                        question: item.question, 
                        answer1: item.answer1, 
                        answer2: item.answer2, 
                        answer3: item.answer3, 
                        answer4: item.answer4, 
                        correctAnswer: item.correctAnswer,
                        index: index,
                    }
                })

                setListQuestion(qList);
            } 
        })
        

        let _pin = (Math.round(Math.random() * 10000) + 10000).toString().slice(1);
        setCode(_pin);

        socket = io(api.socketDomain);
        socket.on("connect", () => {
            console.log('Connect socket server success.', socket.id); 

            let newPlayers = [...players];

            socket.emit('host-join', {pin: _pin})

            socket.on('room-joined', (data) => {
                console.log('room-joined', data);
                newPlayers.push({...data, score: 0});
                setPlayers([...newPlayers]);
            })

            socket.on('player-answer', (data) => {
                console.log('player-answer', data);
                qStatistic['total'] += 1;
                qStatistic[`answer${data.answer}`] += 1;
                setStatistic(qStatistic);

                if (data.answer === qList[qIndex].correctAnswer) {
                    let _index = newPlayers.findIndex(item => item.id === data.id);
                    if (_index >= 0) {
                        let _players = [...newPlayers];
                        _players[_index].score += 10;
                        setPlayers(_players);
                    }
                }

            })

          });


        return () => {
            socket.close();
        }   
    },[id])

    function startQuestion(index) {
        setCurrentQuestion(index);
        qIndex = index;

        socket.emit('next-question', {pin: code, type: listQuestion[index].type, index: index + 1, total: listQuestion.length, timeout: timePlay});
        // history.push(`/host/${id}/question`);
        history.push(`/host/${id}/countdown?redirect=/host/${id}/question`);

    }

    function overQuestion() {
        socket.emit('question-over', {pin: code, correctAnswer: listQuestion[currentQuestion].correctAnswer});
    }

    function nextQuestion() {
        if (currentQuestion < listQuestion.length - 1) {
            startQuestion(currentQuestion + 1);
            qStatistic = {
                answer1: 0,
                answer2: 0,
                answer3: 0,
                answer4: 0,
                total: 0
            }
            setStatistic(qStatistic);
        } else {
            socket.emit('game-over', {pin: code, players: players});
            history.push(`/host/${id}/gameover`);
        }
    }

    return (
        <div id='host-game'>
            <Switch>
                <Route path={`/host/${id}/countdown`}>
                    <CountDown />
                </Route>

                <Route path={`/host/${id}/gameover`}>
                    <HostOver 
                        players={players}
                    />
                </Route>

                <Route path={`/host/${id}/question`} > 
                    <HostQuestion 
                        question={listQuestion[currentQuestion] || {}} 
                        currentQuestion={currentQuestion}
                        startQuestion={startQuestion}
                        statistic={statistic}
                        timeout={timePlay}
                        overQuestion={overQuestion}
                        nextQuestion={nextQuestion}  
                        total={listQuestion.length}
                    />
                </Route>

                <Route path={`/host/${id}`}>
                    <HostStartScreen 
                        code={code}
                        players={players}
                        startQuestion={startQuestion}
                        timePlay={timePlay}
                        setTimePlay={setTimePlay}
                    />
                </Route>

            </Switch>
        </div>
    );
}

export default HostGameScreen;