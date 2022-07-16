import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayContext from '../../context/PlayContext';

function AutoPassCode(props) {
    const {id} = useParams();
    const { onValidation } = useContext(PlayContext);

    useEffect(()=>{
        if (id) {
            onValidation({ value: id, isValid: true })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            
        </div>
    );
}

export default AutoPassCode;