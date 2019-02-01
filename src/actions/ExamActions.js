import firebase from 'firebase';
import { EXAM_CREATE_START, EXAM_CREATE_SUCCESS, EXAM_ADDC_START, EXAM_ADDC_SUCCESS, EXAM_EDIT_START, EXAM_EDIT_SUCCESS, EXAM_OH_DELETE, EXAM_DELETE_SUCCESS, EXAM_DELETE_START, EXAM_OH_DELETE1 } from './types';

export const examCreate = ({ day, month, year, examedStudents }) => {
    return (dispatch) => {
        dispatch({ type: EXAM_CREATE_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/`)
            .push({ day, month, year, examedStudents })
            .then(() => {
                dispatch({ type: EXAM_CREATE_SUCCESS });
                dispatch({ type: 'resetExam' });
            })
    }
}

export const examEdit = ({ day, month, year, examedStudents, uid }) => {
    return (dispatch) => {
        dispatch({ type: EXAM_EDIT_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${uid}`)
            .set({ day, month, year, examedStudents })
            .then(() => {
                dispatch({ type: EXAM_EDIT_SUCCESS });
                dispatch({ type: 'resetExam' });
            })
    }
}

export const examOHDelete = () => {
    return ({ type: EXAM_OH_DELETE })
}

export const examOHDelete1 = () => {
    return ({ type: EXAM_OH_DELETE1 })
}

export const examAddC = ({ student, exam, examedStudentData, id, calificativ, politist }) => {
    return (dispatch) => {
        dispatch({ type: EXAM_ADDC_START });
        if (calificativ === "admis") {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${exam.uid}/examedStudents/${id}/progress/`)
                .set("admis")
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/finishedStudents/${student.uid}`)
                        .set({ ...student, examData: { day: exam.day, month: exam.month, year: exam.year, incercare: examedStudentData.nre + 1, numePolitist: politist } })
                        .then(() => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/aTotal/count`).transaction(cc => {
                                return (cc || 0) + 1;
                            })
                                .then(() => {
                                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/aTotal/list/${student.uid}`)
                                        .set({ ...examedStudentData, day: exam.day, month: exam.month, year: exam.year, incercare: examedStudentData.nre + 1, numePolitist: politist })
                                        .then(() => {
                                            if (examedStudentData.nre === 0) {
                                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/firstTryA/count/`)
                                                    .transaction((cc) => {
                                                        return (cc || 0) + 1;
                                                    })
                                                    .then(() => {
                                                        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/firstTryA/list/${student.uid}`)
                                                            .set({ ...examedStudentData, day: exam.day, month: exam.month, year: exam.year, incercare: examedStudentData.nre + 1, numePolitist: politist })
                                                            .then(() => {
                                                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`)
                                                                    .remove()
                                                                    .then(() => {
                                                                        let k = 0;
                                                                        exam.examedStudents.forEach(examd => {
                                                                            if (examd.progress === "pending")
                                                                                k++;
                                                                        })
                                                                        if (k <= 1) {
                                                                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${exam.uid}`)
                                                                                .remove()
                                                                                .then(() => {
                                                                                    dispatch({ type: EXAM_ADDC_SUCCESS });
                                                                                    dispatch({ type: 'resetExam' });
                                                                                })
                                                                        }
                                                                        else {
                                                                            dispatch({ type: EXAM_ADDC_SUCCESS });
                                                                            dispatch({ type: 'resetExam' });
                                                                        }
                                                                    })
                                                            })
                                                    })
                                            }
                                            else
                                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`)
                                                    .remove()
                                                    .then(() => {
                                                        let k = 0;
                                                        exam.examedStudents.forEach(examd => {
                                                            if (examd.progress === "pending")
                                                                k++;
                                                        })
                                                        if (k <= 1) {
                                                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${exam.uid}`)
                                                                .remove()
                                                                .then(() => {
                                                                    dispatch({ type: EXAM_ADDC_SUCCESS });
                                                                    dispatch({ type: 'resetExam' });
                                                                })
                                                        }
                                                        else {
                                                            dispatch({ type: EXAM_ADDC_SUCCESS });
                                                            dispatch({ type: 'resetExam' });
                                                        }
                                                    })
                                        })
                                })


                        })
                })
        }
        else {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${exam.uid}/examedStudents/${id}/progress/`)
                .set("respins")
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/rStudents/${student.uid}/name`)
                        .set(student.nume)
                        .then(() => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/rStudents/${student.uid}/attempts/${exam.uid}`)
                                .set({ day: exam.day, month: exam.month, year: exam.year, numePolitist: politist })
                                .then(() => {
                                    let k = 0;
                                    exam.examedStudents.forEach(examd => {
                                        if (examd.progress === "pending")
                                            k++;
                                    })
                                    if (k <= 1) {
                                        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${exam.uid}`)
                                            .remove()
                                            .then(() => {
                                                dispatch({ type: EXAM_ADDC_SUCCESS });
                                                dispatch({ type: 'resetExam' });
                                            })
                                    }
                                    else {
                                        dispatch({ type: EXAM_ADDC_SUCCESS });
                                        dispatch({ type: 'resetExam' });
                                    }
                                })
                        })
                })
        }
    }
}

export const examDelete = (uid) => {
    return (dispatch) => {
        dispatch({ type: EXAM_DELETE_START })
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/exams/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: EXAM_DELETE_SUCCESS });
                dispatch({ type: 'resetExam' })
            })
    }
}