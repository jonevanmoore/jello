
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


// REDUCER
let initialState = { boards: [] };

const boardsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOARD:
            newState = Object.assign({}, state);
            newState.boards = action.payload;
            return newState;
        default:
            return state;
    }
};

export default boardsReducer;
