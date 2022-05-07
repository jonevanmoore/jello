import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCard, deleteCard } from '../../store/boards';

import { UserIcon } from '../UserIcon';
import { avatars } from '../../context/Avatar';

import Comments from '../Comments/Comments';

import './Card.css';

const CardPage = ({ list, card, closeModalFunc }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [newDescription, setNewDescription] = useState('');
    const [newDueDate, setNewDueDate] = useState('1999-12-31 11:59:59');
    const [descriptionDisplay, setDescriptionDisplay] = useState('displayed-desc');
    const [descriptionInputDisplay, setDescriptionInputDisplay] = useState('not-displayed-desc');

    const updateOneCard = async () => {
        let oneCard = {
            id: card.id,
            user_id: card.user_id,
            list_id: list.id,
            content: card.content,
            order: card.order,
            description: newDescription,
            due_date: newDueDate,
        };
        const updatedCard = await dispatch(updateCard(oneCard));
        console.log('UPDATED CARD:  ', updatedCard);
        setDescriptionDisplay('displayed-desc');
        setDescriptionInputDisplay('not-displayed-desc');
        setNewDescription('');
    };


    const descriptionAndInputDisplay = () => {
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
        setNewDescription(card.description)
    };

    const removeCard = async (card) => {
        await dispatch(deleteCard(card));
        // TODO: fix this
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
                        className="close__tag__card"
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
                        {/* <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="title-input"
                        ></input>
                        <div className={`check-div`}>
                            <i className="fa-solid fa-circle-check" id={titleInputValid}></i>
                        </div> */}
                        <textarea
                            className='textarea__input__description'
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder='Add a more detailed description...'
                        />
                        <div className='add__cancel__desc'>
                            <button
                                onClick={updateOneCard}
                                id='desc__buttons'
                                className={`
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                `}
                            >
                                Add Description</button>
                            <button
                                type='submit'
                                className="close__desc"
                            // onClick={descriptionAndInputDisplay}
                            >
                                <div className="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                    <div className='comments__in__list__container'>
                        <Comments card={card} />
                    </div>
                    {/* <div className='form__avatar__image'>
                        <img className="jello__image__card" src={randomAvatar} />
                    </div> */}
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
        </div>
    )
};

export default CardPage;
