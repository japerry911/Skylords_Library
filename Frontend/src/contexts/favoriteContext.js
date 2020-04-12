import createDataContext from './createDataContext';
import railsServer from '../api/railsServer';

const INITIAL_STATE = { favorites: [] };

const favoriteReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const { Context, Provider } = createDataContext(favoriteReducer, {}, INITIAL_STATE);