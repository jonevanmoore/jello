import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { readBoards, readOneBoard, updateBoard, deleteBoard } from '../../store/boards';
import { UserIcon } from '../UserIcon';
import ListsPage from './temp_lists';
import Modal from '../Modal';
import EditBoardForm from './EditBoardForm';

import './Boards.css';
import './OneBoard.css';

const OneBoard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { board_id } = useParams();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards?.boards);
    const [ showEditModal, setShowEditModal ] = useState(false);
//    const board = useSelector(state => state.boards.boards[board_id])

    console.log(boards);
    const board = boards?.find(board => board.id == board_id);

    const boardsOwned = [];
    const boardsShared = [];

    boards?.forEach(board => {
        if (board.user_id === user.id) {
            boardsOwned.push(board);
        } else {
            boardsShared.push(board);
        }
    });

    const [title, setTitle] = useState(board?.title);
    const [avatar_id, setAvatar_id] = useState(board?.avatar_id);
    const [errors, setErrors] = useState([]);

    // const owner = user.id === board.user_id;

    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    useEffect(() => {
        dispatch(readOneBoard(board_id));
    }, [dispatch, board_id]);

    const deleteOneBoard = async (board) => {
        await dispatch(deleteBoard(board))
        history.push("/boards")
    };

//    if (!boards) return null;
//    if (!board) return null;

    const showEditModalFunc  = () => setShowEditModal(true);
    const closeEditModalFunc = () => setShowEditModal(false);

    return (
        <>
            <div className='divided_screen'>
                <div className='one__board__vertical__navbar'>
                    <div className='user__vertical__navbar'>
                        <div className='avatar__navbar__boards'>
                            <div>
                                <UserIcon isNavIcon={true} />
                            </div>
                        </div>
                        <div className='name__board__navbar__boards'>
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
                                        <div className='color__square jello__wiggle' />
                                        <div className='vertical__board__names jello__wiggle'>
                                            {board.title}
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                        )}
                    </div>
                </div>
                <div className='board-nav-bar-length'>
                    <div className='board-nav-bar'>
                        <div className='title-share-icons'>
                            <div className='board__title__board'>
                                {board?.title}
                            </div>
                            <div className='board-nav-left-divider' />
                            <div>
                                <button
                                    id='gray__board__button'
                                    className='
                            jello__wiggle
                            logout__button
                            red__button
                            button__shine__short__red
                            '>
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
                            <button
                                    id='gray__board__button'
                                    onClick={showEditModalFunc}
                                    className='
                                      jello__wiggle
                                      logout__button
                                      red__button
                                      button__shine__short__red
                                      '>
                              Edit Board
                            </button>
                          {showEditModal && (<Modal closeModalFunc={closeEditModalFunc}>
                              <EditBoardForm closeModalFunc={closeEditModalFunc} />
                            </Modal>)}
                            <button
                                id='gray__board__button'
                                className='
                                jello__wiggle
                                logout__button
                                red__button
                                button__shine__short__red
                                '
                                onClick={() => {
                                    deleteOneBoard(board)
                                }}>Delete Board</button>
                        </div>
                    </div>
                    <div className='lists__page__bg__color'>
                        <ListsPage />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneBoard;
