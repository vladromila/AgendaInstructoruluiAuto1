import firebase from 'firebase';
import { FETCH_START } from './types';
import _ from 'lodash'

export const fetchClassesFromLocalStorage = ({ classes, students }) => {
    return (dispatch) => {
        dispatch({
            type: 'classesLocal',
            payload: classes
        })
    }
}

export const fetchStudentsFromLocalStorage = ({ students }) => {
    return (dispatch) => {
        dispatch({
            type: 'studentsLocal',
            payload: students
        })
    }
}

export const fetchExamsFromLocalStorage = ({ exams }) => {
    return (dispatch) => {
        dispatch({
            type: 'examsLocal',
            payload: exams
        })
    }
}
export const fetchTheoryExamsFromLocalStorage = ({ exams }) => {
    return (dispatch) => {
        dispatch({
            type: 'theoryExamsLocal',
            payload: exams
        })
    }
}
export const fetchInStudentsFromLocalStorage = ({ inStudents }) => {
    return (dispatch) => {
        dispatch({
            type: 'inStudentsLocal',
            payload: inStudents
        })
    }
}

export const fetchFinishedStudentsFromLocalStorage = ({ finishedStudents }) => {
    return (dispatch) => {
        dispatch({
            type: 'finishedStudentsLocal',
            payload: finishedStudents
        })
    }
}
export const fetchRStudentsFromLocalStorage = ({ rStudents }) => {
    return (dispatch) => {
        dispatch({
            type: 'rStudentsLocal',
            payload: rStudents
        })
    }
}
export const fetchInfoFromLocalStorage = ({ info }) => {
    return (dispatch) => {
        dispatch({
            type: 'infoLocal',
            payload: info
        })
    }
}
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
        firebase.database().ref(`/users/${currentUser.uid}/theoryExams`)
            .on('value', (snapshot) => {
                function compare(a, b) {
                    if (new Date(a.date).getTime() < new Date(b.date).getTime())
                        return -1;
                    if (new Date(a.date).getTime() > new Date(b.date).getTime())
                        return 1;
                    if (new Date(a.date).getTime() == new Date(b.date).getTime())
                        return 1;
                }

                const exams = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                exams.sort(compare);
                dispatch({
                    type: 'theoryExams',
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
                function compare(a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                }
                rStudents.sort(compare)
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
                function compare(a, b) {
                    if (a.nume < b.nume)
                        return -1;
                    if (a.nume > b.nume)
                        return 1;
                    return 0;
                }
                inStudents.sort(compare)
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