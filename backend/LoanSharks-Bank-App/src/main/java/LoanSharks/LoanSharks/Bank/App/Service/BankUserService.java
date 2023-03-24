package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BankUserService {

    private final BankUserRepository bankUserRepository;

    @Transactional
    public BankUser create(BankUser bankUser){
        List<BankUser> others = this.getUserByUsername(bankUser.getUsername());
        if (!others.isEmpty()) {
            if(others.get(0).getId() == bankUser.getId()) {
                return bankUserRepository.save(bankUser);
            } else {
                return null;
            }
        }
        //TODO heighten security with encryption
        return bankUserRepository.save(bankUser);
    }

    @Transactional
    public List<BankUser> getUserByUsername(String name){

        return bankUserRepository.findByUsername(name);

    }
    public BankUser checkLogin(String username, String password) {
        //TODO heighten security with encryption
        List<BankUser> list = this.getUserByUsername(username);
        if(list.size() == 1 && list.get(0).getPassword().equals(password)) {
            BankUser user = list.get(0);
            String token = Jwts.builder()
                    .setId(""+user.getId())
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
