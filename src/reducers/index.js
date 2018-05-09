import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
//import LoginReducer from './LoginReducer';
import DataAccessReducer from './DataAccessReducer';

const allReducers = combineReducers({
	user: UserReducer,
	dataaccess: DataAccessReducer
});

export default allReducers;