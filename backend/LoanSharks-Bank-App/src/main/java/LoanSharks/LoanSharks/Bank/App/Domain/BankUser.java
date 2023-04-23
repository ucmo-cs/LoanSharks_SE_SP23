package LoanSharks.LoanSharks.Bank.App.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BankUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Integer userId;

    private String username;

    private String password;

    //TODO hide JWT token from user input?
    private String awt_token;

    // transplant -> BankUserRepository?
    @OneToMany(mappedBy = "bankUser")
    private List<Statement> statements = new ArrayList<>();

    // transplant -> BankUserRepository?
    @OneToMany(mappedBy = "bankUser")
    private List<SavingGoal> savingGoals = new ArrayList<>();

}

