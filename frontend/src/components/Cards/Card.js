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

    const [newContent, setNewContent] = useState(card.content);
    const [newDescription, setNewDescription] = useState('');
    const [newDueDate, setNewDueDate] = useState('1999-12-31 11:59:59');

    const [contentDisplay, setContentDisplay] = useState('displayed-cont');
    const [contentInputDisplay, setContentInputDisplay] = useState('not-displayed-cont');
    const [descriptionDisplay, setDescriptionDisplay] = useState('displayed-desc');
    const [descriptionInputDisplay, setDescriptionInputDisplay] = useState('not-displayed-desc');


    const updateOneCard = async () => {
        let oneCard = {
            id: card.id,
            user_id: card.user_id,
            list_id: list.id,
            content: newContent,
            order: card.order,
            description: newDescription,
            due_date: newDueDate,
        };
        const updatedCard = await dispatch(updateCard(oneCard));
        setDescriptionDisplay('displayed-desc');
        setDescriptionInputDisplay('not-displayed-desc');
        setContentDisplay('displayed-cont');
        setContentInputDisplay('not-displayed-cont');
        setNewDescription('');
    };

    const removeCard = async (card) => {
        await dispatch(deleteCard(card));
        closeModalFunc();
    };

    const contentAndInputDisplay = () => {
        if (contentDisplay === 'displayed') {
            setContentDisplay('not-displayed');
            setContentInputDisplay('displayed');
        } else {
            setContentDisplay('displayed');
            setContentInputDisplay('not-displayed');
        }

        if (contentInputDisplay === 'not-displayed') {
            setContentInputDisplay('displayed');
            setContentDisplay('not-displayed');
        } else {
            setContentInputDisplay('not-displayed');
            setContentDisplay('displayed');
        }
        setNewContent(card.content);
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
        setNewDescription(card.description);
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
                <div className='titles__closing__n__edit'>
                    <div className='card__title__container__in_card'>
                        <div className={`card__title__in_card ${contentDisplay}`}>
                            {card.content}
                        </div>
                        <div className={`${contentInputDisplay}`}>
                            <input
                                type="text"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="content-input"
                            ></input>
                            <div className='update-content-btns'>
                                <button
                                    onClick={updateOneCard}
                                    className={`
                                        jello-wiggle
                                        button__shine__short
                                        light__green__button
                                        `}>
                                    Update
                                </button>
                                <button onClick={contentAndInputDisplay} className='jello-wiggle cancel-title-btn button__shine__short'>Cancel</button>
                            </div>
                        </div>
                        <span className='card__subtitle__in_list'>in list
                            <span className='list__title__in_list'>
                                {card.list_id === list.id ? ` ${list.title}` : ''}
                            </span>
                        </span>
                    </div>
                    <div className='card-edit-close-div'>
                        <div className={`edit__bts__in__card`}>
                            <i className={`fa-solid fa-pen-to-square jello-wiggle ${contentDisplay}`} onClick={contentAndInputDisplay}></i>
                        </div>
                        <div className='close__bts__in__card'>
                            <button
                                className="close__tag__card"
                                onClick={closeModalFunc}
                            >
                                <div className="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='due__date__container'>

                    <div className='description__container'>
                        <div className='description__title'>
                            Description
                        </div>
                        <p className='description__paragraph'>
                            {card.description}
                        </p>
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
                                `}>
                                Add Description
                            </button>
                            {/* <button
                                type='submit'
                                className="close__desc"
                            >
                                <div className="close__text">&#215;</div>
                            </button> */}
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
