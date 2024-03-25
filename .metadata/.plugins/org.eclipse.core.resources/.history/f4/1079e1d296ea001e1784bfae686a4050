package com.os.inwin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUserNameAndPassword(String userName, String password);
User findByUserName(String userName);
User findByEmail(String email);
}
