package LoanSharks.LoanSharks.Bank.App.Controllers;

import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Service.StatementService;
import LoanSharks.LoanSharks.Bank.App.middleware.LoginInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin // tells the browser that cross-origin requests are safe
@RequiredArgsConstructor
public class StatementController {

	private final StatementService statementService;

    @CrossOrigin
    @PostMapping("/statements/create")
    @PutMapping("/statements/update")
    public ResponseEntity<?> save(HttpServletRequest request, @RequestBody Statement statement) {
        return new ResponseEntity<>(statementService.updateOrCreate(LoginInterceptor.getUserId(request), statement), HttpStatus.CREATED);
    }
    @CrossOrigin
    @DeleteMapping("/statements/{id}")
    public ResponseEntity<?> save(HttpServletRequest request, @PathVariable int id) {
        statementService.deleteStatement(LoginInterceptor.getUserId(request), id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/statements")
    public ResponseEntity<?> getAll(HttpServletRequest request) {
        return new ResponseEntity<>(statementService.getAll(LoginInterceptor.getUserId(request)), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/statements/{start_date}/{end_date}")
    public ResponseEntity<?> getStatementByDateRange(
            HttpServletRequest request,
            @PathVariable("start_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date start_date,
            @PathVariable("last_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date last_date
    ) {

        return new ResponseEntity<>(statementService.getStatementByDateRange(LoginInterceptor.getUserId(request),start_date, last_date), HttpStatus.OK);

    }
//    @CrossOrigin
//    @GetMapping("/statements/?byName={name}")
//    public ResponseEntity<?> getStatementByName(@PathVariable("name") String name) {

//	// intentional duplicate of 'createStatement()' -- JpaRepository's 'save()' updates statement if id already exists
//	@ResponseBody
//	@PostMapping("/statements/{id}/edit")
//	public ResponseEntity<?> updateStatement(@PathVariable("id") @RequestBody Statement statement, Integer userId) {
//
//		return new ResponseEntity<>(statementService.updateStatement(statement, userId), HttpStatus.CREATED);
//	}
}
