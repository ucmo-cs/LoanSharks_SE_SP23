package LoanSharks.LoanSharks.Bank.App.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SavingGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private int time_month;
    private int time_year;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private BankUser bankUser;
}
