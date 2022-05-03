import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams } from 'react-router-dom';

import { readBoards, readOneBoard, updateBoard } from '../../store/boards';

import './Boards.css';

const OneBoard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { board_id } = useParams();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards?.boards);
    const board = (boards.filter(board => {
        if (board.id == board_id) {
            return true;
        }
    })[0]);
    const [title, setTitle] = useState(board.title);
    const [avatar_id, setAvatar_id] = useState(board.avatar_id);
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    useEffect(() => {
        dispatch(readOneBoard(board_id));
    }, [dispatch, board_id]);

    const editBoard = async (e) => {
        e.preventDefault();

        const edits = {
            title,
            avatar_id
        }
        
        let newBoard = await dispatch(updateBoard(edits, board_id))
        .catch( async(res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
        if (errors.length && newBoard) {
            history.push(`/boards/${newBoard.id}`);
        }
    }

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