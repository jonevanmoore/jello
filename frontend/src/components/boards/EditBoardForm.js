import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { readOneBoard, updateBoard } from '../../store/boards';

import './Boards.css';

const EditBoardForm = ({ closeModalFunc }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { board_id } = useParams();

    const user = useSelector(state => state.session.user);

    const boards = useSelector(state => state.boards?.boards);
    const board = boards.find(board => board.id == board_id);

    const [title, setTitle] = useState(board?.title);
    const [avatar_id, setAvatar_id] = useState(board?.avatar_id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const edits = {
            title,
            avatar_id
        };


        // TODO: refactor thunk / useSelectors
        let newBoard = await dispatch(updateBoard(edits, board_id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
        if (!errors.length && newBoard) {
          closeModalFunc();
          //history.push(`/boards/${newBoard.id}`);
        }
    };

    const stopTheProp = e => e.stopPropagation();

    return (
        <>
            <form onSubmit={handleSubmit} onClick={stopTheProp} onMouseDown={stopTheProp}>
                <div>
                    <input
                        placeholder='title'
                        type='text'
                        pattern='^[\S].*[\S]$'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder='avatar'
                        type='text'
                        // pattern="[^\s]+"
                        value={avatar_id}
                        onChange={(e) => setAvatar_id(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>
                    Save Board
                </button>
                <button onClick={closeModalFunc}>
                    Cancel
                </button>
            </form>
        </>
    )
};

export default EditBoardForm;
