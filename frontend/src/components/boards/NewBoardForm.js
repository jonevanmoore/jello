import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBoardThunk } from '../../store/boards';

import './Boards.css';
import './BoardForm.css';

const NewBoardForm = ({ closeModalFunc }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [title, setTitle] = useState('');
    const [avatar_id, setAvatar_id] = useState('');
    // const [workspace_id, setWorkspace_id] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBoard = {
            title,
            user_id: user.id,
            avatar_id: 1,
            // workspace_id
        };

        const createdBoard = await dispatch(createBoardThunk(newBoard));
        closeModalFunc();
        // history.push(`/boards`);
        history.push(`/boards/${createdBoard.id}`);
    };

    const updateAvatarId = (e) => {
        setAvatar_id(e.target.value);
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
                <div>
                    <label>Avatar</label>
                    <input
                        type='radio'
                        name='avatar_id'
                        onChange={updateAvatarId}
                        value={avatar_id}
                    ></input>
                </div>
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
