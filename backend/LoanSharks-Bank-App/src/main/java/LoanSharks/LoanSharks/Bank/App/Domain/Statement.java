package LoanSharks.LoanSharks.Bank.App.Domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
//import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Statement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private double amount;

    private String date;

    private boolean planned;

    private String frequency;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private BankUser bankUser;
}