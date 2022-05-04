import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBoardThunk } from '../../store/boards';

import './Boards.css';

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
            avatar_id,
            // workspace_id
        };

        const createdBoard = await dispatch(createBoardThunk(newBoard));
        closeModalFunc();
        history.push(`/boards/${createdBoard.id}`);
    };

    const stopTheProp = e => e.stopPropagation();

    return (
        <>
            <form onSubmit={handleSubmit} onClick={stopTheProp} onMouseDown={stopTheProp}>
                <div>
                    <input
                        placeholder='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder='avatar'
                        type='text'
                        value={avatar_id}
                        onChange={(e) => setAvatar_id(e.target.value)}
                        required
                    />
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
                <button type='submit'>
                    Create Board
                </button>
                <button onClick={closeModalFunc}>
                    Cancel
                </button>
            </form>
        </>
    )
};

export default NewBoardForm;
