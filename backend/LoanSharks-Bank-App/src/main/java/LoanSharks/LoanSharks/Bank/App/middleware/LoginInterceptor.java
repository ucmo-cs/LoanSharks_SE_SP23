package LoanSharks.LoanSharks.Bank.App.middleware;

import LoanSharks.LoanSharks.Bank.App.Service.BankUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginInterceptor implements HandlerInterceptor {

	private final BankUserService bankUserService;

	@Override
	public boolean preHandle(HttpServletRequest request,
							 HttpServletResponse response,
							 Object handler) throws Exception {
		if ("OPTIONS".equals(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
			return true;
		}

		String idString = request.getHeader("userId");
		String token = request.getHeader("token");

		if (idString != null && token != null) {
			int id = Integer.parseInt(idString);
			return bankUserService.checkAuth(id, token);
		}

		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
						   HttpServletResponse response,
						   Object handler,
						   ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
								HttpServletResponse response,
								Object handler,
								Exception exception) throws Exception {
	}

	public static int getUserId(HttpServletRequest request) {
		return Integer.parseInt(request.getHeader("userId"));
	}
}