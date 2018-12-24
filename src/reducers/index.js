import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import FetchDataReducer from './FetchDataReducer';
import StudentReducer from './StudentReducer';

export default combineReducers({
    AuthenticationReducer: AuthenticationReducer,
    FetchedData: FetchDataReducer,
    StudentsReducer: StudentReducer
});