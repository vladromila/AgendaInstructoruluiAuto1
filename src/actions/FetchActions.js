import firebase from 'firebase';
import { FETCH_START } from './types';
import _ from 'lodash'

export const fetchData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: FETCH_START })
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', (snapshot) => {
                const classes = _.map(snapshot.val().classes, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'classes',
                    payload: classes
                })
                const students = _.map(snapshot.val().students, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'students',
                    payload: students
                })
                const exams = _.map(snapshot.val().exams, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'exams',
                    payload: exams
                })
                const canceledClasses = _.map(snapshot.val().canceledClasses, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'canceledClasses',
                    payload: canceledClasses
                })
                const finishedStudents = _.map(snapshot.val().finishedStudents, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'finisedStudents',
                    payload: finishedStudents
                })
                const rStudents = _.map(snapshot.val().rStudents, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'rStudents',
                    payload: rStudents
                })
                const inStudents = _.map(snapshot.val().inStudents, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'inStudents',
                    payload: inStudents
                })
                const info = _.map(snapshot.val().info, (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'info',
                    payload: info
                })
            })
    }
}