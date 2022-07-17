import React, { useContext } from "react";
import { Link  } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {Button, Dropdown} from 'react-bootstrap';

import { FaUserCircle } from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';

import logo from "../../logo.svg";

function Header(props) {
    
    const {accessToken, logout} = useContext(AppContext);


  return (
    <div className="header card">
        <div className="card-header d-flex justify-content-between px-5">
            <Link className="d-flex align-items-center" to="/">
                <img src={logo} style={{ height: "2.4rem" }} alt="" />
                <h3>Kahoot</h3>
            </Link>

            {accessToken ? 
            <Dropdown className="d-inline mx-2" autoClose="outside">
                <Dropdown.Toggle id="dropdown-autoclose-outside">
                    <FaUserCircle  style={{color: "#000", width: "2rem", height: "2rem"}}/>
                </Dropdown.Toggle>
        
                <Dropdown.Menu>
                    <Dropdown.Item className="my-2" onClick={logout}>
                        Log out
                        <FiLogOut style={{color: "#000", width: "2rem", height: "1.5rem", marginLeft: "1.5rem"}}/>
                    </Dropdown.Item>
                </Dropdown.Menu>
           </Dropdown> :
            <div>
                <Button className="m-2" variant="primary" href="/login" style={{color: '#fff'}}>Login</Button>
                <Button variant="warning" href="/register" style={{color: '#fff'}}>Register</Button>
            </div>
            }
        </div>
    </div>
  );
}

export default Header;
