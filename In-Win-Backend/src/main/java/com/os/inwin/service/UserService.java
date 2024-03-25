package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.User;

public interface UserService {

	User createUser(User user);

	User getUser(long id);

	List<User> getAllUser();

	public User updateUserProfessionalDetails(long id, User user);
	public User updateUserPersonalDetails(long id, User user);

	void deleteUser(long id);

}
