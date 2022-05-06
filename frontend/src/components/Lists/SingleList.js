import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../../store/boards';
import { useParams } from 'react-router-dom';

export const SingleList = ({ list, titleAndInputDisplay, setTitleDisplay, setTitleInputDisplay }) => {

    const [newTitle, setNewTitle] = useState(list.title)

    const dispatch = useDispatch()

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

    return (
        <>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            ></input>
            <button onClick={updateTitle}>Update</button>
            <button onClick={titleAndInputDisplay}>Cancel</button>
        </>
    )
}
