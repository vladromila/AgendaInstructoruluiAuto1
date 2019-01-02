import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'
import { LOGIN_START, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, LOGIN_FAILED, LOGIN_WITH_FACEBOOK_SUCCESS, LOGIN_WITH_FACEBOOK_FAIL, LOGIN_WITH_FACEBOOK_START } from './types';
import { Permissions, Notifications, Facebook } from 'expo';

const PUSH_ENDPOINT = 'https://agendainstructoruluiautoserver.herokuapp.com/addToken';
async function loginWFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '595214430921927',
        { permissions: ['public_profile'] },
    );

    if (type === 'success' && token) {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(() => {
                return registerForPushNotificationsAsync()
            })
    }
    else
        throw new Error().message = 'Incercarea a fost anulata';
}

async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }
    let token = await Notifications.getExpoPushTokenAsync();

    return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            },
            user: {
                uid: firebase.auth().currentUser.uid,
            },
        }),
    });
}
export const login = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            registerForPushNotificationsAsync().then(() => {
                dispatch({ type: LOGIN_SUCCESS });
            })
        })
            .catch(() => {
                alert('Emailul sau parola nu este valida')
                dispatch({ type: LOGIN_FAILED })
            })
    }
}
export const loginWithFacebook = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_WITH_FACEBOOK_START })
        loginWFacebook()
            .then(() => {
                dispatch({ type: LOGIN_WITH_FACEBOOK_SUCCESS })
            })
            .catch(() => {
                dispatch({ type: LOGIN_WITH_FACEBOOK_FAIL })
            })
    }
}
export const signup = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_START })
        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            registerForPushNotificationsAsync();
            dispatch({ type: SIGNUP_SUCCESS });
            dispatch(NavigationActions.navigate({ routeName: 'Main' }))
        })
            .catch(() => {
                alert('Emailul sau parola nu este valida')
                dispatch({ type: SIGNUP_FAILED })
            })
    }
}