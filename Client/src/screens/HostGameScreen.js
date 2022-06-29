import React from 'react';
import ListQuiz from '../components/list-quiz/ListQuiz';

function HostGameScreen(props) {
    return (
        <div id='host-game container'>
            <ListQuiz isHost={true}></ListQuiz>
        </div>
    );
}

export default HostGameScreen;