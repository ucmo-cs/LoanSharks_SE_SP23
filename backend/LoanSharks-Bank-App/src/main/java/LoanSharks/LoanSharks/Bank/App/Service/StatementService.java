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

@RequiredArgsConstructor
@Service
public class StatementService {

    private final StatementRepository statementRepository;
    private final BankUserRepository bankUserRepository;

    @Transactional
    public Statement updateOrCreate(Integer user_id, Statement statement){

        BankUser bankUser;

        bankUser = bankUserRepository.findById(user_id).orElseThrow(()
                ->new IllegalArgumentException("bankUser id does not exists"));

        statement.setBankuser(bankUser);
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

    @Transactional
    public List<Statement> getStatementByName(String name){

        return statementRepository.findByName(name);

    }
    public void deleteStatement(int user_id, int id) {
        Statement del = statementRepository.findById(id).orElseThrow();
        if(del.getBankuser().getId() != user_id) {
            throw new IllegalArgumentException("User id does not match to passed id");
        }
        statementRepository.delete(del);
    }

}
