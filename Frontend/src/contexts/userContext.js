import { createContext } from 'react';

const userContext = createContext({user: {}});

const userReducer = ((state, action) => {
    switch (action.type) {
        case 'MODIFY_CURRENT_USER':
            return (
                { 
                    ...state,
                    user: action.payload
                }
            );
        
        default: 
            return state;
    }
});

export {
    userContext
};