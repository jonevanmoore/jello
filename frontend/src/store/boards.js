
//CONSTANTS
const CREATE_BOARD = 'boards/CREATE_BOARD';
const READ_BOARDS = 'boards/READ_BOARDS';
const READ_ONE_BOARD = 'boards/READ_ONE_BOARD';
const UPDATE_BOARD = 'boards/UPDATE_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

// const DISPLAY_MODAL_NEW_BOARDS_FORM = 'boards/DISPLAY_MODAL_NEW_BOARDS_FORM';


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

const readOneBoardAction = board => {
    return {
        type: READ_ONE_BOARD,
        payload: board
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

//  D I S P L A Y   M O D A L   B O A R D S   F O R M
// export const displayModalNewBoardForm = () => {
//     return (dispatch, getState) => {
//         const shouldDisplayNewBoardForm = getState().boards.shouldDisplayNewBoardForm;

//         return dispatch({
//             type: DISPLAY_MODAL_NEW_BOARDS_FORM,
//             shouldDisplayNewBoardForm: !shouldDisplayNewBoardForm
//         });
//     };
// };

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
let initialState = { boards: [] };

const boardsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOARD:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case READ_BOARDS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case READ_ONE_BOARD:
            newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        case UPDATE_BOARD:
            newState = Object.assign({}, state);
            const boardIndex = newState.boards.findIndex(board => board.id === action.payload.id);
            newState[boardIndex] = action.payload;
            return newState;
        case DELETE_BOARD:
            newState = Object.assign({}, state);
            newState = newState.boards.filter(board => board.id !== action.payload.id);
            return newState;
        // case DISPLAY_MODAL_NEW_BOARDS_FORM:
        //     newState = Object.assign({}, state);
        //     newState.shouldDisplayNewBoardForm = action.shouldDisplayNewBoardForm;
        //     return newState;
        default:
            return state;
    }
};

export default boardsReducer;
