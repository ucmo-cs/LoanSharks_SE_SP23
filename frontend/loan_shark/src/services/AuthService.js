import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "./ApiCallerService";

export class AuthService {
    login(username, password) {
        ApiCallerService.postNoAuth('/bankuser/login', {'username': username, 'password': password})
            .then(res => res.json())
            .then(res=> {sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, res)})
    }
    createUser(username, password) {
        ApiCallerService.postNoAuth('/bankuser', {'username': username, 'password': password})
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }
}

export default AuthService