import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { readOneBoard, updateBoard } from '../../store/boards';

import './Boards.css';
import './BoardForm.css';

const EditBoardForm = ({ closeModalFunc }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { board_id } = useParams();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards);
    const board = useSelector(state => state.boards[board_id])
    const [title, setTitle] = useState(board?.title);
    const [avatar_id, setAvatar_id] = useState(board?.avatar_id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const edits = {
            title,
            avatar_id
        };

        let newBoard = await dispatch(updateBoard(edits, board_id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });

        if (!errors.length && newBoard) {
            closeModalFunc();
        }
    };

    const updateAvatarId = (e) => {
        setAvatar_id(e.target.value);
    };

    const stopTheProp = e => e.stopPropagation();

    const customMsg = (e) => {
        if (e.target.value !== '^[\S].*[\S]$') {
            e.target.setCustomValidity('Title must have at least one character.');
        }
        else {
            setTitle(e.target.value);
        }
    };

    // const error = board.title === '^[\S].*[\S]$';

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
                        Edit Board
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
                        placeholder='title'
                        type='text'
                        pattern='^[\S].*[\S]$'
                        value={title}
                        onChange={(e) => customMsg()}
                        // helperText={error ? 'Title must have at least one character which is not a space.' : 'Perfect!'}
                        required
                    />
                </div>
                {/* <div>
                    <input
                        placeholder='workspace'
                        type='text'
                        // pattern="[^\s]+"
                        value={avatar_id}
                        onChange={(e) => setAvatar_id(e.target.value)}
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
                        Save Changes
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

export default EditBoardForm;
