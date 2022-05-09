
//BOARD CONSTANTS
const CREATE_BOARD   = 'boards/CREATE_BOARD';
const READ_BOARDS    = 'boards/READ_BOARDS';
const READ_ONE_BOARD = 'boards/READ_ONE_BOARD';
const UPDATE_BOARD   = 'boards/UPDATE_BOARD';
const DELETE_BOARD   = 'boards/DELETE_BOARD';
const CLEAR_BOARDS   = 'boards/CLEAR_BOARDS';
const SHARE_BOARD    = 'boards/SHARE_BOARD';
const REVOKE_BOARD   = 'boards/REVOKE_BOARD';

// BOARD ACTIONS
const createBoardAction = board => ({
    type: CREATE_BOARD,
    board
});

const readBoardsAction = boards => ({
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

const clearBoardsAction = () => ({
    type: CLEAR_BOARDS
})

const shareBoardAction = (boardId, user) => ({
    type: SHARE_BOARD,
    boardId,
    user
})

const revokeBoardAction = (boardId, userId, currentUserId) => ({
    type: REVOKE_BOARD,
    boardId,
    userId,
    currentUserId
})

// BOARD THUNKS
export const createBoard = board => async dispatch => {
    const response = await fetch('/api/boards/new-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

// this is called on logout
export const clearBoards = () => async dispatch => {
    await dispatch(clearBoardsAction());
};

export const updateListOrder = (boardId, listOrder) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}/list-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listOrder })
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(readOneBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};


export const updateCardOrder = (boardId, cardOrder) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}/card-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardOrder })
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(readOneBoardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const shareBoard = (email, boardId) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}/sharing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, boardId })
    })

    const data = await response.json();

    if (response.ok) {
        await dispatch(shareBoardAction(boardId, data));
        return data;
    } else {
        console.log(data.errors)
    }
}

export const revokeBoard = (boardId, userId, currentUserId) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}/sharing/${userId}`,{
      method: 'DELETE'
    })

    const data = await response.json();

    if (response.ok) {
      await dispatch(revokeBoardAction(boardId, userId, currentUserId))
      return data;
    } else {
      console.log(data.errors);
    }
}

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
        headers: { 'Content-Type': 'application/json' },
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

export const updateList = list => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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

export const deleteList = list => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`, {
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

// CARD CONSTANTS
const CREATE_CARD = 'boards/CREATE_CARD';
const UPDATE_CARD = 'boards/UPDATE_CARD';
const DELETE_CARD = 'boards/DELETE_CARD';

// CARD ACTIONS
const createCardAction = card => ({
    type: CREATE_CARD,
    card
});

const updateCardAction = card => ({
    type: UPDATE_CARD,
    card
});

const deleteCardAction = card => ({
    type: DELETE_CARD,
    card
});

// CARD THUNKS
export const createCard = card => async dispatch => {
    const response = await fetch(`/api/lists/${card.list_id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
    });

    const data = await response.json()

    if (response.ok) {
        await dispatch(createCardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const updateCard = card => async dispatch => {
    const response = await fetch(`/api/cards/${card.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(updateCardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};

export const deleteCard = card => async dispatch => {
    const response = await fetch(`/api/cards/${card.id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteCardAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
};


// COMMENT CONSTANTS
const CREATE_COMMENT = 'boards/CREATE_COMMENT'
const DELETE_COMMENT = 'boards/DELETE_COMMENT'

// COMMENT ACTIONS
const createCommentAction = comment => ({
    type: CREATE_COMMENT,
    comment
})

const deleteCommentAction = comment => ({
    type: DELETE_COMMENT,
    comment
})

// COMMENT THUNKS
export const createComment = comment => async dispatch => {
    const response = await fetch(`/api/cards/${comment.card_id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });

    const data = await response.json();

    if (response.ok) {
        await dispatch(createCommentAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
}

export const deleteComment = comment => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE'
    })

    const data = await response.json();

    if (response.ok) {
        await dispatch(deleteCommentAction(data));
        return data;
    } else {
        console.log(data.errors);
    }
}

// REDUCER
let initialState = {};

const boardsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case CREATE_BOARD:
            newState[action.board.id] = action.board;
            return newState;
        case READ_BOARDS: // this includes lists and cards
            action.boards.forEach(b => newState[b.id] = b)
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
        case CLEAR_BOARDS:
            return {};
        case SHARE_BOARD: {
            let board_id = action.boardId;
            let board = newState[board_id];
            let shared_users = board.shared_users;
            newState[board_id] = { ...board };
            newState[board_id].shared_users = [...shared_users, action.user]
            return newState;
        }
        case REVOKE_BOARD: {
            let board_id = action.boardId;
            let board = newState[action.boardId]; 
            let shared_users = board.shared_users;
            let newSharedUsers = [];
            shared_users.forEach( user => {
              if(user.id !== +action.userId) newSharedUsers.push(user) 
            })
            newState[board_id] = { ...board };
            newState[board_id].shared_users = newSharedUsers;
            if (+action.userId === +action.currentUserId){
              delete newState[board_id];
            }
            return newState;
        }
        case CREATE_LIST: {
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            newState[board_id] = { ...board };
            newState[board_id].lists = [...lists, action.list]
            return newState;
        }
        case UPDATE_LIST: {
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            let index = lists.findIndex(list => list.id === action.list.id) // WOW!!!!
            lists[index] = action.list;
            newState[board_id] = { ...board };
            newState[board_id].lists = [...lists];
            return newState;
        }
        case DELETE_LIST: {
            let board_id = action.list.board_id
            let board = newState[board_id];
            let lists = board.lists;
            let index = lists.findIndex(list => list.id === action.list.id) // WOW!!!!
            lists.splice(index, 1); // remove 1 element starting at index
            newState[board_id] = { ...board };
            newState[board_id].lists = [...lists];
            return newState;
        }
        case CREATE_CARD: {
            let board_id = action.card.list.board_id;
            let board = newState[board_id];
            let list = board.lists.find(list => list.id === action.card.list.id);
            list.cards = [...list.cards, action.card];
            board.lists = [...board.lists];
            newState[board_id] = { ...board };
            return newState;
        }
        case UPDATE_CARD: {
            let board_id = action.card.list.board_id;
            let board = newState[board_id];
            let list = board.lists.find(list => list.id === action.card.list.id);
            let index = list.cards.findIndex(card => card.id === action.card.id);
            list.cards[index] = action.card;
            list.cards = [...list.cards];
            board.lists = [...board.lists];
            newState[board_id] = { ...board };
            return newState;
        }
        case DELETE_CARD: {
            let board_id = action.card.board_id;
            let board = newState[board_id];
            let list = board.lists.find(list => list.id === action.card.list_id);
            let index = list.cards.findIndex(card => card.id === action.card.id);
            list.cards.splice(index, 1); // removal of card
            list.cards = [...list.cards];
            board.lists = [...board.lists];
            newState[board_id] = { ...board };
            return newState;
        }
        case CREATE_COMMENT: {
            let board_id = action.comment.board_id; //note this is only from Comment.to_dict()
            let board = newState[board_id];
            let list = board.lists.find(list => list.id === action.comment.card.list_id); // oh no
            let card = list.cards.find(card => card.id === action.comment.card_id);
            card.comments = [...card.comments, action.comment]; // add comment
            list.cards = [...list.cards];
            board.lists = [...board.lists];
            newState[board_id] = { ...board };
            return newState;
        }
        case DELETE_COMMENT: {
            let board_id = action.comment.board_id; //note this is only from Comment.to_dict()
            let board = newState[board_id];
            let list = board.lists.find(list => list.id === action.comment.list_id); // oh no
            let card = list.cards.find(card => card.id === action.comment.card_id);
            let index = card.comments.findIndex(comment => comment.id === action.comment.id);
            card.comments.splice(index, 1); // remove comment
            card.comments = [...card.comments];
            list.cards = [...list.cards];
            board.lists = [...board.lists];
            newState[board_id] = { ...board };
            return newState;
        }
        default:
            return state;
    }
};

export default boardsReducer;
