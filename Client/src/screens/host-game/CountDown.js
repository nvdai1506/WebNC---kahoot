import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CountDown(props) {
    const history = useHistory();

    useEffect(() => {
      
        let redirect = history.location.search.split('=').slice(-1)[0];
        setTimeout(() => {
            history.push(redirect);
        }, 4000);

    }, [history])
    
    return (
        <div id='count-down'>
            <div className="cont">
                <div className="spinner"></div>
                <span className="number"></span>
            </div>
        </div>
    );
}

export default CountDown;