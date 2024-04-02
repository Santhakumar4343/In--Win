package com.os.inwin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.os.inwin.entity.User;

public interface UserService {

	User createUser(User user);

	User getUser(long id);

	List<User> getAllUser();

	public User updateUserProfessionalDetails(long id, User user);
	public User updateUserPersonalDetails(long id, User user,MultipartFile imageFile)throws IOException;

	void deleteUser(long id);

}
