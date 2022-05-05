import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBoardThunk } from '../../store/boards';
import { Icons } from '../Icons/Icons';

import './Boards.css';
import './BoardForm.css';

const NewBoardForm = ({ closeModalFunc }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState('');
    const [avatarId, setAvatarId] = useState('');
    // const [workspace_id, setWorkspace_id] = useState('');

    // CUSTOME ERRORS
    const [titleError, setTitleError] = useState('invalid')
    const [avatarError, setAvatarError] = useState('invalid');
    const [submitError, setSubmitError] = useState('disabled');


    useEffect(() => {
        //TITLE
        if (title.length > 0 && title.length < 101) {
            setTitleError('valid-blue')
        } else {
            setTitleError('invalid')
        }

        //AVATAR
        if (avatarId > 0) {
            setAvatarError('valid-blue')
        } else {
            setAvatarId('invalid')
        }

        //SUBMIT BUTTON
        if (title.length > 0 && title.length < 31 &&
            avatarId > 0) {
            setSubmitError('able')
        } else {
            setSubmitError('disabled')
        }
    }, [title, avatarId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const pattern = /\S+/;

        if (!pattern.test(title)) return;

        const newBoard = {
            title: title.trim(),
            user_id: user.id,
            avatar_id: avatarId,
            // workspace_id
        };

        const createdBoard = await dispatch(createBoardThunk(newBoard));
        closeModalFunc();
        history.push(`/boards/${createdBoard.id}`);
    };

    const stopTheProp = e => e.stopPropagation();

    return (
        <div className='new__board__form__container'>
            <form
                onSubmit={handleSubmit}
                onClick={stopTheProp}
                onMouseDown={stopTheProp}
                className='new_edit__board__form'
            >
                <div className='title__n__title'>
                    <div className='title__new__board'>
                        New Board
                    </div>
                    <div className='title-avatar-checks boards-checks'>
                        <i className="fa-solid fa-circle-check" id={titleError}></i>
                    </div>
                    <div>
                        <input

                            className='input__board__title'
                            placeholder='Title'
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <Icons
                    avatarId={avatarId}
                    setAvatarId={setAvatarId}
                    avatarError={avatarError}
                    setAvatarError={setAvatarError}
                />

                {/* <div>
                    <input
                        placeholder='workspace'
                        type='text'
                        value={workspace_id}
                        onChange={(e) => setWorkspace_id(e.target.value)}
                        required
                    />
                </div> */}
                <div className='buttons__board__form'>
                    <button
                        id='create-button'
                        className='
                        jello__wiggle
                        button__shine__long__blue
                        '
                        type='submit'>
                        Create Board
                    </button>
                    <button
                        id='cancel-button'
                        className='
                    jello__wiggle
                    logout__button
                    red__button
                    button__shine__long__red
                    '
                        onClick={closeModalFunc}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
};

export default NewBoardForm;
