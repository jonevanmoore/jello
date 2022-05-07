import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserIcon } from '../UserIcon';
import { avatars } from '../../context/Avatar';

import { createComment, deleteComment } from '../../store/boards';

import './Comments.css';

const Comments = ({ card }) => {
    const dispatch = useDispatch();

    const [body, setBody] = useState('');

    const sessionUser = useSelector(state => state.session.user);
    const comments = card.comments;

    const addComment = async () => {
        if (body.trim() === '') return;
        const newComment = {
            user_id: sessionUser.id,
            card_id: card.id,
            body
        };
        await dispatch(createComment(newComment));
        setBody('');
    };

    const removeComment = async (comment) => {
        await dispatch(deleteComment(comment));
    };

    const cardOwner = card.userId === sessionUser?.id;

    let orderedComments = comments.sort((a, b) => a.order - b.order).reverse();
    console.log('ORDERED COMMENTS: ', orderedComments);

    const stopTheProp = e => e.stopPropagation();

    return (
        <div
            className='comments__container'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}>
            <div className='comments__title'>
                Comments
            </div>
            <div className='next__comment'>
                <div className='comments__image__users'>
                    <UserIcon size={30} isNavIcon={true} />
                </div>
                <textarea
                    className='textarea__input__comments'
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='Add a more detailed comments...'
                />
            </div>
            <div className='add__cancel__comments'>
                {/* {cardOwner && */}
                <button
                    onClick={addComment}
                    id='comments__buttons'
                    className={`
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                `}>
                    Add Comment</button>
                {/* } */}
                <button className="add__tag__comment">
                    <div className="close__text">&#215;</div>
                </button>
            </div>
            <div className='display__comments'>
                {orderedComments.map((comment, index) =>
                    <div className='comment__by__user'>
                        <div className='comment__delete__container'>
                            <div className='comments__image__users' key={index}>
                                {/* {comment.user_id === user.id ? `${{}}` : ''} */}
                                <UserIcon givenUser={comment.user} size={30} isNavIcon={true} />
                                {/* <img className='' src={avatars[card.avatar_id].imageUrl} /> */}
                            </div>
                            <div className='comments__font__size'>
                                {comment.body}
                            </div>
                        </div>
                        <div>
                            {/* {cardOwner && */}
                            <button
                                className="close__tag__comment"
                                onClick={() => removeComment(comment)}
                            >
                                <div className="close__text bg-white">&#215;</div>
                            </button>
                            {/* } */}
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
};

export default Comments;
