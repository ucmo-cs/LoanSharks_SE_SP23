package LoanSharks.LoanSharks.Bank.App.Repository;

import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatementRepository extends JpaRepository<Statement,Integer> {

    public List<Statement> findByName(String name);

}
