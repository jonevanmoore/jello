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
        closeShareModalFunc()
    }

    return (
        <form className='share-board-form'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            onSubmit={handleSubmit}>
            <label>Share this board with another user</label>
            <input
                className='share-board-input'
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter Email'
            >
            </input>
            <div className='share-form-btns'>
                <button className='jello-wiggle button__shine__long__green green-btn' style={{ fontFamily: 'Roboto Condensed', fontWeight: '700' }}>Share</button>
                <button onClick={closeShareModalFunc} className='jello-wiggle button__shine__short__red share-form-cancel' style={{ fontFamily: 'Roboto Condensed', fontWeight: '700' }}>Cancel</button>
            </div>
        </form>
    )
}
