package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import LoanSharks.LoanSharks.Bank.App.Repository.StatementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StatementService {

	private final StatementRepository statementRepository;
	private final BankUserRepository bankUserRepository;

//	// see comment on StatementController.java
//
//    public Statement getStatementByName(String name){
//        return statementRepository.findByName(name);
//    }

	public Statement createStatement(Statement statement, Integer userId) {

		BankUser bankUser;

		bankUser = bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		statement.setBankUser(bankUser);
		return statementRepository.save(statement);
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

	public Statement getStatementById(Integer statementId, Integer userId) {

		bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		return statementRepository.findById(statementId).orElseThrow(
				() -> new IllegalArgumentException("statement id does not exist"));
	}

	public List<Statement> getAllStatements(Integer userId) {

		BankUser bankUser = bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		return bankUser.getStatements();
	}

	public void deleteStatement(Integer statementId, Integer userId) {

		bankUserRepository.findById(userId).orElseThrow(
				() -> new IllegalArgumentException("bankUser id does not exist"));

		statementRepository.delete(statementRepository.findById(statementId).orElseThrow(
				() -> new IllegalArgumentException("statement id does not exist")));
	}
}
