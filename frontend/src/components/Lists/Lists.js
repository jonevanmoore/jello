import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readOneBoard, createList } from '../../store/boards';

import './Lists.css';
import './Cards.css';

const ListsPage = () => {

    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id]);
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id;

    const dispatch = useDispatch()

    const [addListBtnDisplay, setAddListBtnDisplay] = useState('displayed')
    const [title, setTitle] = useState('')

    const addNewList = async () => {
        const newList = { title, user_id, board_id, order: board.lists.length }
        await dispatch(createList(newList))
    }

    // console.log('LISTS: ', board.lists);

    return (
        <div className='lists__in__boards'>
            <div className='list__size'>
                {board.lists.map(list =>
                    <div className='list__container'>
                        <div className='list__title__close'>
                            <label className='list__title'>
                                {list.title}
                            </label>
                            <button class="close">
                                <div class="close__text">&#215;</div>
                            </button>
                        </div>
                        <div>
                            {list.cards.map(card =>
                                <div className='card__container'>
                                    <div className='card__content'>{card.content}</div>
                                    <div className='card__description'>{card.description}</div>
                                    <div className='card__due__date'>{card.due_date}</div>
                                    {/* <div>{card.created_at}</div> */}
                                </div>
                            )}
                        </div>

                        <div className='create__list__button'>
                            <button
                                id='lists__buttons'
                                className='
                        light__green__blue__button
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
                    <div className='add-another-list-div'>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            type='text'
                            value={title}
                        >
                        </input>
                        <div className='create-list-btns'>
                            <button
                                onClick={addNewList}
                            >Create List</button>
                            <button class="close">
                                <div class="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                    <div className='create__list__button'>
                        <button
                            id='lists__buttons'
                            className='
                        light__green__blue__button
                        jello__wiggle
                        button__shine__short
                        '>
                            {board.lists.length > 0 ? 'Add Another List' : 'Create a List'}
                        </button>

                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
};

export default ListsPage
