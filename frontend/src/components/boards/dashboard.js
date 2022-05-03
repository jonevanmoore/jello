import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { readBoards } from '../../store/boards';

import './Boards.css';

const DashBoard = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards?.boards);

    // console.log('BOARDS: ', boards);

    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    if (!boards) return null;

    return (
        <>
            <div className=''>
                <div>
                    Vertical NavBar
                </div>
                <div>
                    <ul className='all__boards'>
                        {boards.map(board =>
                            <li className="jello__container jello__container__ani jello__bg__01" key={board.id}>
                                <div className='jello__title'>
                                    {board.title}
                                </div>
                                <div className="jello__image__container jello__wiggle">
                                    <img className="jello__image" src={'/static/Jello-01.png'} />
                                </div>

                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
