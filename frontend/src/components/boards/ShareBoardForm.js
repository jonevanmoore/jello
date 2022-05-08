import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { shareBoard } from '../../store/boards';
import './ShareBoardForm.css'

export const ShareBoardForm = ({ closeShareModalFunc, boardId }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [successOrError, setSuccessOrError] = useState('')
    const [successOrErrorClass, setSuccessOrErrorClass] = useState('')
    const stopTheProp = e => e.stopPropagation();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await dispatch(shareBoard(email, boardId))
            // closeShareModalFunc()
            setEmail('')
            setSuccessOrError('User added! Add another?')
            setSuccessOrErrorClass('success')

        } catch {
            setSuccessOrError('Unable to find user')
            setSuccessOrErrorClass('error')
        }
    }

    return (
        <form className='share-board-form'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}
            onSubmit={handleSubmit}>
            <label style={{ color: 'gray' }}>Share this board with other users</label>
            <div style={{ position: 'absolute' }}>
                <label className={successOrErrorClass}>{successOrError}</label>
            </div>
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
