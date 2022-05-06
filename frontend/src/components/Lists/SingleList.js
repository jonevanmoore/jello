import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList, deleteList } from '../../store/boards';
import { useParams } from 'react-router-dom';

export const SingleList = ({ list }) => {
    const dispatch = useDispatch()

    const [newTitle, setNewTitle] = useState(list.title)
    const [titleDisplay, setTitleDisplay] = useState('displayed')
    const [titleInputDisplay, setTitleInputDisplay] = useState('not-displayed')



    const updateTitle = async () => {
        let updated = {
            id: list.id,
            title: newTitle,
            order: list.order,
            user_id: list.user_id,
            board_id: list.board_id
        }
        await dispatch(updateList(updated))
        setTitleDisplay('displayed')
        setTitleInputDisplay('not-displayed')
    }

    const titleAndInputDisplay = () => {
        if (titleDisplay === 'displayed') {
            setTitleDisplay('not-displayed')
            setTitleInputDisplay('displayed')
        } else {
            setTitleDisplay('displayed')
            setTitleInputDisplay('not-displayed')
        }

        if (titleInputDisplay === 'not-displayed') {
            setTitleInputDisplay('displayed')
            setTitleDisplay('not-displayed')
        } else {
            setTitleInputDisplay('not-displayed')
            setTitleDisplay('displayed')
        }
    }

    const removeList = async (list) => {
        await dispatch(deleteList(list));
        // TODO: fix this
    };

    return (

        <div className='list__title__close'>

            <div className='title-and-input-display'>
                <label className={`list__title ${titleDisplay}`}>
                    {list.title}
                </label>
                <div className={`edit-title-div ${titleInputDisplay}`}>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    ></input>
                    <button onClick={updateTitle}>Update</button>
                    <button onClick={titleAndInputDisplay}>Cancel</button>
                </div>
            </div>
            <i className={`fa-solid fa-pen-to-square ${titleDisplay}`} onClick={titleAndInputDisplay}></i>
            <button
                className="close"
                onClick={() => removeList(list)}
            >
                <div className={`close__text ${titleDisplay}`}>&#215;</div>
            </button>
        </div>

    )
}
