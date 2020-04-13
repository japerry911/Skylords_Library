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

        case 'ADD_BOOK':
            const newBooks = state.books;
            newBooks.push(action.payload);
            return { ...state, books: newBooks };

        default:
            return state;
    }
};

const clearShowBook = dispatch => {
    return async () => dispatch({ type: 'CLEAR_SHOW_BOOK' });
};

const getBooks = dispatch => {
    return async token => {
        const getBooksResponse = await railsServer.get('/books', { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'GET_BOOKS', payload: getBooksResponse.data.books })
    };
};

const getShowBook = dispatch => {
    return async (token, bookId) => {
        const showBookResponse = await railsServer.get(`/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'GET_SHOW_BOOK', payload: showBookResponse.data });
    };
};

const addBook = dispatch => {
    return async (token, title, authorId, description, imageUrl) => {
        const addBookResponse = await railsServer.post('/books', {book: { title, author_id: authorId, description, image_url: imageUrl }},
            { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'ADD_BOOK', payload: addBookResponse.data.book });
        return addBookResponse.data.book.id;
    };
};

export const { Context, Provider } = createDataContext(bookReducer, { getBooks, getShowBook, clearShowBook, addBook }, INITIAL_STATE);