import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { authors: [] };

const authorReducer = (state, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return { ...state, authors: action.payload };

        case 'ADD_AUTHOR':
            const newAuthors = state.authors;
            newAuthors.push(action.payload);
            return { ...state, authors: newAuthors };

        default: 
            return state;
    }
};

const getAuthors = dispatch => {
    return async token => {
        const getAuthorsResponse = await railsServer.get('/authors', { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'GET_AUTHORS', payload: getAuthorsResponse.data.authors });
    };
};

const addAuthor = dispatch => {
    return async (token, name) => {
        const addAuthorResponse = await railsServer.post('/authors', { author: { name }, headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'ADD_AUTHOR', payload: addAuthorResponse.data.author });
        return addAuthorResponse.data.author.id;
    };
};

export const { Context, Provider } = createDataContext(authorReducer, { getAuthors, addAuthor }, INITIAL_STATE);