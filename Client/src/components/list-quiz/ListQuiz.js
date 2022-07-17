import React, { useContext, useEffect, useState } from 'react';
import {Button, Card, Dropdown} from 'react-bootstrap';
import { CgMoreO } from "react-icons/cg";
import "./ListQuiz.scss"
import Api from '../../service/api';

import coverKahoot  from "../../static/image/placeholder-cover-kahoot.png"
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';

const THEME = [ 'Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',]

function ListQuiz(props) {
    const history = useHistory();

    const {userId} = useContext(AppContext);

    const {isHost} = props;

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(()=>{
        if (userId) {
            Api.Quiz.getByUser(userId).then((res)=>{
                if(res.status === 200) {
                    setListQuiz(res.data);
                }
            })
        } else {
            setListQuiz([]);
        }
        
    }, [userId])


    return (
        <div id="list-quiz">
            {!isHost && 
            <div className='list-title mt-5'>
                <h4>Games</h4>
                
            </div>}
            <div className='list-content row '>
                {
                    listQuiz.map((item, index) => {
                        let _theme = THEME[index % THEME.length].toLowerCase();
                        return (
                            <Card border={_theme} className='quiz-item mx-md-5 my-3' key={index}>
                                <Card.Body className='row'>
                                    <div className='left-area col-3'>
                                        <img className='cover-img' src={coverKahoot} alt=''/>
                                        <div className='tag-img'>Quiz #{index + 1}</div>
                                    </div>
                                    <div className='col-9'>
                                        <div className='header-title'>
                                            <Card.Title className='col-10'>{item.quiz_name}</Card.Title>
                                            {isHost ? 
                                            <Button className='view-more mt-3' variant='warning' onClick={()=>{history.push(`/host/${item.id}`)}} style={{width: '70px'}}>Host</Button> :
                                            <Dropdown className='view-more' drop='start'>
                                                <Dropdown.Toggle variant='' id="dropdown-basic">
                                                   <CgMoreO style={{width: '20px', height: '20px', color: '#000'}}/>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href={'/edit/' + item.id}>Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={()=>{history.push(`/host/${item.id}`)}}>Host</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>}
                                        </div>
                                        <Card.Text>
                                            {item.info}
                                        </Card.Text>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
            
        </div>
    );
}

export default ListQuiz;