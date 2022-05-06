import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from '../Modal';
import { SingleList } from './SingleList';

import { avatars } from '../../context/Avatar';

import { createList, updateListOrder, deleteList } from '../../store/boards';

import AddNewCard from '../Cards/NewCard';
import CardPage from '../Cards/Card';

import './Lists.css';
import './Cards-in-Lists.css';

const ListsPage = () => {
    const dispatch = useDispatch();
    const { board_id } = useParams();
    const board = useSelector(state => state.boards[board_id]);
    const user_id = useSelector(state => state.session.user.id);

    const [addListBtnDisplay, setAddListBtnDisplay] = useState('displayed');
    const [createListDisplay, setCreateListDisplay] = useState('not-displayed');

    const [title, setTitle] = useState('');
    const [titleDisplay, setTitleDisplay] = useState('displayed');
    const [titleInputDisplay, setTitleInputDisplay] = useState('not-displayed');

    const [showModal, setShowModal] = useState(false);

    const closeModalFunc = () => setShowModal(false);
    const showModalFunc = () => setShowModal(true);

    let lists = board.lists.sort((a, b) => a.order - b.order);

    const addNewList = async () => {
        const newList = { title, user_id, board_id, order: board.lists.length + 1 };
        await dispatch(createList(newList));
        setTitle('');
        setAddListBtnDisplay('displayed');
        setCreateListDisplay('not-displayed');
    };



    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;

        let listCopy = Array.from(lists);
        const [reOrderedItem] = listCopy.splice(result.source.index, 1);
        listCopy.splice(result.destination.index, 0, reOrderedItem);

        let listOrder = {};
        listCopy.forEach((list, index) => listOrder[list.id] = index);
        lists = listCopy;
        await dispatch(updateListOrder(board_id, listOrder));
    };

    const createNewListDisplay = () => {
        if (addListBtnDisplay === 'displayed') {
            setAddListBtnDisplay('not-displayed');
            setCreateListDisplay('displayed');
            setTitle('');
        } else {
            setAddListBtnDisplay('displayed');
            setCreateListDisplay('not-displayed');
            setTitle('');
        }

        if (createListDisplay === 'not-displayed') {
            setCreateListDisplay('displayed');
            setAddListBtnDisplay('not-displayed');
            setTitle('');
        } else {
            setCreateListDisplay('not-displayed');
            setAddListBtnDisplay('displayed');
            setTitle('');
        }
    };



    return (
        <div className='lists__in__boards'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='list__size' direction='horizontal'>
                    {(provided) => (
                        <div className='list__size' {...provided.droppableProps} ref={provided.innerRef}>
                            {lists.map((list, index) =>
                                <Draggable draggableId={String(list.id)} key={list.id} index={index}>

                                    {(provided) => {
                                        return (
                                            <div className='list__container' {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                                <SingleList list={list} />
                                                <div>
                                                    {list.cards.map((card, index) =>
                                                        <div className='card__container' key={index}>
                                                            <div
                                                                className='card__content'
                                                                onClick={showModalFunc}
                                                            >
                                                                {card.content}
                                                            </div>
                                                            {showModal && (
                                                                <Modal closeModalFunc={closeModalFunc}>
                                                                    <CardPage list={list} card={card} closeModalFunc={closeModalFunc} />
                                                                </Modal>
                                                            )}

                                                            {/* <div className='card__description'>{card.description}</div> */}
                                                            <div className='card__due__date'>{card.due_date}</div>
                                                            {/* <div>{card.created_at}</div> */}
                                                        </div>
                                                    )}
                                                </div>

                                                <AddNewCard list={list} />
                                            </div>
                                        )
                                    }}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext >
            {/* <div className='lists__in__boards'> */}

            < div className='list__size' >
                <div className='list__container grow-down'>
                    <div className={`add-another-list-div ${createListDisplay} grow-down`}>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            className='input__list__title'
                            placeholder='List Title'
                            type='text'
                            value={title}
                        >
                        </input>
                        <div className='create__card_in_list__button create-list-btns'>
                            <button
                                onClick={addNewList}
                                id='lists__buttons'
                                className='
                                light__green__blue__button
                                jello__wiggle
                                button__shine__short
                                '
                            >Create List</button>
                            <button
                                onClick={createNewListDisplay}
                                className='close'>
                                <div className="close__text">&#215;</div>
                            </button>
                        </div>
                    </div>
                    <div className={`create__list__button ${addListBtnDisplay} grow-down`}>
                        <button
                            onClick={createNewListDisplay}
                            id='lists__buttons'
                            className={`
                            light__green__blue__button
                            jello__wiggle
                            button__shine__short
                            `}>
                            {board.lists.length > 0 ? 'Add Another List' : 'Create a List'}
                        </button>
                    </div>
                </div>
            </div >
            {/* </div> */}
        </div >
    )
};

export default ListsPage
