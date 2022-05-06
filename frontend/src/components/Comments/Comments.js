import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserIcon } from '../UserIcon';
import { avatars } from '../../context/Avatar';

import './Comments.css';

const Comments = () => {
    return (
        <div className='comments__container'>
            <div className='comments__title'>
                Comments
            </div>
            <div className='next__comment'>
                <div className='comments__image__users'>
                    <UserIcon size={30} isNavIcon={true} />
                </div>
                <textarea
                    className='textarea__input__comments'
                    placeholder='Add a more detailed comments...'
                />
            </div>
            <div className='add__cancel__desc'>
                <button
                    id='desc__buttons'
                    className={`
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                `}>
                    Add Comment</button>
                <button
                    className="close__desc"
                >
                    <div className="close__text">&#215;</div>
                </button>
            </div>
        </div>
    )
};

export default Comments;
