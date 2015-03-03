package service;

import form.UserInfo;

public interface ILoginService {
	UserInfo getUserInfo(String userName,String password);
}