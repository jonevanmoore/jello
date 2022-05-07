import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCard } from '../../store/boards';

import { UserIcon } from '../UserIcon';
import { avatars } from '../../context/Avatar';

import Comments from '../Comments/Comments';

import './Card.css';

const CardPage = ({ list, card, closeModalFunc }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [newDescription, setNewDescription] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [descriptionDisplay, setDescriptionDisplay] = useState('displayed-desc')
    const [descriptionInputDisplay, setDescriptionInputDisplay] = useState('not-displayed-desc')

    const updateCard = async () => {
        let updatedCard = {
            id: card.id,
            user_id: card.user_id,
            content: card.content,
            order: card.order,
            description: newDescription,
            due_date: newDueDate,
        };
        await dispatch(updateCard(updatedCard));
        setDescriptionDisplay('displayed-desc');
        setDescriptionInputDisplay('not-displayed-desc');
    };

    const removeCard = async (card) => {
        await dispatch(deleteCard(card));
        // TODO: fix this
    };

    const titleAndInputDisplay = () => {
        if (descriptionDisplay === 'displayed-desc') {
            setDescriptionDisplay('not-displayed-desc');
            setDescriptionInputDisplay('displayed-desc');
        } else {
            setDescriptionDisplay('displayed-desc');
            setDescriptionInputDisplay('not-displayed-desc');
        }

        if (descriptionInputDisplay === 'not-displayed-desc') {
            setDescriptionInputDisplay('displayed-desc');
            setDescriptionDisplay('not-displayed-desc');
        } else {
            setDescriptionInputDisplay('not-displayed-desc');
            setDescriptionDisplay('displayed-desc');
        }
    };

    const avatarPNGs = Object.values(avatars)
        .filter((avatar, i) => user.avatar_id != i + 1)
        .map(avatar => avatar.imageUrl);

    const randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

    const stopTheProp = e => e.stopPropagation();

    return (
        <div
            className='card__element'
            onClick={stopTheProp}
            onMouseDown={stopTheProp}>
            <div className='card__container__in_card'>
                <div className='close__in_card'>
                    <button
                        className="close"
                        onClick={closeModalFunc}
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
                    {/* <div className='due__date__title'>
                        Due date
                    </div>
                    <div className='due__date'>
                        <div className='month__day__year'>
                            This will be the DATE
                        </div>
                        <div className='drop__down__mark'>
                            complete
                        </div>
                    </div> */}
                    <div className='description__container'>
                        <div className='description__title'>
                            Description
                        </div>
                        <p className='description__paragraph'>
                            {card.description}
                        </p>
                        <textarea
                            className='textarea__input__description'
                            placeholder='Add a more detailed description...'
                        />
                        <div className='add__cancel__desc'>
                            <button
                                id='desc__buttons'
                                className={`
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                `}>
                                Add Description</button>
                            <button
                                className="close__desc"
                            >
                                <div className="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <Comments card={card} />
                    </div>
                    {/* <div className='form__avatar__image'>
                        <img className="jello__image__card" src={randomAvatar} />
                    </div> */}
                </div>
            </div>
            <div className='del__card__btn__container'>
                <button
                    id='del__card__btn'
                    className='
                            jello__wiggle
                            logout__button
                            red__button
                            button__shine__short__red
                            '
                    onClick={() => removeCard(card)}
                >Delete Card</button>
            </div>
        </div>
    )
};

export default CardPage;
