package service;

import form.UserInfo;

public class LoginService implements ILoginService {

	@Override
	public UserInfo getUserInfo(String userName, String password) {
		if (!"abc".equals(userName) || !"123".equals(password)) {
			return null;
		}
		
		UserInfo userInfo = new UserInfo();
		userInfo.setUserName(userName);
		
		return userInfo;
	}
}