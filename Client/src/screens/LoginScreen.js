import React, { useContext, useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import poster from '../static/image/welcome-poster.jpg';
import { MdOutlineLogin } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';

import Api from '../service/api'
import { AppContext } from '../context/AppContext';


function LoginScreen(props) {
    const history = useHistory();

    const {saveAccessToken} = useContext(AppContext);

    const [validated, setValidated] = useState(false);
    const [loginFail, setLoginFail] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            let data = Object.fromEntries(new FormData(form).entries());

            Api.User.login({
                username: data.username,
                password: data.password,
            }).then((res)=>{
                console.log('Login success.');
                saveAccessToken(res.data);
                history.goBack();
            }).catch(()=>{
                setLoginFail(true);
                setValidated(false);
            })
        }

    };

    return (
        <div className='login-screen'>
            <div className="vh-100" style={{backgroundColor: "#eee"}}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">
                                        <img src={poster} className="img-fluid" alt="Sample" />
                                    </div>
                                    
                                    <div className="col-md-10 col-lg-6 col-xl-5">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                                        <Form className="mx-1 mx-md-4" noValidate validated={validated} onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <MdOutlineLogin style={{color: '#000', width: '3rem', height: '1.5rem'}} />
                                                <div className="form-outline flex-fill mb-0">
                                                <Form.Control required isInvalid={loginFail} type="text" name="username" className="form-control" placeholder='Username' />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <AiFillLock style={{color: '#000', width: '3rem', height: '1.5rem'}} />
                                                <div className="form-outline flex-fill mb-0">
                                                <Form.Control required isInvalid={loginFail} type="password" name="password" className="form-control" placeholder='Password'/>
                                                </div>
                                            </div>


                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <Button type="submit">Login</Button>
                                            </div>

                                        </Form>

                                        <div className='register-text text-end'>
                                            <Link to="/register" replace style={{color: '#ff0000'}}>Register now?</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;