import { CLASS_CREATE_START, CLASS_CREATE_FAIL, CLASS_CREATE_SUCCESS, CLASS_EDIT_FAIL, CLASS_EDIT_SUCCESS, CLASS_EDIT_START, CLASS_CANCEL_DELETE_START, CLASS_CANCEL_DELETE_SUCCESS, CLASS_CANCEL_DELETE_FAIL, CLASS_CANCEL_OH_DELETE, CLASS_DELETE_START, CLASS_DELETE_SUCCESS, CLASS_DELETE_FAIL, CLASS_OH_DELETE } from "./types";
import firebase from 'firebase';

export const classCreate = ({ year, month, day, hour, minutes, tip, studentUid, location }) => {
    return (dispatch) => {
        dispatch({ type: CLASS_CREATE_START });
        if (tip === "normala") {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${studentUid}/nrn`).transaction(function (cnr) {
                return (cnr || 0) + 1;
            })
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/`)
                        .push({ year, month, day, hour, minutes, tip, studentUid, location })
                        .then(() => {
                            dispatch({ type: CLASS_CREATE_SUCCESS })
                            dispatch({ type: 'resetClass' })
                        })
                })
                .catch(() => {
                    dispatch({ type: CLASS_CREATE_FAIL })
                })
        }
        else {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${studentUid}/nrs`).transaction(function (cnr) {
                return (cnr || 0) + 1;
            })
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/`)
                        .push({ year, month, day, hour, minutes, tip, studentUid, location })
                        .then(() => {
                            dispatch({ type: CLASS_CREATE_SUCCESS })
                            dispatch({ type: 'resetClass' })
                        })
                })
                .catch(() => {
                    dispatch({ type: CLASS_CREATE_FAIL })
                })
        }

    }
}
export const classEdit = ({ year, month, day, hour, minutes, tip, studentUid, location, uid }) => {
    return (dispatch) => {
        dispatch({ type: CLASS_EDIT_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/${uid}`)
            .set({ year, month, day, hour, minutes, tip, studentUid, location })
            .then(() => {
                dispatch({ type: CLASS_EDIT_SUCCESS })
                dispatch({ type: 'resetClass' })
            })
            .catch(() => {
                dispatch({ type: CLASS_EDIT_FAIL });
            })
    }
}
export const classOHCancelDeleteModal = () => {
    return ({ type: CLASS_CANCEL_OH_DELETE });
}
export const classCancel = ({ uid, studentUid, tip }) => {
    return (dispatch) => {
        dispatch({ type: CLASS_CANCEL_DELETE_START });
        if (tip === "normala") {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${studentUid}/nrn`).transaction(function (cnr) {
                return (cnr || 0) - 1;
            })
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/${uid}`)
                        .remove()
                        .then(() => {
                            dispatch({ type: CLASS_CANCEL_DELETE_SUCCESS })
                            dispatch({ type: 'resetClass' })
                        })
                })
                .catch(() => {
                    dispatch({ type: CLASS_CANCEL_DELETE_FAIL })
                })
        }
        else {
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/students/${studentUid}/nrs`).transaction(function (cnr) {
                return (cnr || 0) - 1;
            })
                .then(() => {
                    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/${uid}`)
                        .remove()
                        .then(() => {
                            dispatch({ type: CLASS_CANCEL_DELETE_SUCCESS })
                            dispatch({ type: 'resetClass' })
                        })
                        .catch(() => {
                            dispatch({ type: CLASS_CANCEL_DELETE_FAIL })
                        })
                })
                .catch(() => {
                    dispatch({ type: CLASS_CANCEL_DELETE_FAIL })
                })
        }
    }
}
export const classOHDeleteModal = () => {
    return ({ type: CLASS_OH_DELETE});
}
export const classDelete = (uid) => {
    return (dispatch) => {
        dispatch({ type: CLASS_DELETE_START });
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/classes/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: CLASS_DELETE_SUCCESS })
                dispatch({ type: 'resetClass' })
            })
            .catch(() => {
                dispatch({ type: CLASS_DELETE_FAIL });
            })
    }
}
