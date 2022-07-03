import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

import {FaUserGraduate} from 'react-icons/fa';
import {GiTrophyCup} from 'react-icons/gi';
import { useHistory } from 'react-router-dom';


function HostOver(props) {
    const history = useHistory();
    const {players, playerId} = props;

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [setLoading])

    function exit() {
        history.replace('/');
    }

    return (
        <div id='host-over'>
            {loading ? 
                <div className='loading'>
                <div className='finish'></div>
            </div> :
            <div className='result'>
                <div className='title'>
                    <GiTrophyCup /> Game Over 
                </div>
                <div className='over-wrap mt-5'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ranker</th>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        {
                            players.sort((a, b)=>{
                                return b.score - a.score;
                            }).map((item, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr className={playerId === item.id ? 'active-player' : ''}>
                                            <td >{index + 1}</td>
                                            <td className='user'><FaUserGraduate /> {item.name}</td>
                                            <td>{item.score}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    
                    </Table>
                </div>

                <div className="buttons d-flex justify-content-center mt-5">
                    <Button variant='success' style={{width: '150px'}} onClick={exit}>Exit</Button>
                </div>
            </div>}
        </div>
    );
}

export default HostOver;