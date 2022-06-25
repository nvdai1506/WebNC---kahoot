import React, { useContext, useEffect, useState } from 'react';


import './CreateGameScreen.scss'
import QuizHeader from './create-game/QuizHeader';
import ListQuestion from './create-game/ListQuestion';
import CurrentQuestion from './create-game/CurrentQuestion';
import { AppContext } from '../context/AppContext';

import Api from '../service/api';

function CreateGameScreen(props) {
    // const {editor} = props;
    const { createGameSession } = useContext(AppContext);

    const { checkLogin } = useContext(AppContext);

    const [question, setQuestion] = useState({});
    const [listQuestion, setListQuestion] = useState([])

    
    useEffect (()=>{
        checkLogin();
    }, [checkLogin]);

    function saveQuestion(q = question) {
        pushQuestion(q).then((res)=>{
            console.log(res);
            let _list = [...listQuestion];
            _list[q.index] = {...q, saved: true, id: res.data.question_id};
            setListQuestion(_list);
        })
    }


    function pushQuestion(question) {
        if (listQuestion[question.index] && listQuestion[question.index].id) { 
            return Api.Question.update(
                listQuestion[question.index].id, 
                {
                    quiz_id: createGameSession.id,
                    question: question.question, 
                    answer1: question.answer1, 
                    answer2: question.answer2, 
                    answer3: question.answer3, 
                    answer4: question.answer4, 
                    correctAnswer: parseInt(question.correctAnswer)
                })
        } else {
            return Api.Question.add({
                quiz_id: createGameSession.id,
                question: question.question, 
                answer1: question.answer1, 
                answer2: question.answer2, 
                answer3: question.answer3, 
                answer4: question.answer4, 
                correctAnswer: parseInt(question.correctAnswer)
            })
        }
    }

    return (
        <div id="create-game">
            <div className='row'>
                <div className='col-4'>
                    <ListQuestion
                        listSavedQuestion={listQuestion}
                        currentQuestion={question}
                        setCurrentQuestion={setQuestion}
                        pushQuestion={pushQuestion}
                    />
                </div>
                <div className='col-8'>
                    <QuizHeader />
                    <CurrentQuestion
                        listQuestion={listQuestion}
                        question={question}
                        saveQuestion={saveQuestion}
                        setQuestion={setQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateGameScreen;