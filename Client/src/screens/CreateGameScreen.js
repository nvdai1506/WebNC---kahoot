import React, { useContext, useEffect, useState } from 'react';


import './CreateGameScreen.scss'
import QuizHeader from './create-game/QuizHeader';
import ListQuestion from './create-game/ListQuestion';
import CurrentQuestion from './create-game/CurrentQuestion';
import { AppContext } from '../context/AppContext';



function CreateGameScreen(props) {

    const { checkLogin } = useContext(AppContext);

    const [question, setQuestion] = useState({});
    const [listQuestion, setListQuestion] = useState([])

    
    useEffect (()=>{
        checkLogin();
    }, [checkLogin]);

    function saveQuestion() {
        
    }

    return (
        <div id="create-game">
            <div className='row'>
                <div className='col-3'>
                    <ListQuestion
                        currentQuestion={question}
                        setCurrentQuestion={setQuestion}
                        saveCQ={saveQuestion}
                    />
                </div>
                <div className='col-9'>
                    <QuizHeader />
                    <CurrentQuestion
                        listQuestion={listQuestion}
                        setListQuestion={setListQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateGameScreen;