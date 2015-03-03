package action;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import service.IPerformanceService;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import form.PerformanceManageTableForm;

public class PerformanceManageChart extends BaseAction implements ModelDriven<PerformanceManageTableForm> {
	

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1812258648868540133L;

	private static Log logger = LogFactory.getLog(PerformanceManageChart.class);

	private IPerformanceService performanceService;

	public void setPerformanceService(IPerformanceService performanceService) {
		this.performanceService = performanceService;
	}

	private PerformanceManageTableForm performanceManageTableForm = new PerformanceManageTableForm();
	
	@Override
	public PerformanceManageTableForm getModel() {
		return performanceManageTableForm;
	}
	
	public String execute() {
		HttpServletRequest request = ServletActionContext.getRequest();
		performanceManageTableForm.setChartData((String)request.getSession().getAttribute("chart-data"));
		return SUCCESS;
	}

}