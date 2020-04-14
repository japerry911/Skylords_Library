import railsServer from '../api/railsServer';
import createDataContext from './createDataContext';

const INITIAL_STATE = { reviews: [], fiveMostRecentReviews: [] };

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'GET_REVIEWS':
            return { ...state, reviews: action.payload };
        
        case 'ADD_REVIEW':
            const newReviewsList = state.reviews;
            newReviewsList.push(action.payload);
            return { ...state, reviews: newReviewsList };

        case 'PULL_FIVE_MOST_RECENT_REVIEWS':
            return { ...state, fiveMostRecentReviews: action.payload };

        case 'DELETE_REVIEW':
            const updatedReviewsList = state.reviews.filter(review => review.id !== action.payload);
            return { ...state, reviews: updatedReviewsList };

        default:
            return state;
    }
};

const getReviews = dispatch => {
    return async token => {
        const getReviewsResponse = await railsServer.get('/reviews', { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'GET_REVIEWS', payload: getReviewsResponse.data.reviews });
    };
};

const addReview = dispatch => {
    return async (token, bookId, userId, rating, description) => {
        const addReviewResponse = await railsServer.post('/reviews', { review: { book_id: bookId, user_id: userId, rating, description }},
            { headers: { Authorization: `Bearer ${token}` }},);
        dispatch({ type: 'ADD_REVIEW', payload: addReviewResponse.data.review });
    };
};

const deleteReview = dispatch => {
    return async (token, id) => {
        await railsServer.delete(`/reviews/${id}`, { headers: { Authorization: `Bearer ${token}` }});
        dispatch({ type: 'DELETE_REVIEW', payload: id });
    };
};

const pullFiveMostRecentReviews = dispatch => {
    return async token => {
        const fiveMostRecentReviewsResponse = await railsServer.get('/most_recent_five_reviews', {
            headers: { Authorization: `Bearer ${token}`}
        });
        dispatch({ type: 'PULL_FIVE_MOST_RECENT_REVIEWS', payload: fiveMostRecentReviewsResponse.data.reviews });
    };
};

export const { Context, Provider } = createDataContext(reviewReducer, { addReview, pullFiveMostRecentReviews, getReviews, deleteReview }, 
    INITIAL_STATE);