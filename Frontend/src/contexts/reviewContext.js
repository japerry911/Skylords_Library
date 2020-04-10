import railsServer from '../api/railsServer';
import createDataContext from './createDataContext';

const INITIAL_STATE = { twoMostRecentReviews: [] };

const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            console.log('here');
            console.log(state);
            const newTwoMostRecentReviews = state.twoMostRecentReviews;
            newTwoMostRecentReviews.pop();
            newTwoMostRecentReviews.push(action.payload);
            return { ...state, twoMostRecentReviews: newTwoMostRecentReviews };

        case 'PULL_TWO_MOST_RECENT_REVIEWS':
            return { ...state, twoMostRecentReviews: action.payload };

        default:
            return state;
    }
};

const addReview = dispatch => {
    return async (bookId, userId, rating, description) => {
        const addReviewResponse = await railsServer.post('/reviews', { review: { book_id: bookId, user_id: userId, rating, description }});
        const data = addReviewResponse.data;
        dispatch({ type: 'ADD_REVIEW', payload: { user: data.review.user, book: data.review.book, review: data.review }});
    };
};

const pullTwoMostRecentReviews = dispatch => {
    return async () => {
        const twoMostRecentReviewsResponse = await railsServer.get('/most_recent_two_reviews');
        dispatch({ type: 'PULL_TWO_MOST_RECENT_REVIEWS', payload: twoMostRecentReviewsResponse.data.reviews });
    };
};

export const { Context, Provider } = createDataContext(reviewReducer, { addReview, pullTwoMostRecentReviews }, INITIAL_STATE);