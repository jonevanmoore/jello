import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { readBoards } from '../../store/boards';

import './Boards.css';

const DashBoard = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards?.boards);

    console.log('USER: ', user);

    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    if (!boards) return null;

    return (
        <>
            <div className='divided_screen'>
                <div className='temp_vertical_navbar'>
                    TEMP VERTICAL NAVBAR
                </div>
                <div className=''>
                    <div className='boards__name'>
                        <div className='avatar__boards__big'>
                            [ IC ]
                        </div>
                        <div className='boards__title'>
                            {`${user.first_name} ${user.last_name}'s boards`}
                        </div>
                    </div>
                    <div className='subtitles__boards'>
                        My Boards
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
                    <div className='subtitles__boards'>
                        Shared Boards (Temp Logic)
                    </div>
                    <div>
                        <ul className='all__boards'>
                            {boards.map(board =>
                                <li className="jello__container jello__container__ani jello__bg__02" key={board.id}>
                                    <div className='jello__title'>
                                        {board.title}
                                    </div>
                                    <div className="jello__image__container jello__wiggle">
                                        <img className="jello__image" src={'/static/Jello-02.png'} />
                                    </div>

                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashBoard;
