import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { favorites: [] };

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'GET_FAVORITES':
            return { ...state, favorites: action.payload };

        case 'DELETE_FAVORITE': 
            const newFavorites = state.favorites.filter(favorite => favorite.id !== action.payload);
            return { ...state, favorites: newFavorites };

        case 'ADD_FAVORITE':
            const addFavorites = state.favorites;
            addFavorites.push(action.payload);
            return { ...state, favorites: addFavorites };

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

const deleteFavorite = dispatch => {
    return async id => {
        await railsServer.delete(`/favorites/${id}`);
        dispatch({ type: 'DELETE_FAVORITE', payload: id });
    };
};

const addFavorite = dispatch => {
    return async (bookId, userId) => {
        const addFavoriteResponse = await railsServer.post('/favorites', { favorite: { book_id: bookId, user_id: userId }});
        dispatch({ type: 'ADD_FAVORITE', payload: addFavoriteResponse.data.favorite });
    };
};

export const { Context, Provider } = createDataContext(favoriteReducer, { getFavorites, deleteFavorite, addFavorite }, INITIAL_STATE);