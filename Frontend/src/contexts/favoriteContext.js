import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { favorites: [] };

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'GET_FAVORITES':
            return { ...state, favorites: action.payload };

        default:
            return state;
    }
};

const getFavorites = dispatch => {
    return async () => {
        const getFavoritesResponse = await railsServer.get('/favorites');
        dispatch({ type: 'GET_FAVORITES', payload: getFavoritesResponse.data.favorites });
    };
};

export const { Context, Provider } = createDataContext(favoriteReducer, { getFavorites }, INITIAL_STATE);