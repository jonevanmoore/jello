import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { readBoards, readOneBoard, updateBoard, deleteBoard } from '../../store/boards';
import { UserIcon } from '../UserIcon';
import ListsPage from '../Lists/Lists';
import Modal from '../Modal';
import EditBoardForm from './EditBoardForm';
import { avatars } from '../../context/Avatar';

import './Boards.css';
import './OneBoard.css';

const OneBoard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { board_id } = useParams();
    const user = useSelector(state => state.session?.user);
    const boards = useSelector(state => state.boards);
    const board = useSelector(state => state.boards[board_id]);
    const [showEditModal, setShowEditModal] = useState(false);

    //console.log("BOARDS>>>>>>>>>>>>>>>>>>>",boards);

    // TODO: FIX SHARED BOARDS BEHAVIOR
    const boardsOwned = [];

    Object.values(boards).forEach(board => {
        if (board.user_id === user.id) {
            boardsOwned.push(board);
        }
    });

    console.log('THIS BOARD: ', board);
    useEffect(() => {
        dispatch(readBoards());
    }, [dispatch]);

    useEffect(() => {
        dispatch(readOneBoard(board_id));
    }, [dispatch, board_id]);

    const deleteOneBoard = async (board) => {
        await dispatch(deleteBoard(board));
        history.push("/boards"); // timing issue
    };

    //    if (!boards) return null;
    if (!board) return null;

    const showEditModalFunc = () => setShowEditModal(true);
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
                                        <div className='color__square jello__wiggle'
                                            style={{ backgroundColor: avatars[board.avatar_id].color }}
                                        />
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
                            <div className='shared__with'>
                                <UserIcon isNavIcon={true} />
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
                    <div
                        className='lists__page__bg__color'
                        style={{
                            backgroundColor: avatars[board.avatar_id].color
                        }}>
                        <ListsPage />
                    </div>
                    <div className='bg__avatar__image jello__wiggle__big'>
                        <img className='bg__avatar__image ' src={avatars[board.avatar_id].imageUrl} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneBoard;
