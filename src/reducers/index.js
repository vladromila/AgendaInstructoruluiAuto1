import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import FetchDataReducer from './FetchDataReducer';

export default combineReducers({
    AuthenticationReducer: AuthenticationReducer,
    FetchedData: FetchDataReducer
});