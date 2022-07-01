import React, { useEffect } from 'react';
import ListQuiz from '../components/list-quiz/ListQuiz';
import HostStartScreen from './host-game/HostStartScreen';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function HostGameScreen(props) {
    useEffect(()=>{
        console.log('Mounteddd');
    }, [])
    return (
        <div id='host-game'>
            <Switch>
                <Route path="/host/:id/start" component={HostStartScreen}>
                </Route>
                <Route exact path="/host" > 
                    <div className='container'>
                        <ListQuiz isHost={true}/>
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default HostGameScreen;