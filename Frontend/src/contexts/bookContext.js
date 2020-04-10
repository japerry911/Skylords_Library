import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

INITIAL_STATE = { books: [] };

const bookReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const getBooks = dispatch => {};

export const { Context, Provider } = createDataContext(bookReducer, { getBooks }, INITIAL_STATE);