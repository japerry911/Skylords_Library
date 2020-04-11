import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { authors: [] };

const authorReducer = (state, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return { ...state, authors: action.payload };

        default: 
            return state;
    }
};

const getAuthors = dispatch => {
    return async () => {
        const getAuthorsResponse = await railsServer.get('/authors');
        dispatch({ type: 'GET_AUTHORS', payload: getAuthorsResponse.data.authors });
    };
};

export const { Context, Provider } = createDataContext(authorReducer, { getAuthors }, INITIAL_STATE);