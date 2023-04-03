package LoanSharks.LoanSharks.Bank.App.Controllers;

import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Service.StatementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin // tells the browser that cross-origin requests are safe
@RequiredArgsConstructor
public class StatementController {

	private final StatementService statementService;

//  // user may create statements with duplicate names -- addressing statements by name may allow naming collision
//  // e.g. "/statements/{id}" instead of "/statements/{name}"
//	@CrossOrigin
//	@GetMapping("/statements/{name}")
//	public ResponseEntity<?> getStatementByName(@PathVariable("name") String name) {
//
//	  return new ResponseEntity<>(statementService.getStatementByName(name), HttpStatus.OK);
//
//	}

	// TODO: how to implement in frontend (as far as I can tell): have the statement-creation modal take 'Statement'
	//  constructor fields (name,amount,etc.), wrap them into a Statement object, and pass it to the controller

	@ResponseBody
	@PostMapping("/user/statements/{id}")
	public ResponseEntity<?> createStatement(@PathVariable("id") @RequestBody Statement statement, Integer userId) {

		return new ResponseEntity<>(statementService.createStatement(statement, userId), HttpStatus.CREATED);
	}

//	// intentional duplicate of 'createStatement()' -- JpaRepository's 'save()' updates statement if id already exists
//	@ResponseBody
//	@PostMapping("/statements/{id}/edit")
//	public ResponseEntity<?> updateStatement(@PathVariable("id") @RequestBody Statement statement, Integer userId) {
//
//		return new ResponseEntity<>(statementService.updateStatement(statement, userId), HttpStatus.CREATED);
//	}

	@GetMapping("/user/statements/{id}")
	public ResponseEntity<?> getStatementById(@PathVariable("id") Integer statementId, Integer userId) {

		return new ResponseEntity<>(statementService.getStatementById(statementId, userId), HttpStatus.OK);
	}

	@GetMapping("/user/statements")
	public ResponseEntity<?> getAllStatements(Integer userId) {

		return new ResponseEntity<>(statementService.getAllStatements(userId), HttpStatus.OK);
	}

	@DeleteMapping("/user/statements/{id}")
	public ResponseEntity<?> deleteStatement(@PathVariable("id") @RequestBody Statement statement, Integer userId) {

		statementService.deleteStatement(statement.getId(), userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
