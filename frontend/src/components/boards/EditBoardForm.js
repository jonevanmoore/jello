import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateBoard } from '../../store/boards';

import { Icons } from '../Icons/Icons';

import './Boards.css';
import './BoardForm.css';

const EditBoardForm = ({ closeModalFunc }) => {
    const dispatch = useDispatch();
    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id])
    const [title, setTitle] = useState(board?.title);
    const [avatarId, setAvatarId] = useState(board?.avatar_id);
    const [errors, setErrors] = useState([]);


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

        if (pattern.test(title)) {

            const edits = {
                title: title.trim(),
                avatar_id: avatarId
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
        }
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
                        Edit Board
                    </div>
                    <div className='title-avatar-checks boards-checks'>
                        <i className="fa-solid fa-circle-check" id={titleError}></i>
                    </div>
                    <div>
                        <input
                            className='input__board__title'
                            placeholder='Title'
                            type='text'
                            // pattern='^[\S].*[\S]$'
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
