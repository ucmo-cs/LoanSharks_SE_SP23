package LoanSharks.LoanSharks.Bank.App.Controllers;

import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Service.StatementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class StatementController {

    private final StatementService statementService;

    @CrossOrigin
    @PostMapping("/users/{userId}/statement")
    public ResponseEntity<?> save(@PathVariable("userId") Integer userId, @RequestBody Statement statement) {

        return new ResponseEntity<>(statementService.create(userId, statement), HttpStatus.CREATED);

    }

    @CrossOrigin
    @GetMapping("/statements/{name}")
    public ResponseEntity<?> getStatementByName(@PathVariable("name") String name) {

        return new ResponseEntity<>(statementService.getStatementByName(name), HttpStatus.OK);

    }

}
