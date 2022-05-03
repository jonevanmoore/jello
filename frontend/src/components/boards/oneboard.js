import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import { readBoards } from '../../store/boards';

import './Boards.css';

const OneBoard = () => {
    const dispatch = useDispatch();
    const { board_id } = useParams();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards?.boards);
    const board = (boards.filter(board => {
        if (board.id == board_id) {
            return board;
        }
    })[0]);
    
    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    if (!boards) return null;

    return (
        <div className='divided_screen'>
            <div className='temp_vertical_navbar'>
                TEMP VERTICAL NAVBAR
                <div>
                    <div>
                        [ IC ]
                    </div>
                    <div>
                        {`${user.first_name} ${user.last_name}'s boards`}
                    </div>
                </div>
            </div>
            <div className='board-nav-bar'>
                <div className='title-share-icons'>
                    <div>
                        {board.title}
                    </div>
                    <div className='board-nav-left-divider' />
                    <div>
                        <button>
                            Share
                        </button>
                    </div>
                    <div className='board-nav-left-divider' />
                    <div>
                        [ IC ]
                    </div>
                    <div className='board-nav-left-divider' />
                </div>
                <div className='edit-delete-btns'>
                    <button>
                        Edit Button
                    </button>
                    <button>
                        Delete Board
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OneBoard;