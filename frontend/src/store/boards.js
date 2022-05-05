
//BOARD CONSTANTS
const CREATE_BOARD = 'boards/CREATE_BOARD';
const READ_BOARDS = 'boards/READ_BOARDS';
const READ_ONE_BOARD = 'boards/READ_ONE_BOARD';
const UPDATE_BOARD = 'boards/UPDATE_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

// BOARD ACTIONS
const createBoardAction = board => ({ 
    type: CREATE_BOARD, 
    board  
});

const readBoardsAction = boards =>( {
    type: READ_BOARDS,
    boards
});

const readOneBoardAction = board => ({
    type: READ_ONE_BOARD,
    board
});

const updateBoardAction = board => ({
    type: UPDATE_BOARD,
    board
});

const deleteBoardAction = board => ({
    type: DELETE_BOARD,
    board
});

// BOARD THUNKS
export const createBoard = board => async dispatch => {
    const response = await fetch('/api/boards/new-board', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(board)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const readBoards = () => async dispatch => {
    const response = await fetch("/api/boards/");

    const data = await response.json();

    if (response.ok) {
        await dispatch(readBoardsAction(data.boards));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const readOneBoard = (id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`);

    const data = await response.json();

    if (response.ok) {
        await dispatch(readOneBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const updateBoard = (board, id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const deleteBoard = board => async dispatch => {
    const response = await fetch(`/api/boards/${board.id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};


// LIST CONSTANTS
const CREATE_LIST = 'boards/CREATE_LIST';
const UPDATE_LIST = 'boards/UPDATE_LIST';
const DELETE_LIST = 'boards/DELETE_LIST';

// LIST ACTIONS
const createListAction = list => ({
    type: CREATE_LIST,
    list
});

const updateListAction = list => ({
    type: UPDATE_LIST,
    list
});

const deleteListAction = list => ({
    type: DELETE_LIST,
    list
});

// LIST THUNKS
export const createList = list => async dispatch => {
    const response = await fetch(`/api/boards/${list.board_id}/lists`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createListAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export cost updateList = list => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(list)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateListAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export cost deleteList = list => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`,{
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteListAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

// REDUCER
let initialState = { };

const boardsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case CREATE_BOARD:
            newState[action.board.id] = action.board;
            return newState;
        case READ_BOARDS: // this includes lists and cards
            action.boards.forEach(b => newState[b.id] = b )
            return newState;
        case READ_ONE_BOARD: // this includes lists and cards
            newState[action.board.id] = action.board;
            return newState;
        case UPDATE_BOARD:
            newState[action.board.id] = action.board;
            return newState;
        case DELETE_BOARD:
            delete newState[action.board.id]
            return newState;
        case CREATE_LIST:{
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            newState[board_id] = {...board};
            newState[board_id].lists = [...lists, action.list]
            return newState;
        }
        case UPDATE_LIST:{
            let list_id = action.list.id
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            let index = lists.findIndex(list => list.id === action.list.id) // WOW!!!!
            lists[index] = action.list; 
            newState[board_id] = {...board};
            newState[board_id].lists = [...lists];
            return newState;
        }
        case DELETE_LIST:{
            let list_id = action.list.id
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            let index = lists.findIndex(list => list.id === action.list.id) // WOW!!!!
            lists.splice(index, 1); // remove 1 element starting at index
            newState[board_id] = {...board};
            newState[board_id].lists = [...lists];
            return newState;
        }
        default:
            return state;
    }
};

export default boardsReducer;
