package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class BankUserService {

    private final BankUserRepository bankUserRepository;

    @Transactional
    public BankUser create(BankUser bankUser){
        BankUser other = this.getUserByUsername(bankUser.getUsername());

        if (other != null) {
            if(other.getUserId() == bankUser.getUserId()) {
                return bankUserRepository.save(bankUser);
            } else {
                return null;
            }
        }
        //TODO heighten security with encryption
        return bankUserRepository.save(bankUser);
    }

    @Transactional
    public BankUser getUserByUsername(String name){
        return bankUserRepository.findByUsername(name);
    }

    public BankUser checkLogin(String username, String password) {
        //TODO heighten security with encryption
        BankUser user = this.getUserByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            String token = Jwts.builder()
                    .setId(""+user.getUserId())
                    .setSubject("login")
                    .compact();

            user.setAwt_token(token);
            bankUserRepository.save(user);
            return user;
        }

        return null;
    }
    public boolean checkAuth(int id, String token) {
        BankUser user = this.bankUserRepository.findById(id).get();
        return (user != null && user.getAwt_token().equals(token));
    }
    public BankUser debugCheckAuth(int id, String token) {
        BankUser user = this.bankUserRepository.findById(id).get();
        return user;
    }
}
