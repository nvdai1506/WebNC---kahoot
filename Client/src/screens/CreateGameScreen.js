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

    useEffect (()=>{
       if (createGameSession) {
        Api.Question.getByQuiz(createGameSession.id).then((res)=>{
            let _list = res.data.map((item)=>{
                return {
                    id: item.id,
                    type: item.answer3 === item.answer4 === '', 
                    question: item.question, 
                    answer1: item.answer1, 
                    answer2: item.answer2, 
                    answer3: item.answer3, 
                    answer4: item.answer4, 
                    correctAnswer: item.correctAnswer,
                    index: item.question_index,
                    saved: true,
                }
            }).sort((a, b) => {
                return a.index - b.index
            });

            setListQuestion(_list);
            setQuestion(_list[0]);
        })
       }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function saveQuestion(q = question) {
        pushQuestion(q).then((res)=>{
            let _list = [...listQuestion];
            _list[q.index] = {
                ...q, 
                saved: true, 
                id: res.data.question_id, 
                index: res.data.question_index
            };
            setListQuestion(_list);
        })
    }


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

    function saveListQuestion(arr) {
        let _list = [...listQuestion];
        for (let index = 0; index < arr.length; index++) {
            _list = arr[index];
        }

        setListQuestion(_list);
    }

    function removeQuestion (index) {

        Api.Question.delete(listQuestion[index].id).then((res)=>{
            console.log(res.status);
            if(res.status === 200) {

                let _list = listQuestion.filter((_item, _index) => _index !== index);

                console.log(_list);

                let arrSuccess = [];
                for (let i = 0; i < _list.length; i++) {
                    if (_list[i].saved && _list[i].index !== i) {
                        pushQuestion({..._list[i], index: i}).then((res)=>{
                            arrSuccess.push({..._list[i], index: i});
                            if(i === _list.length - 1) {
                                console.log(arrSuccess);
                                saveListQuestion(arrSuccess);
                            }
                        })
                    }
                }
    
            }
        })

        

    
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
                        saveListQuestion={saveListQuestion}
                        removeQuestion={removeQuestion}
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