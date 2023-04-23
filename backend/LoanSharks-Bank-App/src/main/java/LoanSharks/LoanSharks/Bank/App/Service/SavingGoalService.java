package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.SavingGoal;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import LoanSharks.LoanSharks.Bank.App.Repository.SavingGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SavingGoalService {

	private final SavingGoalRepository goalRepository;
	private final BankUserRepository bankUserRepository;

    @Transactional
    public SavingGoal updateOrCreate(Integer user_id, SavingGoal goal){

		BankUser bankUser = bankUserRepository.findById(user_id).orElseThrow();

        goal.setBankUser(bankUser);
        return goalRepository.save(goal);
    }

    @Transactional
    public List<SavingGoal> getAll(int user_id){
        return goalRepository.getAll(user_id);
    }

// intentional duplicate of 'createStatement()' -- JpaRepository's 'save()' updates statement if id already exists
//	public Statement updateStatement(Statement statement, Integer userId) {
//
//		BankUser bankUser;
//
//		bankUser = bankUserRepository.findById(userId).orElseThrow(
//				() -> new IllegalArgumentException("bankUser id does not exist"));
//
//		statement.setBankUser(bankUser);
//
//		return statementRepository.save(statement);
//	}
    public void deleteStatement(int user_id, int id) {
        SavingGoal del = goalRepository.findById(id).orElseThrow();
        if(del.getBankUser().getUserId() != user_id) {
            throw new IllegalArgumentException("User id does not match to passed id");
        }
        goalRepository.delete(del);
    }
	public List<SavingGoal> getAllSavingGoals(Integer userId) {

		BankUser bankUser = bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		return bankUser.getSavingGoals();
	}
}
