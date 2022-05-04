import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { UserIcon } from '../UserIcon';
import { avatars } from "../../context/Avatar";



import { readBoards } from '../../store/boards';

import './Boards.css';
import './BoardsNavbar.css';

const DashBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards);

    // TODO: FIX SHARED BOARDS BEHAVIOR
    const boardsOwned = [];
    const boardsShared = [];

    Object.values(boards).forEach(board => {
        if (board.user_id === user.id) {
            console.log('BIOARD-----------------', board);
            boardsOwned.push(board);
        } else {
            boardsShared.push(board);
        }
    });

    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    if (!boards) return null;

    return (
        <>
            <div className='divided_screen'>
                <div className='all__boards__vertical__navbar'>
                    <div className='user__vertical__navbar'>
                        <div className='avatar__navbar__boards'>
                            <div>
                                <UserIcon isNavIcon={true} />
                            </div>
                        </div>
                        <div className='name__boards__navbar__boards'>
                            {`${user.first_name} ${user.last_name}`}
                        </div>
                    </div>
                    <div className='your__boards__PLUS'>
                        <div>
                            Your Boards
                        </div>
                        <div>
                            +
                        </div>
                    </div>
                    <div>
                        {boardsOwned.map(board =>
                            <li className="boards__list__elements" key={board.id}>
                                <NavLink style={{ textDecoration: 'none' }} to={`/boards/${board.id}`}>
                                    <div className='vertical__list__boards'>
                                        <div className='color__square jello__wiggle'
                                            style={{ backgroundColor: avatars[board.avatar_id].color }}
                                        />
                                        <div className='vertical__boards__names jello__wiggle'>
                                            {board.title}
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                        )}
                    </div>
                </div>
                <div className='body__boards'>
                    <div className='boards__name'>
                        <div className='avatar__boards__big'>
                            <UserIcon size={122} isNavIcon={true} />
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
                            {boardsOwned.map(board =>
                                <li className="boards__list__elements" key={board.id}>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/boards/${board.id}`}>
                                        <div
                                            className="
                                                jello__container
                                                jello__container__ani
                                                jello__bg
                                                "
                                            style={{ backgroundColor: avatars[board.avatar_id].color }}>
                                            <div className='jello__title'>
                                                {board.title}
                                            </div>
                                            <div className="jello__wiggle">
                                                <img
                                                    className="jello__image"
                                                    src={avatars[board.avatar_id].imageUrl} />
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='subtitles__boards'>
                        Shared Boards (WRONG LOGIC)
                    </div>
                    <div>
                        <ul className='all__boards'>
                            {boardsShared.map(board =>
                                <li className="jello__container jello__container__ani jello__bg" key={board.id}>
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
