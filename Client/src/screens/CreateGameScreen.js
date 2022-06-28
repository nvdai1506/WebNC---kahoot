import React, { useContext, useEffect, useState } from 'react';


import './CreateGameScreen.scss'
import QuizHeader from './create-game/QuizHeader';
import ListQuestion from './create-game/ListQuestion';
import CurrentQuestion from './create-game/CurrentQuestion';
import { AppContext } from '../context/AppContext';

import Api from '../service/api';
import { useParams } from 'react-router-dom';

const DEFAULT_Q = {type: 1, question: '', answer1: '', answer2: '', answer3: '', answer4: '', correctAnswer: null,};


function CreateGameScreen(props) {
    const {id} = useParams();

    const { checkLogin, createGameSession, setCreateGameSession } = useContext(AppContext);

    const [question, setQuestion] = useState({});
    const [listQuestion, setListQuestion] = useState([])

    
    useEffect (()=>{
        checkLogin();
    }, [checkLogin]);

    useEffect (()=>{
        let quizId = id;
        if (quizId) {
            Api.Quiz.get(quizId).then((res) => {
                setCreateGameSession({id: quizId, title: res.data.quiz_name, description: res.data.info});
            })
        } else if (createGameSession) {
            quizId = createGameSession.id;
        }
       if (quizId) {
        Api.Question.getByQuiz(quizId).then((res)=>{
            let _list = res.data.map((item, index)=>{
                return {
                    id: item.id,
                    type: item.answer3 === item.answer4 === '', 
                    question: item.question, 
                    answer1: item.answer1, 
                    answer2: item.answer2, 
                    answer3: item.answer3, 
                    answer4: item.answer4, 
                    correctAnswer: item.correctAnswer,
                    index: index,
                    isValid: true,
                }
            }).sort((a, b) => {
                return a.index - b.index
            });

            setListQuestion(_list);
            setQuestion(_list[0]);
        })
       } else {
        setListQuestion([{...DEFAULT_Q, index: 0}]);
        setQuestion({...DEFAULT_Q, index: 0});
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);



    function pushQuestion(question) {
        if (listQuestion[question.index] && listQuestion[question.index].id) { 
            return Api.Question.update(
                listQuestion[question.index].id, 
                {
                    quiz_id: createGameSession.id,
                    question_index: question.index,
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
                question_index: question.index,
                question: question.question, 
                answer1: question.answer1, 
                answer2: question.answer2, 
                answer3: question.answer3, 
                answer4: question.answer4, 
                correctAnswer: parseInt(question.correctAnswer)
            })
        }
    }

    function saveCurrentQuestion () {
        let _list = [...listQuestion]
        _list[question.index] = question;
        setListQuestion(_list)
    }

    async function complete () {
        for (let i = 0; i < listQuestion.length; i++) {
            await pushQuestion(listQuestion[i])
        }
    }


    
    return (
        <div id="create-game">
            <div className='row'>
                <div className='col-4'>
                    <ListQuestion
                        listQuestion={listQuestion}
                        setListQuestion={setListQuestion}
                        currentQuestion={question}
                        setCurrentQuestion={setQuestion}
                        saveCurrentQuestion={saveCurrentQuestion}
                    />
                </div>
                <div className='col-8'>
                    <QuizHeader 
                        complete={complete}
                    />
                    <CurrentQuestion
                        question={question}
                        setQuestion={setQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateGameScreen;