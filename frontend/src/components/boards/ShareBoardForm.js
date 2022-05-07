import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { shareBoard } from '../../store/boards';
import './ShareBoardForm.css'

export const ShareBoardForm = ({ closeShareModalFunc, boardId }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const stopTheProp = e => e.stopPropagation();


    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(shareBoard(email, boardId))
    }

    return (
        <form className='share-board-form'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            onSubmit={handleSubmit}>
            <input
                className='share-board-input'
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter Email'
            >
            </input>
            <button className='jello-wiggle'>Share</button>
            <button onClick={closeShareModalFunc} className='jello-wiggle'>Cancel</button>
        </form>
    )
}
