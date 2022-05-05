import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';

import './Lists.css';

const ListsPage = () => {

    return (
        <>
            <div className='lists__in__boards'>
                <div className='list__container'>
                    <div className='create__list__button'>
                        <button
                            id='lists__buttons'
                            className='
                        light__green__blue__button
                        jello__wiggle
                        button__shine__short
                        '>
                            Create a List
                        </button>
                        <button class="close">
                            <div class="close__text">+</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ListsPage
