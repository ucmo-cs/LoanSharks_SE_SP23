package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import LoanSharks.LoanSharks.Bank.App.Repository.StatementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StatementService {

    private final StatementRepository statementRepository;
    private final BankUserRepository bankUserRepository;

    @Transactional
    public Statement create(Integer user_id, Statement statement){

        BankUser bankUser;

        bankUser = bankUserRepository.findById(user_id).orElseThrow(()
                ->new IllegalArgumentException("bankUser id does not exists"));

        statement.setBankuser(bankUser);
        return statementRepository.save(statement);
    }


    @Transactional
    public List<Statement> getStatementByName(String name){

        return statementRepository.findByName(name);

    }

}
