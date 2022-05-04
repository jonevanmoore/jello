import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm'
import './LoginForm.css'

const LoginForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [signupDisplay, setSignupDisplay] = useState('not-displayed')
  const [loginDisplay, setLoginDisplay] = useState('displayed')

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

/*  if (user) {
    return <Redirect to='/' />;
  }*/

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

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`login-body ${loginDisplay}`} onClick={stopTheProp}>
      <form onSubmit={onLogin} className='login-form'>
        <span id="bulk" className='login-text'>Log in to Jello <span id="skinny">or</span> <span className='signup-click' onClick={toggleLoginSignupFunc}>Sign up</span></span>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input className='login-input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type='submit' className='login-form-btn submit-btn jello-wiggle button__shine__long__green green-btn'>Login</button>
      </form>
        <button className='login-form-btn jello-wiggle jello__container__ani cancel-btn' 
          id="logout-button" 
          style={{width: '75%', marginBottom: '36px'}} /* <<< hack alert */
          onClick={closeModalFunc}>Cancel</button>
    </div>
  );
};

export default LoginForm;
