import firebase from 'firebase';
import { EXAM_CREATE_START, EXAM_CREATE_SUCCESS } from './types';

export const examCreate = ({ day, month, year }) => {
    return (dispatch) => {
        dispatch({ type: EXAM_CREATE_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/`)
            .push({ day, month, year })
            .then(() => {
                dispatch({ type: EXAM_CREATE_SUCCESS });
            })
    }
}