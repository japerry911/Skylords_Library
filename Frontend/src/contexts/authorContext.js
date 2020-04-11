import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { authors: [] };

const authorReducer = (state, action) => {
    switch (action.type) {
        default: 
            return state;
    }
};

const getAuthors = dispatch => {
    return async () => {
        dispatch({ type: 'GET_AUTHORS' });
    };
};

export const { Context, Provider } = createDataContext(authorReducer, { getAuthors }, INITIAL_STATE);