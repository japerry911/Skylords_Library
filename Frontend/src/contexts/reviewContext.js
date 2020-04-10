import railsServer from '../api/railsServer';
import createDataContext from './createDataContext';

const INITIAL_STATE = { twoMostRecentReviews: [] };

const reviewReducer = (state, action) => {};

export const { Context, Provider } = createDataContext(reviewReducer, {}, INITIAL_STATE);