import React, { useEffect, useState } from 'react';

import "./HostStartScreen.scss"
import {FaUser} from "react-icons/fa";
import {FiUserCheck} from "react-icons/fi";
import {VscCopy} from "react-icons/vsc";
import { Button, Form } from 'react-bootstrap';

import QRCode from 'qrcode'
const host = 'https://kahoot-play.web.app/play/'

let timerShow = null;

function HostStartScreen(props) {

    const { code, players, startQuestion, timePlay, setTimePlay } = props;

    const [url, setUrl] = useState('');
    const [qrcodeImg, setQrCodeImg] = useState('');

    const [show, setShow] = useState(false);

    useEffect(()=>{
        if (code) {
            let _url = host + code;
            setUrl(_url);

            QRCode.toDataURL(_url)
                .then(url => {
                    setQrCodeImg(url);
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [code])

    function handleNextQuestion() {
        startQuestion(0);
    }

    function copyUrl () {
        navigator.clipboard.writeText(url);
        clearTimeout(timerShow);
        setShow(true);
        timerShow = setTimeout(() => {
            setShow(false);
        }, 2000);
    }

    return (
        <div id="host-start">
            <div className='host-container'>
                <div className='h-head'>
                    <div className='code-pin row justify-content-between'>
                        <div className='col-6'>
                            <p>Code pin:</p>
                            <h1>{code}</h1>
                        </div>
                        <div className='col-5 qr-code'>
                            <img src={qrcodeImg} alt={url} />
                            <div className={'text-url' + (show ? ' copied' : '')}>
                                {url} <VscCopy onClick={copyUrl} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-main'>
                    <div className='count-user'>
                        <FaUser /> <span>{players.length}</span>
                    </div>
                    <div className='list-user'>
                        <Form.Group className="time-input"> 
                            <Form.Label>Seconds per question:</Form.Label>
                            <Form.Control 
                                type='number'
                                min={1} 
                                className="form-control"
                                onChange={()=>{}}
                                value={timePlay}
                                onChangeCapture={(e)=>setTimePlay(e.target.value)}
                            />
                        </Form.Group>
                        <div className='row'>
                            {players.map((item, index) => {
                                return (
                                    <div className='player col-3 align-items-center' key={index}>
                                        <div className="content row">
                                            <FiUserCheck className="col-3" /> 
                                            <span className="col-9">{item.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='buttons'>
                        {players.length ? <Button variant='primary' onClick={handleNextQuestion}>Start</Button> : ''}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HostStartScreen;