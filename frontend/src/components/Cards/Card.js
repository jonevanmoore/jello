import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCard } from '../../store/boards';

import { UserIcon } from '../UserIcon';
import { avatars } from '../../context/Avatar';

import './Card.css';

const CardPage = ({ list, card, closeModalFunc }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);


    const removeCard = async (card) => {
        await dispatch(deleteCard(card));
        // TODO: fix this
    };

    console.log(card);
    const avatarPNGs = Object.values(avatars)
        .filter((avatar, i) => user.avatar_id != i + 1)
        .map(avatar => avatar.imageUrl);

    const randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

    const stopTheProp = e => e.stopPropagation();

    return (
        <div
            className='TEMP__POSITION'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}>
            <div className='card__container__in_card'>
                <div className='close__in_card'>
                    <button
                        className="close"
                        onClick={() => removeCard(card)}
                    >
                        <div className="close__text">&#215;</div>
                    </button>
                </div>
                <div className='card__title__container__in_card'>
                    <div className='card__title__in_card'>
                        {card.content}
                    </div>
                    <span className='card__subtitle__in_list'>in list
                        <span className='list__title__in_list'>
                            {card.list_id === list.id ? ` ${list.title}` : ''}
                        </span>
                    </span>
                </div>
                <div className='due__date__container'>
                    <div className='due__date__title'>
                        Due date
                    </div>
                    <div className='due__date'>
                        <div className='month__day__year'>
                            This will be the DATE
                        </div>
                        <div className='drop__down__mark'>
                            complete
                        </div>
                    </div>
                    <div className='description__container'>
                        <div className='description__title'>
                            Description
                        </div>
                        <textarea
                            className='textarea__input__description'
                            placeholder='Add a more detailed description...'
                        />
                    </div>
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
                    </div>
                    <div className='form__avatar__image'>
                        <img className="jello__image__card" src={randomAvatar} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardPage;
