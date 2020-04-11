import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

INITIAL_STATE = { books: [] };

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return { ...state, books: action.payload };
            
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

export const { Context, Provider } = createDataContext(bookReducer, { getBooks }, INITIAL_STATE);