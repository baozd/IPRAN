package service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class PerformanceService implements IPerformanceService {

	@Override
	public String getData(int count) {
		StringBuffer sb = new StringBuffer();
		sb.append("{\"chartData\" : [");
		//String data = "{\"chartData\" : [";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
		for (int i = 0; i < count; i++) {
			String medianDelayTime = String.valueOf(1+(int)(Math.random()*100));
			String delayTime75 = String.valueOf(1+(int)(Math.random()*100));
			String delayTime95 = String.valueOf(1+(int)(Math.random()*100));
			String medianJitter = String.valueOf(1+(int)(Math.random()*100));
			String jitter75 = String.valueOf(1+(int)(Math.random()*100));
			String jitter95 = String.valueOf(1+(int)(Math.random()*100));
			
			Calendar cal = Calendar.getInstance();
			Date date = new Date("2015/01/10 18:00:00");
			cal.setTime(date);
			cal.add(Calendar.SECOND, i + 1);
			String sss = formatter.format(cal.getTime());
			
			String temp = "{\"date\": \"" + sss + "\", \"rc\": \"二区\", \"bsNo\": \"WBJ90978\", \"bsName\": \"华源世纪商务楼\", \"ipAddress\": \"156.3.1.101\", \"packetLossRate\": \"0%\", \"medianDelayTime\": \"" + medianDelayTime + "\", \"delayTime75\": \"" + delayTime75 + "\", \"delayTime95\": \"" + delayTime95 + "\", \"medianJitter\": \"" + medianJitter + "\", \"jitter75\": \"" + jitter75 + "\", \"jitter95\": \"" + jitter95 + "\"},";
			
			if (i == count - 1) {
				temp = "{\"date\": \"" + sss + "\", \"rc\": \"二区\", \"bsNo\": \"WBJ90978\", \"bsName\": \"华源世纪商务楼\", \"ipAddress\": \"156.3.1.101\", \"packetLossRate\": \"0%\", \"medianDelayTime\": \"" + medianDelayTime + "\", \"delayTime75\": \"" + delayTime75 + "\", \"delayTime95\": \"" + delayTime95 + "\", \"medianJitter\": \"" + medianJitter + "\", \"jitter75\": \"" + jitter75 + "\", \"jitter95\": \"" + jitter95 + "\"}";
			}
			
			//data += temp;
			sb.append(temp);
			
		}
		
		//data += "]}";
		sb.append("]}");
		
		return sb.toString();
	}


}