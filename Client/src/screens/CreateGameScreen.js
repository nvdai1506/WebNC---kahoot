import React, { useEffect, useState } from 'react';


import './CreateGameScreen.scss'
import QuizHeader from './create-game/QuizHeader';
import ListQuestion from './create-game/ListQuestion';
import CurrentQuestion from './create-game/CurrentQuestion';



function CreateGameScreen(props) {

    const [question, setQuestion] = useState({});
    const [listQuestion, setListQuestion] = useState([])

    
    useEffect (()=>{

    }, []);

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