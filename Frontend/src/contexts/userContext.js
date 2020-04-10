import railsServer from '../api/railsServer';
import createDataContext from './createDataContext';

const INITIAL_STATE = {user: {}};

const userReducer = ((state, action) => {
    switch (action.type) {
        case 'MODIFY_USER':
            return (
                { 
                    ...state,
                    user: action.payload
                }
            );

        case 'CLEAR_USER':
            return INITIAL_STATE;
        
        default: 
            return state;
    }
});

const signInUser = dispatch => {
    return async (username, password) => {
        try {
            const response = await railsServer.post('/login', { user: { username, password }});
            dispatch({ type: 'MODIFY_USER', payload: response.data.user });
            return true;
        } catch (error) {
            return false;
        }
    };
};

const signOutUser = dispatch => {
    return async () => dispatch({ type: 'CLEAR_USER' });
};

export const { Context, Provider } = createDataContext(userReducer, { signInUser, signOutUser }, INITIAL_STATE);