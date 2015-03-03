package interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import exception.IpRanException;

public class GobalExceptionCatch extends AbstractInterceptor {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 581771755970261042L;

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		String type = request.getHeader("X-Requested-With");
		
		try {
			String result = invocation.invoke();
			return result;
		} catch (Exception ex) {
			ex.printStackTrace();
			
			if ("XMLHttpRequest".equalsIgnoreCase(type)) {
				response.setStatus(500);
				new IpRanException(getExceptionAllinformation(ex));
				return null;
			}
			
			throw new IpRanException(getExceptionAllinformation(ex));
		}
	}
	
	private static String getExceptionAllinformation(Exception ex){
        String sOut = "";
        StackTraceElement[] trace = ex.getStackTrace();
        for (StackTraceElement s : trace) {
            sOut += s + "\r\n";
        }
        
        return sOut;
	}
}
