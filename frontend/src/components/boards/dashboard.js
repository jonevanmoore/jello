import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { readBoards } from '../../store/boards';

const DashBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const boards = useSelector(state => state.boards);
    console.log(boards);

    // useEffect(() => {
    //     dispatch(readBoards());
    // }, [dispatch]);

    return (
        <>
            <div>
                hello
            </div>
        </>
    );
};

export default DashBoard;