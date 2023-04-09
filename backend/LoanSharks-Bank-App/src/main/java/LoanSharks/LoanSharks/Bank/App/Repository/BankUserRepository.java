package LoanSharks.LoanSharks.Bank.App.Repository;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankUserRepository extends JpaRepository<BankUser,Integer> {
    BankUser findByUsername(String name);
    List<BankUser> findByUserId(Integer userId);
}
