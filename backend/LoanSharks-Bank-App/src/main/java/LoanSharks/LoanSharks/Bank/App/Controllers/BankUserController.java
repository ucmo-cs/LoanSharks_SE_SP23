package LoanSharks.LoanSharks.Bank.App.Controllers;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Service.BankUserService;
import LoanSharks.LoanSharks.Bank.App.middleware.LoginInterceptor;
import jakarta.servlet.http.HttpServletRequest;
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
	@PostMapping("/bankuser/join")
	public ResponseEntity<BankUser> save(@RequestBody BankUser bankUser) {
		System.out.println("userId " + bankUser.getUsername());
		System.out.println("userPassword " + bankUser.getPassword());

		BankUser user = bankUserService.create(bankUser);

		if (user != null) {
			bankUserService.checkLogin(user.getUsername(), user.getPassword());
			return new ResponseEntity<>(user, HttpStatus.CREATED);
		}

		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@CrossOrigin
	@PostMapping("/bankuser/login")
	public ResponseEntity<BankUser> login(@RequestBody BankUser bankUser) {
		//todo, setup better management of this, maybe use 404 HttpStatus.NOT_FOUND
		BankUser user = bankUserService.checkLogin(bankUser.getUsername(), bankUser.getPassword());
		if (user == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/debug/authcheck")
	public ResponseEntity<BankUser> debug(HttpServletRequest request) {
		int id = LoginInterceptor.getUserId(request);
		String token = request.getHeader("token");
		return new ResponseEntity<>(bankUserService.debugCheckAuth(id, token), HttpStatus.OK);
	}
}
