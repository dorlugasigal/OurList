import createDataContext from "./createDataContext"

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

const signIn = async (dispatch, data) => {
    return (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
}
const signOut = (dispatch) => () => dispatch({ type: 'SIGN_OUT' })

const signUp = async (dispatch, data) => {
    return (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
}

const restoreToken = async (dispatch, token) => {
    return (token) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'RESTORE_TOKEN', token });
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signUp, signOut },
    {
        isLoading: true,
        isSignout: false,
        userToken: null,
    })