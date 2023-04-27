package LoanSharks.LoanSharks.Bank.App.Repository;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.SavingGoal;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingGoalRepository extends JpaRepository<SavingGoal,Integer> {
    @Query(
            value = "SELECT * FROM saving_goal WHERE user_id = ?1 LIMIT ?2 OFFSET ?3",
            nativeQuery = true
    )
    public List<SavingGoal> getAll(int user_id, int limit, int offset);

    public default List<SavingGoal> getAll(int user_id) {
        return this.getAll(user_id, 1000, 0);
    }
}
