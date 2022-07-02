import React from 'react';
import { Table } from 'react-bootstrap';

import {FaUserGraduate} from 'react-icons/fa';
import {GiTrophyCup} from 'react-icons/gi';

function HostOver(props) {
    const {players} = props;
    // const players = [
    //     {name: 'abc', score: 10},
    //     {name: 'xcs', score: 30},
    //     {name: 'abwerc', score: 44},
    //     {name: 'qwec ds', score: 1320},
    //     {name: 'sd wew ', score: 434},
    // ]

    return (
        <div id='host-over'>
            <div className='over-wrap'>
                <Table striped bordered hover>
                    <thead>
                        {/* <tr>
                            <span><GiTrophyCup /></span>
                            <span>Most active Players</span>
                        </tr> */}
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
                                    <tr>
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
            
        </div>
    );
}

export default HostOver;