import t from './actionTypes'

const initialAuthState = {
    isLoggedIn: false,
    user: {
        id: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        username: '',
        bio: '',
        image: '',
        token: ''
    }
}

const LOGOUT = 'Logout'

export function authStore(state = initialAuthState, action) {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case LOGOUT:
            return initialAuthState
        case t.SET_LOGGED_IN_STATE:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
}
