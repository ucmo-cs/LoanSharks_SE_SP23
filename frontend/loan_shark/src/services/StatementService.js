import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "./ApiCallerService";

export class StatementService {
    //todo, either use an object, or build an object from passed methods. your choice.
    static createStatement(statement) {
        return ApiCallerService.post('statements/create', statement)
            .then(function(res) {
                if (res.status !== 201) {
                    throw new Error('invalid return status');
                }
                return res;
            })
            .then(res => res.json())
    }
    static deleteStatement(statement_id) {
        return ApiCallerService.delete('statements/' + statement_id, {})  
        .then(function(res) {
            if (res.status !== 200) {
                throw new Error('invalid return status');
            }
            return res;
        })
    }
    static getAllStatement() {
        return ApiCallerService.get("statements")
        .then(function(res) {
            if (res.status !== 200) {
                throw new Error('invalid return status');
            }
            return res;
        })
        .then(res => res.json())
    }
    static updateStatement(statement) {
        //can also do {param1:param1, param2: param2} in place of statements
        /*return ApiCallerService.put('statements/' + statement.id, statement)
            .then(res => res.json())
        */
    }
}