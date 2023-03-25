import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "./ApiCallerService";

export class StatementService {
    //todo, either use an object, or build an object from passed methods. your choice.
    static createStatement(statement) {
        //can also do {param1:param1, param2: param2} in place of statements
        /*return ApiCallerService.post('statements/create', statement)
            .then(res => res.json())
        */
    }
    static deleteStatement(statement) {
        //can also do {param1:param1, param2: param2} in place of statements
        /*return ApiCallerService.delete('statements/' + statement.id, statement)
            .then(res => res.json())
        */
    }
    static getAllStatement(statement) {
        //can also do {param1:param1, param2: param2} in place of statements
        /*return ApiCallerService.get('statements', {})
            .then(res => res.json())
        */
    }
    static updateStatement(statement) {
        //can also do {param1:param1, param2: param2} in place of statements
        /*return ApiCallerService.put('statements/' + statement.id, statement)
            .then(res => res.json())
        */
    }
}