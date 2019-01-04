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
                function compare(a, b) {
                    if (a.nume < b.nume)
                        return -1;
                    if (a.nume > b.nume)
                        return 1;
                    return 0;
                }
                students.sort(compare)
                dispatch({
                    type: 'students',
                    payload: students
                })
            })
        firebase.database().ref(`/users/${currentUser.uid}/messages`)
            .on('value', (snapshot) => {
                if (snapshot.val()) {
                    dispatch({
                        type: 'messages',
                        payload: _.toArray(snapshot.val())
                    })
                }
            })
        firebase.database().ref(`/users/${currentUser.uid}/exams`)
            .on('value', (snapshot) => {
                function compare(a, b) {
                    if (a.year < b.year)
                        return -1;
                    if (a.year > b.year)
                        return 1;
                    if (a.year === b.year) {
                        if (a.month < b.month)
                            return -1;
                        if (a.month > b.month)
                            return 1;
                        if (a.month === b.month) {
                            if (a.day < b.day)
                                return -1;
                            if (a.day > b.day)
                                return 1;
                            return 0;
                        }
                    }
                }

                const exams = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                exams.sort(compare);
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
                    type: 'finishedStudents',
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
                dispatch({
                    type: 'info',
                    payload: snapshot.val()
                })
            })
    }

}