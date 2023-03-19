package LoanSharks.LoanSharks.Bank.App.Service;

import LoanSharks.LoanSharks.Bank.App.Domain.BankUser;
import LoanSharks.LoanSharks.Bank.App.Domain.Statement;
import LoanSharks.LoanSharks.Bank.App.Repository.BankUserRepository;
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
            if(others.size() == 1 && others.get(0).getId() != bankUser.getId()) {
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
            return list.get(0);
        }
        return null;
    }
}
