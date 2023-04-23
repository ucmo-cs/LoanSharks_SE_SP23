package LoanSharks.LoanSharks.Bank.App.Controllers;

import LoanSharks.LoanSharks.Bank.App.Domain.SavingGoal;
import LoanSharks.LoanSharks.Bank.App.Service.SavingGoalService;
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
public class GoalController {

	private final SavingGoalService SavingGoalService;

    @CrossOrigin
    @PostMapping("/savingGoals/create")
    @PutMapping("/savingGoals/update")
    public ResponseEntity<?> save(HttpServletRequest request, @RequestBody SavingGoal SavingGoal) {
        return new ResponseEntity<>(SavingGoalService.updateOrCreate(LoginInterceptor.getUserId(request), SavingGoal), HttpStatus.CREATED);
    }
    @CrossOrigin
    @DeleteMapping("/savingGoals/{id}")
    public ResponseEntity<?> save(HttpServletRequest request, @PathVariable int id) {
        SavingGoalService.deleteStatement(LoginInterceptor.getUserId(request), id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/savingGoals")
    public ResponseEntity<?> getAll(HttpServletRequest request) {
        return new ResponseEntity<>(SavingGoalService.getAll(LoginInterceptor.getUserId(request)), HttpStatus.OK);
    }
//    @CrossOrigin
//    @GetMapping("/savingGoals/?byName={name}")
//    public ResponseEntity<?> getSavingGoalByName(@PathVariable("name") String name) {

//	// intentional duplicate of 'createSavingGoal()' -- JpaRepository's 'save()' updates SavingGoal if id already exists
//	@ResponseBody
//	@PostMapping("/savingGoals/{id}/edit")
//	public ResponseEntity<?> updateSavingGoal(@PathVariable("id") @RequestBody SavingGoal SavingGoal, Integer userId) {
//
//		return new ResponseEntity<>(SavingGoalService.updateSavingGoal(SavingGoal, userId), HttpStatus.CREATED);
//	}
}
