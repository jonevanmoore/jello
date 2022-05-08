import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { readBoards, readOneBoard, deleteBoard, revokeBoard } from '../../store/boards';
import { UserIcon } from '../UserIcon';
import ListsPage from '../Lists/Lists';
import Modal from '../Modal';
import ConfirmationModal from '../Modal/ConfirmationModal'
import EditBoardForm from './EditBoardForm';
import { ShareBoardForm } from './ShareBoardForm';
import { avatars } from '../../context/Avatar';

import './Boards.css';
import './OneBoard.css';


const BoardSidebarCard = ({ board }) => {
  return (
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
  )
}

const OneBoard = () => {
  const dispatch = useDispatch();
    const history = useHistory();
    const { board_id } = useParams();
    const user = useSelector(state => state.session?.user);
    const boards = useSelector(state => state.boards);
    const board = useSelector(state => state.boards[board_id]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const boardsOwned = [];
    const boardsShared = [];

    Object.values(boards).forEach(board => {
        if (board.user_id === user.id) {
            boardsOwned.push(board);
        } else {
            boardsShared.push(board);
        }
    });

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

    const showShareModalFunc = () => setShowShareModal(true);
    const closeShareModalFunc = () => setShowShareModal(false);

    // this is a closure
    const revokeBoardFuncForUser = userId => async e => {
      dispatch(revokeBoard(board_id, userId));
    };

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
                    </div>
                    <div>
                        {boardsOwned.map(board =>
                          <BoardSidebarCard board={board} />
                        )}
                    </div>
                  {boardsShared.length > 0 &&
                    <>
                    <div className='your__boards__PLUS' style={{marginTop:"20px"}}>
                        <div>
                            Shared Boards
                        </div>
                    </div>
                    <div>
                        {boardsShared.map(board =>
                          <BoardSidebarCard board={board} />
                        )}
                    </div>
                    </>
                  }
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
                            '
                                    onClick={showShareModalFunc}>
                                    Share
                                </button>

                                {showShareModal && (<Modal closeModalFunc={closeShareModalFunc}>
                                    <ShareBoardForm closeShareModalFunc={closeShareModalFunc} boardId={board_id} />
                                </Modal>)}
                            </div>
                            <div className='board-nav-left-divider' />
                            <div className='shared__with'>
                                <UserIcon size={20} givenUser={board.user} />
                                {board?.shared_users.map((aUser, i) => (
                                    <ConfirmationModal  message={ user.id === aUser.id ? "Are you sure you wish to remove yourself from this board?"
                                                                  :`Are you sure you want to revoke this board from ${aUser.first_name} ${aUser.last_name}?`}
                                                        actionButtonLabel="Revoke Board"
                                                        func={revokeBoardFuncForUser(aUser.id)}> 
                                        <UserIcon size={20} 
                                                  givenUser={aUser} 
                                                  isNavIcon={true} 
                                                  key={i} 
                                                  isShareIcon={true} />
                                    </ConfirmationModal>
                                ))}
                            </div>
                            {board?.shared_users.length > 0 && <div className='board-nav-left-divider' />}
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

                            {board.user_id === user.id && (
                            <ConfirmationModal message="Are you sure you want to delete this board?"
                                               actionButtonLabel="Delete Board"
                                               func={()=>deleteOneBoard(board)}>
                              <button
                                style={{marginRight: "12px"}}
                                id='gray__board__button'
                                className='
                                jello__wiggle
                                logout__button
                                red__button
                                button__shine__short__red
                                '
                                //onClick={() => deleteOneBoard(board)}
                              >Delete Board</button>
                            </ConfirmationModal>
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundColor: avatars[board.avatar_id].color
                        }}
                        className='lists-page-position'>
                        <ListsPage />
                    </div>
                    <img className='bg__avatar__image' src={avatars[board.avatar_id].imageUrl} />
                </div>
            </div>
        </>
    );
};

export default OneBoard;
