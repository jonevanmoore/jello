import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';

import './LandingPage.css'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LandingPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    const [loginDisplay, setLoginDisplay] = useState('not-displayed')
    const [signupDisplay, setSignupDisplay] = useState('not-displayed')

    const changeLoginDisplay = () => {
        if (loginDisplay === 'not-displayed') {
            setLoginDisplay('displayed')
        } else if (loginDisplay === 'displayed') {
            setLoginDisplay('not-displayed')
        } else if (signupDisplay === 'displayed') {
            setLoginDisplay('not-displayed')
        }
    }
    const changeSignupDisplay = () => {
        if (signupDisplay === 'not-displayed') {
            setSignupDisplay('displayed')
        } else if (signupDisplay === 'displayed') {
            setSignupDisplay('not-displayed')
        } else if (loginDisplay === 'displayed') {
            setSignupDisplay('not-displayed')
        }
    }

    const toggleLoginSignupFunc = () => {
        changeLoginDisplay();
        changeSignupDisplay();
    }

    const demoLogin = async () => {
        await dispatch(login('demo@aa.io', 'password'));
    }

    return (
        <div className="home-body-div">
            <div className="top-bottom-div">

                <div className="home-top-div">
                    <div className="logo-div">
                        <img src='/logo-dark.png' className='dark-logo' />
                    </div>
                    <div className="user-buttons-div">
                        <button className='demo-btn jello-wiggle button__shine__short' onClick={demoLogin}>Demo User</button>
                        <button className='login-btn green-btn jello-wiggle button__shine__long__green' onClick={changeLoginDisplay}>Log In</button>
                        <button className='signup-btn green-btn jello-wiggle button__shine__long__green' onClick={changeSignupDisplay}>Sign Up</button>
                        <div className={`modal-background-home-page ${loginDisplay}`} onMouseDown={changeLoginDisplay}>
                            <LoginForm closeModalFunc={changeLoginDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
                        </div>
                        <div className={`modal-background-home-page ${signupDisplay}`} onMouseDown={changeSignupDisplay}>
                            <SignUpForm closeModalFunc={changeSignupDisplay} toggleLoginSignupFunc={toggleLoginSignupFunc} />
                        </div>
                    </div>
                </div>
                <div className='home-bottom-div'>
                    <p><span id="bulk">Jell-O</span> is a variety of gelatin desserts, puddings, and no-bake cream pies</p>
                    <p><span id="bulk">Trello</span> is a popular, simple-to-use collaboration tool that enables you to organize projects and everything related to them into boards</p>
                    <p id="get-both-text">When you mix both... you get <span id="bulk">Jello</span>, a cuter Trello</p>
                </div>
            </div>

            <div className="coder-profiles">
                <div className="coder">
                    <a target="_blank" href="https://github.com/danguai">
                        <img src="/jello9.png" className="coder-img jello-wiggle"></img>
                    </a>
                    <span>Daniel Blanco</span>
                </div>
                <div className="coder">
                    <a target="_blank" href="https://github.com/jonevanmoore">
                        <img src="/jello6.png" className="coder-img jello-wiggle"></img>
                    </a>
                    <span>Jon Moore</span>
                </div>

                <div className="coder">
                    <a target="_blank" href="https://github.com/MasonKogami">
                        <img src="/jello3.png" className="coder-img jello-wiggle"></img>
                    </a>
                    <span>Mason Kogami</span>
                </div>

                <div className="coder">
                    <a target="_blank" href="https://github.com/Nick-Yawn">
                        <img src="/jello5.png" className="coder-img jello-wiggle"></img>
                    </a>
                    <span>Nicholas Yuan</span>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;
