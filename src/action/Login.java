package action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import service.ILoginService;

import com.opensymphony.xwork2.ModelDriven;

import form.LoginForm;
import form.UserInfo;

public class Login extends BaseAction implements ModelDriven<LoginForm> {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 7557205648109076954L;

	private static Log logger = LogFactory.getLog(Login.class);

	private ILoginService loginService;

	public void setLoginService(ILoginService loginService) {
		this.loginService = loginService;
	}

	private LoginForm loginForm = new LoginForm();
	
	@Override
	public LoginForm getModel() {
		return loginForm;
	}
	
	public String execute() {
		return INPUT;
	}

	/**
	 * check Login
	 * @return
	 */
	public String check() {
		UserInfo useInfo = loginService.getUserInfo(loginForm.getUserName(), loginForm.getPassword());
		this.setUserInfoToSession(useInfo);
		
		return useInfo == null ? INPUT : SUCCESS;
	}
	
	/**
	 * log out
	 * @return
	 */
	public String logout() {
		this.setUserInfoToSession(null);
		return "redirectToLogin";
	}
}