import { combineReducers } from 'redux';

import user from './user.reducer.js';
import loggedIn from './loggedIn.reducer.js';
import applicationData from './applicationData.reducer.js';

export default combineReducers({
	user,
	loggedIn,
	applicationData
});
