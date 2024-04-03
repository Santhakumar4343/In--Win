package com.os.inwin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.os.inwin.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUserNameAndPassword(String userName, String password);
User findByUserName(String userName);
Optional<User> findByEmail(String email);


@Query("SELECT u.userName FROM User u")
List<String> findAllUserNames();

@Query("SELECT u.email FROM User u")
List<String> findAllEmails();
@Query("SELECT u.mobileNumber FROM User u")
List<String> findAllMobileNumber();

}
