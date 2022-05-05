
//CONSTANTS
const CREATE_BOARD = 'boards/CREATE_BOARD';
const READ_BOARDS = 'boards/READ_BOARDS';
const READ_ONE_BOARD = 'boards/READ_ONE_BOARD';
const UPDATE_BOARD = 'boards/UPDATE_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

// ACTIONS
const createBoardAction = board => ({ 
    type: CREATE_BOARD, 
    payload: board  
});

const readBoardsAction = boards =>( {
    type: READ_BOARDS,
    payload: boards
});

const readOneBoardAction = board => ({
    type: READ_ONE_BOARD,
    payload: board
});

const updateBoardAction = board => ({
    type: UPDATE_BOARD,
    payload: board
});

const deleteBoardAction = board => ({
    type: DELETE_BOARD,
    payload: board
});

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
    const response = await fetch("/api/boards/");

    if (response.ok) {
        const data = await response.json();
        dispatch(readBoardsAction(data));
        return data;
    }
};

export const readOneBoard = (id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(readOneBoardAction(data));
        return data;
    };
};

export const updateBoard = (board, id) => async dispatch => {
    try {
        const response = await fetch(`/api/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
let initialState = { };

const boardsReducer = (state = initialState, action) => {
//    console.log("ACTION.PAYLOAD>>>>>>>>>>", action.payload);
    let newState = {...state};
    switch (action.type) {
        case CREATE_BOARD:
            newState[action.payload.id] = action.payload;
            return newState;
        case READ_BOARDS: // this includes lists and cards
            action.payload.boards.forEach(b => newState[b.id] = b )
            return newState;
        case READ_ONE_BOARD: // this includes lists and cards
            newState[action.payload.id] = action.payload;
            return newState;
        case UPDATE_BOARD:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_BOARD:
            delete newState[action.payload.id]
            return newState;
        default:
            return state;
    }
};

export default boardsReducer;
