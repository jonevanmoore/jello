import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { avatars } from '../../context/Avatar';

import { } from '../../store/boards';

import './Card.css';

const CardPage = () => {

    return (
        <div className='TEMP__POSITION'>
            <div className='card__container'>
                HELLO CARD
            </div>
        </div>
    )
};

export default CardPage;
