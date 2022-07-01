function HostQuestion (props) {

    const {question, setQuestion} = props;

    return (
        <div className="host-question">
            <div className='content-question container'>
                <Form >
                    <div className='question-title'>
                        <Form.Group>
                            <Form.Label className='text-area'>{question.question}</Form.Label>
                        </Form.Group>
                    </div>
                    <div className='question-answers'>
                        <div className='list-answer row'>
                            <div className='item-answer item-1 col-5'>
                                <InputGroup className="mb-3">
                                    <div className='icon-1 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
                                        </svg>
                                    </div>
                                    <Form.Control
                                        name="answer1"
                                        disabled
                                        id='input-answer-1'
                                        placeholder='Answer 1'
                                        onChange={()=>{}}
                                        value={question.answer1}
                                    />
                                </InputGroup>
                            </div>
                            <div className='item-answer item-2 col-5'>
                                <InputGroup className="mb-3">
                                    <div className='icon-2 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                        </svg>
                                    </div>
                                    <Form.Control
                                        name="answer2"
                                        disabled
                                        id='input-answer-2'
                                        placeholder='Answer 2'
                                        onChange={()=>{}}
                                        value={question.answer2}
                                        onChangeCapture={(e)=>setCQAnswer(2, e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                            {question.type === 1 && 
                            <div className='item-answer item-3 col-5'>
                                <InputGroup className="mb-3">
                                    <div className='icon-3 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8"/>
                                        </svg>
                                    </div>
                                    <Form.Control
                                        name="answer3"
                                        required
                                        id='input-answer-3'
                                        placeholder='Answer 3'
                                        onChange={()=>{}}
                                        value={question.answer3}
                                        onChangeCapture={(e)=>setCQAnswer(3, e.target.value)}
                                    />
                                </InputGroup>
                            </div>}
                            {question.type === 1 && 
                            <div className='item-answer item-4 col-5'>
                                <InputGroup className="mb-3">
                                    <div className='icon-4 icon col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                                        </svg>
                                    </div>
                                    <Form.Control
                                        name="answer4"
                                        required
                                        id='input-answer-4'
                                        placeholder='Answer 4'
                                        onChange={()=>{}}
                                        value={question.answer4}
                                        onChangeCapture={(e)=>setCQAnswer(4 , e.target.value)}
                                    />
                                </InputGroup>
                            </div>}
                        </div>
                        <div className='answer'>
                            <div className='form-answer'>
                                <Form.Label className='title'>Answer:</Form.Label>
                                <Form.Select name="correctAnswer" required size="lg">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    {question.type === 1 && <option value={3}>3</option>}
                                    {question.type === 1 && <option value={4}>4</option>}
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default HostQuestion;