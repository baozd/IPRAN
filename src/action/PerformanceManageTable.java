package action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import service.IPerformanceService;

import com.opensymphony.xwork2.ModelDriven;

import form.PerformanceManageTableForm;

public class PerformanceManageTable extends BaseAction implements ModelDriven<PerformanceManageTableForm> {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4198256169450961147L;

	private static Log logger = LogFactory.getLog(PerformanceManageTable.class);

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
		return SUCCESS;
	}
	
	
	public void search() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		
		String chartData = performanceService.getData(Integer.parseInt(performanceManageTableForm.getCount()));
		request.getSession().setAttribute("chart-data", chartData);
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter writer = response.getWriter();
		writer.print(chartData);
		writer.flush();
		writer.close();
	}

}