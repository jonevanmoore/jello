
//CONSTANTS
const CREATE_BOARD = 'boards/CREATE_BOARD';
const READ_BOARDS = 'boards/READ_BOARDS';
const UPDATE_BOARD = 'boards/UPDATE_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

// ACTIONS
const createBoardAction = board => {
    return {
        type: CREATE_BOARD,
        payload: board
    };
};

const readBoardsAction = boards => {
    return {
        type: READ_BOARDS,
        payload: boards
    };
};

const updateBoardAction = board => {
    return {
        type: UPDATE_BOARD,
        payload: board
    };
};

const deleteBoardAction = board => {
    return {
        type: DELETE_BOARD,
        payload: board
    };
};

// THUNKS
export const createBoardThunk = board => async dispatch => {
    const {
        id,
        user_id,
        title,
        avatar_id,
        // workspace_id
    } = board;

    try {

        const response = await fetch('/api/boards/new-board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user_id,
                title,
                avatar_id,
                // workspace_id
            })
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createBoardAction(data));
            return data;
        }
    } catch (e) {
        console.log('CREATE BOARD ERROR', e);
    }
};

export const readBoards = () => async dispatch => {
    const response = await fetch("/api/boards");

    if (response.ok) {
        const data = await response.json();
        dispatch(readBoardsAction(data));
        return data;
    };
};

export const updateBoard = board => async dispatch => {
    try {
        const response = await fetch(`/api/boards/${board.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(board)
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateBoardAction(data));
            return data;
        };
    } catch (e) {
        console.log('UPDATE BOARD ERROR: ', e);
    }
};

export const deleteBoard = board => async dispatch => {
    const response = await fetch(`/api/boards/${board.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBoardAction(data));
        return data;
    };
};


// REDUCER
let initialState = { boards: [] };

const boardsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOARD:
            newState = Object.assign({}, state);
            newState.boards = action.payload;
            return newState;
        case READ_BOARDS:
            newState = Object.assign({}, state);
            newState.boards = action.payload;
            return newState;
        case UPDATE_BOARD:
            newState = Object.assign({}, state);
            const boardIndex = newState.boards.findIndex(board => board.id === action.payload.id);
            newState.boards[boardIndex] = action.payload;
            return newState;
        case DELETE_BOARD:
            newState = Object.assign({}, state);
            newState.boards = newState.boards.filter(board => board.id !== action.payload.id);
            return newState;
        default:
            return state;
    }
};

export default boardsReducer;
