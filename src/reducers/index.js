import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GamesReducer from './GamesReducer';
import UsersReducer from './UsersReducer';

const reducers = combineReducers({
	auth: AuthReducer,
	games: GamesReducer,
	users: UsersReducer,
});

export default reducers;
