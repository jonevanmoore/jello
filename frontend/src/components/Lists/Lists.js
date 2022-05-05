import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import { readOneBoard } from '../../store/boards';

import './Lists.css';
import './Cards.css';

const ListsPage = () => {

    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id]);

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
                                <div class="close__text">+</div>
                            </button>
                        </div>
                        <div>
                            {list.cards.map(card =>
                                <div className='card__container'>
                                    <div>{card.content}</div>
                                    <div>{card.description}</div>
                                    <div>{card.due_date}</div>
                                    <div>{card.created_at}</div>
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
                                Create a List
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ListsPage
