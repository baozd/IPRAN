package interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import utility.Constant;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginValidation extends AbstractInterceptor {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4577890093829002318L;

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		ActionContext context = invocation.getInvocationContext();
		String type = request.getHeader("X-Requested-With");

		if (request.getSession().getAttribute(Constant.LOGIN_SESSION_KEY) == null) {
			
			// ajax
			if ("XMLHttpRequest".equalsIgnoreCase(type)) {
				response.setHeader("isLogin", "false");
				response.setStatus(500);
				return null;
			}
			
			return "redirectToLogin";
		}
		
		return invocation.invoke();
	}
}
