package LoanSharks.LoanSharks.Bank.App.configuration;

import LoanSharks.LoanSharks.Bank.App.middleware.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    LoginInterceptor LoginIntercept;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(LoginIntercept).addPathPatterns("/**").excludePathPatterns(Arrays.asList(new String[]{"/bankuser/login","/bankuser/join"}));
    }
}