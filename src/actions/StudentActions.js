import firebase from 'firebase';
import { STUDENT_CREATE_START, STUDENT_CREATE_SUCCESS, STUDENT_EDIT_START, STUDENT_EDIT_SUCCESS, STUDENT_OH_DELETE, STUDENT_DELETE_START, STUDENT_DELETE_SUCCESS, STUDENT_IN_SUCCESS, STUDENT_IN_START, STUDENT_IN_FAIL, STUDENT_OH_IN, STUDENT_OH_INTOA, STUDENT_INTOA_START, STUDENT_INTOA_SUCCESS, STUDENT_INTOA_FAIL } from "./types";

export const studentCreate = ({ nume, phone, cnp, registru, serie, blob, generatedSds, generatedSdp }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_CREATE_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/`).push({ nume, phone, cnp, registru, serie, nrn: generatedSds.length, nrs: generatedSdp.length, nre: 0 })
            .then((link) => {
                generatedSds.forEach(ss => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${link.key}/doneClasses`)
                        .push({ ...ss, studentUid: link.key })
                        .then((classLink) => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${link.key}/doneClassesTotal/${classLink.key}`)
                                .set({ ...ss, studentUid: link.key })
                        })
                })
                generatedSdp.forEach(sp => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${link.key}/extraClasses`)
                        .push({ ...sp, studentUid: link.key })
                        .then((classLink) => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${link.key}/extraClassesTotal/${classLink.key}`)
                                .set({ ...sp, studentUid: link.key })
                        })
                })
                if (blob) {
                    firebase.storage().ref(`/images/users/${firebase.auth().currentUser.uid}/students/${link.key}`).put(blob)
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {
                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${link.key}/uri`).set(url)
                                    .then(() => {
                                        dispatch({ type: STUDENT_CREATE_SUCCESS })
                                        dispatch({ type: 'resetStudent' })
                                    })
                            })
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }
                else {
                    dispatch({ type: STUDENT_CREATE_SUCCESS })
                    dispatch({ type: 'resetStudent' })
                }
            })
    }
}

export const studentEdit = ({ uid, nume, phone, cnp, registru, serie, blob, student, generatedSds, generatedSdp }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_EDIT_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}`).set({ ...student, nume, phone, cnp, registru, serie, nrn: student.nrn + generatedSds.length, nrs: student.nrs + generatedSdp.length })
            .then(() => {
                generatedSds.forEach(ss => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}/doneClasses`)
                        .push({ ...ss, studentUid: uid })
                        .then((classLink) => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}/doneClassesTotal/${classLink.key}`)
                                .set({ ...ss, studentUid: uid })
                        })
                })
                generatedSdp.forEach(sp => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}/extraClasses`)
                        .push({ ...sp, studentUid: uid })
                        .then((classLink) => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}/extraClassesTotal/${classLink.key}`)
                                .set({ ...sp, studentUid: uid })
                        })
                })
                if (blob)
                    firebase.storage().ref(`/images/users/${firebase.auth().currentUser.uid}/students/${uid}`).put(blob)
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {
                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${uid}/uri`).set(url)
                                    .then(() => {
                                        dispatch({ type: STUDENT_EDIT_SUCCESS })
                                        dispatch({ type: 'resetStudent' })
                                    })
                            })
                        })
                else {
                    dispatch({ type: STUDENT_EDIT_SUCCESS })
                    dispatch({ type: 'resetStudent' })
                }
            })
    }
}

export const studentOHDeleteModal = () => {
    return ({
        type: STUDENT_OH_DELETE
    })
}
export const studentDelete = ({ student }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_DELETE_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`)
            .remove()
            .then(() => {
                if (student.uri)
                    firebase.storage().ref(`/images/users/${firebase.auth().currentUser.uid}/students/${student.uid}`).delete()
                        .then(() => {
                            dispatch({ type: STUDENT_DELETE_SUCCESS })
                            dispatch({ type: 'resetStudent' })
                        })
                else {
                    dispatch({ type: STUDENT_DELETE_SUCCESS })
                    dispatch({ type: 'resetStudent' })
                }
            })
    }
}

export const studentToInStudent = ({ student }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_IN_START })
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/inStudents/${student.uid}`).set({ ...student })
            .then(() => {
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`).remove()
                    .then(() => {
                        dispatch({ type: STUDENT_IN_SUCCESS })
                        dispatch({ type: 'resetStudent' })
                    })
                    .catch(() => {
                        dispatch({ type: STUDENT_IN_FAIL })
                    })
            })
            .catch(() => {
                dispatch({ type: STUDENT_IN_FAIL })
            })
    }
}

export const studentOHToInModal = () => {
    return ({ type: STUDENT_OH_IN });
}
export const studentOHInToAModal = () => {
    return ({ type: STUDENT_OH_INTOA });
}
export const studentInToA = ({ student, cs }) => {
    return (dispatch) => {
        dispatch({ type: STUDENT_INTOA_START, payload: cs });
        if (cs === 1)
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`).set({ ...student })
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/inStudents/${student.uid}`).remove()
                        .then(() => {
                            dispatch({ type: STUDENT_INTOA_SUCCESS })
                            dispatch({ type: 'resetStudent' })
                        })
                        .catch(() => {
                            dispatch({ type: STUDENT_INTOA_FAIL })
                        })
                })
                .catch(() => {
                    dispatch({ type: STUDENT_INTOA_FAIL })
                })
        else
            if (cs === 2)
                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${student.uid}`).set({ ...student, nrn: 15, extraClasses: {}, nrs: 0 })
                    .then(() => {
                        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/inStudents/${student.uid}`).remove()
                            .then(() => {
                                dispatch({ type: STUDENT_INTOA_SUCCESS })
                                dispatch({ type: 'resetStudent' })
                            })
                            .catch(() => {
                                dispatch({ type: STUDENT_INTOA_FAIL })
                            })
                    })
                    .catch(() => {
                        dispatch({ type: STUDENT_INTOA_FAIL })
                    })
    }
}