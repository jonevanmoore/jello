import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserIcon } from '../UserIcon';
import { avatars } from "../../context/Avatar";

import Modal from '../Modal';
import NewBoardForm from '../boards/NewBoardForm';

import { readBoards } from '../../store/boards';

import './Boards.css';
import './BoardsNavbar.css';

const BoardSidebarCard = ({ board }) => {
  return (
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
  )
}

const BoardCard = ({ board }) => {
    return (
        <li className="boards__list__elements" key={board.id}>
            <NavLink style={{ textDecoration: 'none' }} to={`/boards/${board.id}`}>
                <div
                    className={`
            jello__container
            jello__container__ani
            jello__bg__${board.avatar_id}
            `}
                >
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
    )
}

const DashBoard = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards);

    const [showModal, setShowModal] = useState(false);
    const closeModalFunc = () => setShowModal(false);
    const showModalFunc = () => setShowModal(true);

    // this works actually
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

    if (!boards) return null;

    const avatarPNGs = Object.values(avatars)
        .filter((avatar, i) => user.avatar_id !== i + 1)
        .map(avatar => avatar.imageUrl)

    const randomAvatar = avatarPNGs[Math.floor(Math.random() * avatarPNGs.length)];

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
                    </div>
                    <div>
                        {boardsOwned.map(board =>
                          <BoardSidebarCard board={board} />
                        )}
                    </div>
                  {boardsShared.length > 0 &&
                    <>
                    <div className='your__boards__PLUS' style={{marginTop: "20px"}} >
                      <div >
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
                <div className='body__boards'>
                    <div className='bg__avatar__image'>
                        <img className='bg__avatar__image'
                            src={randomAvatar}
                        />
                    </div>
                    <div className='boards__name'>
                        <div className='avatar__boards__big'>
                            <UserIcon size={120} isNavIcon={true} />
                        </div>
                        <div className='boards__title'>
                            {`${user.first_name} ${user.last_name}'s boards`}
                        </div>
                    </div>

                    <div className='all__boards__display'>
                        <div className='subtitles__boards'>My Boards</div>
                        <ul className='all__boards'>
                            <div
                                className='create__new__board__in__grid jello__wiggle'
                                onClick={showModalFunc}
                            >
                                New Board
                            </div>
                            {boardsOwned.map((board, i) =>
                                <BoardCard board={board} key={i} />
                            )}
                        </ul>
                        {boardsShared.length > 0 && <div className='subtitles__boards'>Shared Boards</div>}
                        <ul className='all__boards'>
                            {boardsShared.map((board, i) =>
                                <BoardCard board={board} key={i} />
                            )}
                        </ul>
                    </div>
                </div>
                {showModal && (
                    <Modal closeModalFunc={closeModalFunc}>
                        <NewBoardForm closeModalFunc={closeModalFunc} />
                    </Modal>
                )}
            </div>
        </>
    );
};

export default DashBoard;
