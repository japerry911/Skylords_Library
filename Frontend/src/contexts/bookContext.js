import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

INITIAL_STATE = { books: [], showBook: {} };

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return { ...state, books: action.payload };
            
        case 'GET_SHOW_BOOK':
            return { ...state, showBook: action.payload };

        case 'CLEAR_SHOW_BOOK':
            return { ...state, showBook: {} };

        default:
            return state;
    }
};

const clearShowBook = dispatch => {
    return async () => dispatch({ type: 'CLEAR_SHOW_BOOK' });
};

const getBooks = dispatch => {
    return async () => {
        const getBooksResponse = await railsServer.get('/books');
        dispatch({ type: 'GET_BOOKS', payload: getBooksResponse.data.books })
    };
};

const getShowBook = dispatch => {
    return async (bookId) => {
        const showBookResponse = await railsServer.get(`/books/${bookId}`);
        dispatch({ type: 'GET_SHOW_BOOK', payload: showBookResponse.data });
    };
};

export const { Context, Provider } = createDataContext(bookReducer, { getBooks, getShowBook, clearShowBook }, INITIAL_STATE);