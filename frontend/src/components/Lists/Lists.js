import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readOneBoard, createList, deleteList } from '../../store/boards';

import './Lists.css';
import './Cards.css';

const ListsPage = () => {

    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id]);
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id;

    const dispatch = useDispatch();

    const [addListBtnDisplay, setAddListBtnDisplay] = useState('displayed');
    const [createListDisplay, setCreateListDisplay] = useState('not-displayed');

    const [title, setTitle] = useState('');

    const addNewList = async () => {
        const newList = { title, user_id, board_id, order: board.lists.length + 1 };
        await dispatch(createList(newList));
        setTitle('');
        setAddListBtnDisplay('displayed');
        setCreateListDisplay('not-displayed')
    };

    const removeList = async (list) => {
        await dispatch(deleteList(list));
    };

    const createDisplay = () => {
        if (addListBtnDisplay === 'displayed') {
            setAddListBtnDisplay('not-displayed');
            setCreateListDisplay('displayed');
            setTitle('');
        } else {
            setAddListBtnDisplay('displayed');
            setCreateListDisplay('not-displayed');
            setTitle('');
        }

        if (createListDisplay === 'not-displayed') {
            setCreateListDisplay('displayed');
            setAddListBtnDisplay('not-displayed');
            setTitle('');
        } else {
            setCreateListDisplay('not-displayed');
            setAddListBtnDisplay('displayed');
            setTitle('');
        }
    };

    return (
        <div className='lists__in__boards'>
            <div className='list__size'>
                {board.lists.map(list =>
                    <div key={list.id} className='list__container'>
                        <div className='list__title__close'>
                            <label className='list__title'>
                                {list.title}
                            </label>
                            <button
                                class="close"
                                onClick={() => removeList(list)}
                            >
                                <div class="close__text">&#215;</div>
                            </button>
                        </div>
                        <div>
                            {list.cards.map(card =>
                                <div key={card.id} className='card__container'>
                                    <div className='card__content'>{card.content}</div>
                                    <div className='card__description'>{card.description}</div>
                                    <div className='card__due__date'>{card.due_date}</div>
                                    {/* <div>{card.created_at}</div> */}
                                </div>
                            )}
                        </div>

                        <div className='create__list__button'>
                            <button
                                id='cards__buttons'
                                className='
                                light__blue__button
                                jello__wiggle
                                button__shine__short
                                '>
                                Create a Card
                            </button>

                        </div>
                    </div>
                )}
            </div>
            {/* <div className='lists__in__boards'> */}
            <div className='list__size'>

                <div className='list__container'>
                    <div className={`add-another-list-div ${createListDisplay}`}>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            className='input__list__title'
                            placeholder='List Title'
                            type='text'
                            value={title}
                        >
                        </input>
                        <div className='create__list__button create-list-btns'>
                            <button
                                onClick={addNewList}
                                id='lists__buttons'
                                className='
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                '
                            >Create List</button>
                            <button
                                onClick={createDisplay}
                                className={`close `}>
                                <div className="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                    <div className={`create__list__button ${addListBtnDisplay}`}>
                        <button
                            onClick={createDisplay}
                            id='lists__buttons'
                            className={`
                            light__green__blue__button
                            jello__wiggle
                            button__shine__short
                            `}>
                            {board.lists.length > 0 ? 'Add Another List' : 'Create a List'}
                        </button>

                    </div>
                </div>
            </div>
            {/* </div> */}
        </div >
    )
};

export default ListsPage
