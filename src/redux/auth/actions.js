
import conduitService from '../../services/conduitService'
import r from '../../services/routes'
import t from './actionTypes'

export function setLoggedInState(loggedInState) {
    return {
        type: t.SET_LOGGED_IN_STATE,
        payload: loggedInState
    }
}

function setUserData(userResponse) {
    const userToken = userResponse.token ? userResponse.token : ''
    conduitService.setAuth(userToken) // Set the token for API Service

    return {
        type: t.LOGIN_SUCCESS,
        payload: userResponse
    }
}

export function signUpOperation(username, email, password) {
    return (dispatch, getState) => {
        return conduitService.post(r.USERS, {username: username, email: email, password: password})
            .then(res => {
                const userPayload = (res.data && res.data.user) ? res.data.user : null
                return dispatch(setUserData(userPayload))
            }).catch(error => {
                return dispatch(setLoggedInState(false))
        })
    }
}
