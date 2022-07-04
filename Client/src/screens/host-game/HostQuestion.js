import { useEffect, useState } from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

let timerCountdown = null;

function HostQuestion (props) {

    const {question, currentQuestion, statistic, timeout, overQuestion, nextQuestion, total} = props;

    const [count, setCount] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(()=>{
        let _count = timeout;
        setCorrectAnswer('');

        timerCountdown = setInterval(() => {
            if (_count ===1) {
                setCorrectAnswer(question.correctAnswer || 1);
            }

            if (_count <= 0) {
                
                overQuestion();

                clearInterval(timerCountdown);
            } else {
                _count--;
                setCount(_count);
            }
        }, 1000);

        return () => {
            clearInterval(timerCountdown);
        }
    }, [currentQuestion])

    function handleNextQuestion() {
        if (count > 0) {
            clearInterval(timerCountdown);
            setCorrectAnswer(question.correctAnswer || 1);
            setCount(0);
            overQuestion();
            return;
        }

        clearInterval(timerCountdown);
        nextQuestion(1);
    }

    return (
        <div id="host-question" className="row">
            <div className="col-left col-1">
                <div className="question-index">
                    <div className="index">{currentQuestion + 1} / {total}</div>
                </div>
                <div className="timer">
                    <div className="timeout">
                        {count}
                    </div>
                </div>
            </div>
            <div className='content-question col-10'>
                <Form className="mt-3" >
                    <div className='question-title'>
                        <Form.Group className="text-center">
                            <Form.Label className='text-area'>{question.question}</Form.Label>
                        </Form.Group>
                    </div>
                    <div className="statistic">
                        <div className="statistic-wrap">
                            {count !== 0 ? 
                            <div className="google-loader">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div> :
                            <div className="result-answer row gap-3">
                                <div className="item col-2">
                                    <h6>{statistic.answer1}</h6>
                                    <div className="item-wrap">
                                        <div className="item-col item-col-1" style={{height: `${statistic.answer1 / statistic.total * 100}%`}}></div>
                                    </div>
                                    <h5>A</h5>
                                </div>
                                <div className="item col-2">
                                    <h6>{statistic.answer2}</h6>
                                    <div className="item-wrap">
                                        <div className="item-col item-col-2" style={{height: `${statistic.answer2 / statistic.total * 100}%`}}></div>
                                    </div>
                                    <h5>B</h5>
                                </div>
                                {question.type === 1 &&
                                <div className="item col-2">
                                    <h6>{statistic.answer3}</h6>
                                    <div className="item-wrap">
                                        <div className="item-col item-col-3" style={{height: `${statistic.answer3 / statistic.total * 100}%`}}></div>
                                    </div>
                                    <h5>C</h5>
                                </div>}
                                {question.type === 1 &&
                                <div className="item col-2">
                                    <h6>{statistic.answer4}</h6>
                                    <div className="item-wrap">
                                        <div className="item-col item-col-4" style={{height: `${statistic.answer4 / statistic.total * 100}%`}}></div>
                                    </div>
                                    <h5>D</h5>
                                </div>}
                                
                            </div>}
                        </div>

                    </div>
                    <div className='question-answers'>
                        <div className='list-answer row'>
                            <div className={`item-answer item-1 col-5 ${correctAnswer === 1 ? 'active' : ''}`}>
                                <InputGroup className="align-items-center">
                                    <div className='icon-1 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
                                        </svg>
                                    </div>
                                    <Form.Label className="col-10">
                                        {question.answer1}
                                    </Form.Label> 
                                </InputGroup>
                            </div>
                            <div className={`item-answer item-2 col-5 ${correctAnswer === 2 ? 'active' : ''}`}>
                                <InputGroup className="align-items-center">
                                    <div className='icon-2 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                        </svg>
                                    </div>
                                    <Form.Label className="col-10">
                                        {question.answer2}
                                    </Form.Label>  
                                </InputGroup>
                            </div>
                            
                            {question.type === 1 &&
                            <div className={`item-answer item-3 col-5 ${correctAnswer === 3 ? 'active' : ''}`}>
                                <InputGroup className="align-items-center">
                                    <div className='icon-3 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>
                                    </div>
                                    <Form.Label className="col-10">
                                        {question.answer3}
                                    </Form.Label>  
                                </InputGroup>
                            </div>}
              
                            {question.type === 1 &&
                            <div className={`item-answer item-4 col-5 ${correctAnswer === 4 ? 'active' : ''}`}>
                                <InputGroup className="align-items-center">
                                    <div className='icon-4 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                        </svg>
                                    </div>
                                    <Form.Label className="col-10">
                                        {question.answer4}
                                    </Form.Label> 
                                </InputGroup>
                            </div>}
                        </div>
                    </div>
                </Form>
            </div>
            <div className="col-right col-1">
                <Button className="mt-5" onClick={handleNextQuestion}> {count >0 ? 'Over' : 'Next'} </Button>
            </div>
        </div>
    )
}

export default HostQuestion;