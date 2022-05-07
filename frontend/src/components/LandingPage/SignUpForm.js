import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import { Icons } from '../Icons/Icons';


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

  // CUSTOME ERROR HANDLING
  const [firstNameError, setFirstNameError] = useState('invalid')
  const [lastNameError, setLastNameError] = useState('invalid')
  const [emailError, setEmailError] = useState('invalid')
  const [avatarError, setAvatarError] = useState('invalid')
  const [passError, setPassError] = useState('invalid')
  const [confirmPassError, setConfirmPassError] = useState('invalid')
  const [submitError, setSubmitError] = useState('disabled')

  useEffect(() => {
    //FIRST NAME
    if (firstName.length > 0 && firstName.length < 101) {
      setFirstNameError('valid')
    } else {
      setFirstNameError('invalid')
    }

    //LAST NAME
    if (lastName.length > 0 && lastName.length < 101) {
      setLastNameError('valid')
    } else {
      setLastNameError('invalid')
    }

    //AVATAR
    if (avatarId > 0) {
      setAvatarError('valid')
    } else {
      setAvatarId('invalid')
    }

    //EMAIL
    if (email.length > 4 && email.length < 256) {
      setEmailError('valid')
    } else {
      setEmailError('invalid')
    }

    //PASS
    if (password.length > 2 && password.length < 256) {
      setPassError('valid')
    } else {
      setPassError('invalid')
    }

    //CONFIRM PASS
    if (repeatPassword === password && repeatPassword.length > 0) {
      setConfirmPassError('valid')
    } else {
      setConfirmPassError('invalid')
    }

    //SUBMIT BUTTON
    if (firstName.length > 0 && firstName.length < 101 &&
      lastName.length > 0 && lastName.length < 101 &&
      avatarId > 0 &&
      email.length > 4 && email.length < 256 &&
      password.length > 2 && password.length < 256 &&
      repeatPassword === password && repeatPassword.length > 0) {
      setSubmitError('able')
    } else {
      setSubmitError('disabled')
    }

  }, [firstName, lastName, avatarId, email, password, repeatPassword])

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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const stopTheProp = e => e.stopPropagation();

  return (
    <div className={`signup-body`} onClick={stopTheProp} onMouseDown={stopTheProp}>
      <form onSubmit={onSignUp} className='signup-form'>
        <span id="bulk" className='login-text'>Sign up for Jello <span id="skinny">or</span> <span className='login-click' onClick={toggleLoginSignupFunc}>Log in</span></span>

        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='first-last-checks sign-up-checks'>
          <i className="fa-solid fa-circle-check first-name-check" id={firstNameError}></i>
          <i className="fa-solid fa-circle-check last-name-check" id={lastNameError}></i>
        </div>
        <div className='first-last-div'>
          <input className='signup-input'
            placeholder='First Name'
            type='text'
            name='firstName'
            onChange={updateFirstName}
            value={firstName}
          ></input>
          <input className='signup-input'
            placeholder='Last Name'
            type='text'
            name='lastName'
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div className='sign-up-checks email-check-div'>
          <i className="fa-solid fa-circle-check email-check" id={emailError}></i>
        </div>
        <input className='signup-input'
          placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>

        {/* <div id="avatar-label">Avatar</div> */}

        <Icons avatarId={avatarId} setAvatarId={setAvatarId} avatarError={avatarError} setAvatarError={setAvatarError} />

        <div className='sign-up-checks'>
          <i className="fa-solid fa-circle-check pass-check" id={passError}></i>
        </div>
        <input className='signup-input'
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
        <div className='sign-up-checks'>
          <i className="fa-solid fa-circle-check confirm-pass-check" id={confirmPassError}></i>
        </div>
        <input className='signup-input'
          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <button
          type='submit'
          className='login-form-btn submit-btn jello-wiggle button__shine__long__green green-btn'
          id={submitError}
          disabled={submitError !== 'able'}>Sign Up</button>
      </form>
      <button className='login-form-btn jello-wiggle jello__container__ani cancel-btn'
        style={{ width: '91%' }} /* <<< hack alert */
        onClick={closeModalFunc}
        id="cancel-button">Cancel</button>
    </div>
  );
};

export default SignUpForm;
