import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createCard, } from '../../store/boards';

const AddNewCard = ({ list }) => {
    const dispatch = useDispatch();
    // const { board_id } = useParams();
    // const board = useSelector(state => state.boards[board_id]);
    const user_id = useSelector(state => state.session.user.id);

    const [content, setContent] = useState('');

    const [cardDisplay, setCardDisplay] = useState('displayed-card');
    const [cardInputDisplay, setCardInputDisplay] = useState('not-displayed-card');

    const addNewCard = async () => {
        if (content.trim() === '') return;

        const newCard = {
            content,
            user_id,
            list_id: list.id,
            order: list.cards.length + 1

        };
        await dispatch(createCard(newCard));
        setCardDisplay('displayed-card');
        setCardInputDisplay('not-displayed-card');

    };

    const createNewCardDisplay = () => {
        if (cardDisplay === 'displayed-card') {
            setCardDisplay('not-displayed-card');
            setCardInputDisplay('displayed-card');
            setContent('');
        } else {
            setCardDisplay('displayed-card');
            setCardInputDisplay('not-displayed-card');
            setContent('');
        }

        if (cardInputDisplay === 'not-displayed-card') {
            setCardInputDisplay('displayed-card');
            setCardDisplay('not-displayed-card');
            setContent('');

        } else {
            setCardInputDisplay('not-displayed-card');
            setCardDisplay('displayed-card');
            setContent('');

        }
    };

    return (
        <>
            <div className={`add-another-list-div ${cardInputDisplay} grow-down`}>
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
            <div className={`create__card_in_list__button ${cardDisplay} grow-down`}>
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
