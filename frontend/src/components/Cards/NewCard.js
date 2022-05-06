import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { createCard, } from '../../store/boards';

const AddNewCard = ({ list }) => {
    const dispatch = useDispatch();
    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id]);
    const user_id = useSelector(state => state.session.user.id);

    const [addCardBtnDisplay, setAddCardBtnDisplay] = useState('displayed-card');
    const [createCardDisplay, setCreateCardDisplay] = useState('not-displayed-card');

    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    // const [orderCard, setOrderCard] = useState('');
    const [dueDate, setDueDate] = useState('');

    const addNewCard = async () => {
        const newCard = {
            content,
            user_id,
            list_id: list.id,
            order: list.cards.length + 1,
            description
            // due_date: dueDate
        };
        await dispatch(createCard(newCard));
    };

    const createNewCardDisplay = () => {
        if (addCardBtnDisplay === 'displayed-card') {
            setAddCardBtnDisplay('not-displayed-card');
            setCreateCardDisplay('displayed-card');
            setContent('');
            setDescription('');
            setDueDate('');
        } else {
            setAddCardBtnDisplay('displayed-card');
            setCreateCardDisplay('not-displayed-card');
        }

        if (createCardDisplay === 'not-displayed-card') {
            setCreateCardDisplay('displayed-card');
            setAddCardBtnDisplay('not-displayed-card');
        } else {
            setCreateCardDisplay('not-displayed-card');
            setAddCardBtnDisplay('displayed-card');
        }
    };

    return (
        <>
            <div className={`add-another-list-div ${createCardDisplay} grow-down`}>
                <input
                    onChange={e => setContent(e.target.value)}
                    className='input__list__title'
                    placeholder='Card Content'
                    type='text'
                    value={content}
                >
                </input>
                <div className='create__card_in_list__button create-list-btns'>
                    <button
                        onClick={addNewCard}
                        id='cards__buttons'
                        className='
                        light__blue__button
                        jello__wiggle
                        button__shine__short
                        '
                    >Create Card</button>
                    <button
                        onClick={createNewCardDisplay}
                        className='close shrink-up'>
                        <div className="close__text">&#215;</div>
                    </button>
                </div>
            </div>
            <div className={`create__card_in_list__button ${addCardBtnDisplay} grow-down`}>
                <button
                    onClick={createNewCardDisplay}
                    id='cards__buttons'
                    className='
                    light__blue__button
                    jello__wiggle
                    button__shine__short
                '>
                    {list.cards.length > 0 ? 'Add Another Card' : 'Create a Card'}
                </button>

            </div>

        </>
    );
};

export default AddNewCard;
