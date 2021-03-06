import railsServer from '../api/railsServer';
import createDataContext from './createDataContext';

const INITIAL_STATE = {user: {}};

const userReducer = ((state, action) => {
    switch (action.type) {
        case 'MODIFY_USER':
            return { ...state, user: action.payload }

        case 'CLEAR_USER':
            return INITIAL_STATE;

        case 'ADD_USER':
            return state;

        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        
        default: 
            return state;
    }
});

const signUpUser = dispatch => {
    return async (username, age, email, phone, password) => {
        await railsServer.post('/users', { user: { username, age, email, phone, password }});
        dispatch({ type: 'ADD_USER' });
    };
};

const signInUser = dispatch => {
    return async (username, password) => {
        try {
            const signInResponse = await railsServer.post('/login', { user: { username, password }});
            dispatch({ type: 'MODIFY_USER', payload: signInResponse.data.user });
            return true;
        } catch (error) {
            return false;
        }
    };
};

const signOutUser = dispatch => {
    return async () => dispatch({ type: 'CLEAR_USER' });
};

const updateUser = dispatch => {
    return async (id, token, age, email, phone, password) => {
        const updateUserResponse = await railsServer.put(`/users/${id}`, { user: { age, email, phone, password }}, 
        { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'UPDATE_USER', payload: { ...updateUserResponse.data.user, token }});
    }
};

export const { Context, Provider } = createDataContext(userReducer, { signInUser, signOutUser, signUpUser, updateUser }, 
    INITIAL_STATE);