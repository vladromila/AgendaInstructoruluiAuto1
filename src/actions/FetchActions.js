import firebase from 'firebase';
import { FETCH_START } from './types';
import _ from 'lodash'

export const fetchData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: FETCH_START })
        firebase.database().ref(`/users/${currentUser.uid}/classes`)
            .on('value', (snapshot) => {
                const classes = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'classes',
                    payload: classes
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/students`)
            .on('value', (snapshot) => {
                const students = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'students',
                    payload: students
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/exams`)
            .on('value', (snapshot) => {
                const exams = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'exams',
                    payload: exams
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/finishedStudents`)
            .on('value', (snapshot) => {
                const finishedStudents = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });

                dispatch({
                    type: 'finisedStudents',
                    payload: finishedStudents
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/rStudents`)
            .on('value', (snapshot) => {
                const rStudents = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'rStudents',
                    payload: rStudents
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/inStudents`)
            .on('value', (snapshot) => {
                const inStudents = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: 'inStudents',
                    payload: inStudents
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/info`)
            .on('value', (snapshot) => {
                const info = snapshot.val();
                dispatch({
                    type: 'info',
                    payload: info
                })
            })
    }

}