import { useState, useEffect } from 'react';
import './ShareBoardForm.css'

export const ShareBoardForm = ({ closeShareModalFunc }) => {
    const [email, setEmail] = useState('')

    return (
        <form className='share-board-form'>
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
