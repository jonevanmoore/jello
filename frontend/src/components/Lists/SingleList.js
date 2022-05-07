import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList, deleteList } from '../../store/boards';
import './SingleList.css';

export const SingleList = ({ list }) => {
    const dispatch = useDispatch();

    const [newTitle, setNewTitle] = useState(list.title);
    const [titleDisplay, setTitleDisplay] = useState('displayed');
    const [titleInputDisplay, setTitleInputDisplay] = useState('not-displayed');

    const [titleInputValid, setTitleInputValid] = useState('valid-blue');
    const [titleSubmitBtn, setTitleSubmitBtn] = useState('able');

    const updateTitle = async () => {
        let updated = {
            id: list.id,
            title: newTitle,
            order: list.order,
            user_id: list.user_id,
            board_id: list.board_id
        }
        await dispatch(updateList(updated));
        setTitleDisplay('displayed');
        setTitleInputDisplay('not-displayed');
    }

    const titleAndInputDisplay = () => {
        if (titleDisplay === 'displayed') {
            setTitleDisplay('not-displayed');
            setTitleInputDisplay('displayed');
        } else {
            setTitleDisplay('displayed');
            setTitleInputDisplay('not-displayed');
        }

        if (titleInputDisplay === 'not-displayed') {
            setTitleInputDisplay('displayed');
            setTitleDisplay('not-displayed');
        } else {
            setTitleInputDisplay('not-displayed');
            setTitleDisplay('displayed');
        }
        setNewTitle(list.title)
    }

    const removeList = async (list) => {
        await dispatch(deleteList(list));
    };

    useEffect(() => {
        if (newTitle.length < 30 && newTitle.length > 0) {
            setTitleInputValid('valid-blue');
            setTitleSubmitBtn('able');
        } else {
            setTitleInputValid('invalid');
            setTitleSubmitBtn('disabled-blue');
        }
    }, [newTitle]);

    return (

        <div className='list__title__close'>

            <div className='title-and-input-display'>
                <div className='list-title-div'>
                    <label className={`list__title ${titleDisplay}`}>
                        {list.title}
                    </label>
                    {/* <i className={`fa-solid fa-pen-to-square ${titleDisplay}`} onClick={titleAndInputDisplay}></i> */}
                </div>
                <div className={`edit-title-div ${titleInputDisplay} grow-down`}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="title-input"
                    ></input>
                    <div className={`check-div`}>
                        <i className="fa-solid fa-circle-check" id={titleInputValid}></i>
                    </div>
                    <div className='update-title-btns'>
                        <button
                            onClick={updateTitle}
                            className={`jello-wiggle button__shine__short light__green__button ${titleSubmitBtn}`}
                            disabled={titleSubmitBtn === 'disabled-blue'}
                        >Update</button>
                        <button onClick={titleAndInputDisplay} className='jello-wiggle cancel-title-btn button__shine__short'>Cancel</button>
                    </div>
                </div>
            </div>
            <div className='list-edit-del-div'>
                <div className='edit__bts__in__lsts'>
                    <i className={`fa-solid fa-pen-to-square jello-wiggle ${titleDisplay}`} onClick={titleAndInputDisplay}></i>
                </div>
                <div className='del__bts__in__lsts'>
                    <button
                        className={`${titleDisplay} delete-list`}
                        onClick={() => removeList(list)}
                    >
                        <div className={`close__text`}>&#215;</div>
                    </button>
                </div>
            </div>
        </div>

    )
}
