package LoanSharks.LoanSharks.Bank.App.Controllers;
import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class BankUserController {

    //private final BankUserService bankUserService;

    @CrossOrigin
    @PostMapping("/bankuser")
    public void save(@RequestBody BankUser bankUser){

        System.out.println("userId " + bankUser.getUsername());
        System.out.println("userPassword " + bankUser.getPassword());


    }



}
