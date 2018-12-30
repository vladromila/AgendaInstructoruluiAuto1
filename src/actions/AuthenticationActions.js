import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'
import { LOGIN_START, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGIN_FAILED } from './types';

export const login = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            dispatch({ type: LOGIN_SUCCESS });
            dispatch(NavigationActions.navigate({ routeName: 'Main' }))
        })
            .catch(() => {
                alert('Emailul sau parola nu este valida')
                dispatch({ type: LOGIN_FAILED })
            })
    }
}
export const signup = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_START })
        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            dispatch({ type: SIGNUP_SUCCESS });
            dispatch(NavigationActions.navigate({ routeName: 'Main' }))
        })
            .catch(() => {
                alert('Emailul sau parola nu este valida')
                dispatch({ type: SIGNUP_FAILED })
            })
    }
}