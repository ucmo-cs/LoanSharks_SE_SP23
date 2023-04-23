import { USER_NAME_SESSION_ATTRIBUTE_NAME, ApiCallerService } from "./ApiCallerService";

export class GoalService {
    //todo, either use an object, or build an object from passed methods. your choice.
    static createGoal(statement) {
        return ApiCallerService.post('savingGoals/create', statement)
            .then(function(res) {
                if (res.status !== 201) {
                    throw new Error('invalid return status');
                }
                return res;
            })
            .then(res => res.json())
    }
    static deleteGoal(goal_id) {
        return ApiCallerService.delete('savingGoals/' + goal_id, {})  
        .then(function(res) {
            if (res.status !== 200) {
                throw new Error('invalid return status');
            }
            return res;
        })
    }
    static getAllGoals() {
        return ApiCallerService.get("savingGoals")
        .then(function(res) {
            if (res.status !== 200) {
                throw new Error('invalid return status');
            }
            return res;
        })
        .then(res => res.json())
    }
}