package action;

import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
import utility.Constant;
import com.opensymphony.xwork2.ActionSupport;
import form.UserInfo;

public class BaseAction extends ActionSupport {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -9023423787747702357L;

	public UserInfo getUserInfoFromSession() {
		HttpServletRequest request = ServletActionContext.getRequest();
		
		Object o = request.getSession().getAttribute(Constant.LOGIN_SESSION_KEY);
		if (o == null) {
			return null;
		}
		
		return (UserInfo) o;
	}
	
	public void setUserInfoToSession(UserInfo userInfo) {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.getSession().setAttribute(Constant.LOGIN_SESSION_KEY, userInfo);
	}
}