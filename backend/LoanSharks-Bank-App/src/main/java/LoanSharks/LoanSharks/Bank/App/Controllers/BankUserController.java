package LoanSharks.LoanSharks.Bank.App.Controllers;
import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Service.BankUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class BankUserController {

    private final BankUserService bankUserService;

    @CrossOrigin
    @PostMapping("/bankuser")
    public ResponseEntity<BankUser> save(@RequestBody BankUser bankUser){

        System.out.println("userId " + bankUser.getUsername());
        System.out.println("userPassword " + bankUser.getPassword());
        return new ResponseEntity<>(bankUserService.create(bankUser), HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/bankuser/login")
    public ResponseEntity<BankUser> login(@RequestBody BankUser bankUser) {
        //todo, setup better management of this, maybe use 404 HttpStatus.NOT_FOUND
        return new ResponseEntity<>(bankUserService.checkLogin(bankUser.getUsername(), bankUser.getPassword()), HttpStatus.OK);
    }
}
