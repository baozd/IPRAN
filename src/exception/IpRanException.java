package exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class IpRanException extends Exception {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 2624668063493494446L;
	
	private static Log logger = LogFactory.getLog(IpRanException.class);
	
	private String message;
	 
    public IpRanException(String message)
    {
       super(message);
       this.message = message;
       logger.error(message);
    }

    public String getMessage() {
    	return message;
    }

    public void setMessage(String message) {
    	this.message = message;
    }
}
