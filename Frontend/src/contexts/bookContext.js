import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

INITIAL_STATE = { books: [], showBook: {} };

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return { ...state, books: action.payload };
            
        case 'GET_SHOW_BOOK':
            return { ...state, showBook: action.payload };

        default:
            return state;
    }
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

export const { Context, Provider } = createDataContext(bookReducer, { getBooks, getShowBook }, INITIAL_STATE);