import createDataContext from "./createDataContext"
import { AsyncStorage } from "react-native";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                userToken: null,
            };
        default:
            return state;
    }
}

const signIn = (dispatch, data) => {
    return async (data) => {
        console.log(data)

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
}
const signOut = (dispatch) => {
    return async () => {
        await AsyncStorage.setItem('userToken', "")
        dispatch({ type: 'SIGN_OUT' })
    }
}

const signUp = (dispatch, data) => {
    return async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
}

const restoreToken = (dispatch, token) => {
    return async (token) => {

        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'RESTORE_TOKEN', token });
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signUp, signOut, restoreToken },
    {
        isLoading: true,
        isSignout: false,
        userToken: null,
    })