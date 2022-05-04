import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({ closeModalFunc, toggleLoginSignupFunc }) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, avatarId, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateAvatarId = (e) => {
    setAvatarId(e.target.value)
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

/*  if (user) {
    return <Redirect to='/' />;
  }*/
 
  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`signup-body`}onClick={stopTheProp}>
      <form onSubmit={onSignUp} className='signup-form'>
        <span id="bulk" className='login-text'>Sign up for Jello <span id="skinny">or</span> <span className='signup-click' onClick={toggleLoginSignupFunc}>Log in</span></span>

        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='first-last-div'>

          <div>
            <input className='signup-input'
              placeholder='First Name'
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div>
            <input className='signup-input'
              placeholder='Last Name'
              type='text'
              name='lastName'
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
        </div>
        <div>
          <input className='signup-input'
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Avatar</label>
          <input
            type='radio'
            name='avatarId'
            onChange={updateAvatarId}
            value={avatarId}
          ></input>
        </div>
        <div>
          <input className='signup-input'
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input className='signup-input'
            placeholder='Confirm Password'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit' className='login-form-btn submit-btn jello-wiggle button__shine__long__green green-btn'>Sign Up</button>
      </form>
        <button className='login-form-btn jello-wiggle jello__container__ani cancel-btn' 
        style={{width: '75%', marginBottom: '36px'}} /* <<< hack alert */
        onClick={closeModalFunc}
        id="logout-button">Cancel</button>
    </div>
  );
};

export default SignUpForm;
