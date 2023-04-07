import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "./ApiCallerService";

export class AuthService {
    static login(username, password) {
        return ApiCallerService.postNoAuth('bankuser/login', {'username': username, 'password': password})
            .then(res => res.json())
            .then(res=> {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(res))})
            .then(res => {
                //side affect, should maybe not have here.
                window.location.href = "/";
                return res;
            })
    }
    static createUser(username, password) {
        return ApiCallerService.postNoAuth('bankuser/join', {'username': username, 'password': password})
            .then(res => res.json())
            .then(res=> {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, JSON.stringify(res))})
            .then(res => {
                return res;
            })
    }
    static logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        //side affect, should maybe not have here.
        window.location.href = "/login"
    }
    static isLoggedIn() {
        return !!sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }
    static testCanAccess() {
        ApiCallerService.post('debug/authcheck');
    }
}