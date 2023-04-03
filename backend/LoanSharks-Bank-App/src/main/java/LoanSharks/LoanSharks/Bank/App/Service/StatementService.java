package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import LoanSharks.LoanSharks.Bank.App.Repository.StatementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StatementService {

	private final StatementRepository statementRepository;
	private final BankUserRepository bankUserRepository;

    @Transactional
    public Statement updateOrCreate(Integer user_id, Statement statement){

		BankUser bankUser = bankUserRepository.findById(user_id).orElseThrow();

        statement.setBankUser(bankUser);
        return statementRepository.save(statement);
    }
    @Transactional
    public List<Statement> getStatementByDateRange(int user_id, Date start, Date end){

        return statementRepository.findInDateRange(user_id, start, end);

    }

    @Transactional
    public List<Statement> getAll(int user_id){
        return statementRepository.getAll(user_id);
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
        Statement del = statementRepository.findById(id).orElseThrow();
        if(del.getBankUser().getUserId() != user_id) {
            throw new IllegalArgumentException("User id does not match to passed id");
        }
        statementRepository.delete(del);
    }
	public List<Statement> getAllStatements(Integer userId) {

		BankUser bankUser = bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		return bankUser.getStatements();
	}
}
