import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import FetchDataReducer from './FetchDataReducer';
import StudentsReducer from './StudentsReducer';
import GlobalVariables from './GlobalVariables';
import ClassesReducer from './ClassesReducer';
import ExamsReducer from './ExamsReducer';

export default combineReducers({
    AuthenticationReducer: AuthenticationReducer,
    FetchedData: FetchDataReducer,
    StudentsReducer: StudentsReducer,
    GlobalVariablesReducer: GlobalVariables,
    ClassesReducer: ClassesReducer,
    ExamsReducer: ExamsReducer
});