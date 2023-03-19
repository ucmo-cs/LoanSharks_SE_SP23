
import {ApiService, USER_NAME_SESSION_ATTRIBUTE_NAME} from './ApiCall'


class AuthService {
    doAuth(username, password) {
        return ApiService.postNoAuth('basicauth', {
            'username': username,
            'password': password //FIXME: ENCRYPT ME!!!!!!!!
        }).then(function (response) {
            sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, response.user)
        });
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }
}

export default new AuthService()