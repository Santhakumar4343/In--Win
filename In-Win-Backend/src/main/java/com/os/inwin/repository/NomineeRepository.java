package com.os.inwin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.os.inwin.entity.Nominee;

public interface NomineeRepository extends JpaRepository<Nominee, Long> {
	Nominee findByUserNameAndPassword(String userName, String password);

	Nominee findByUserName(String userName);

	List<Nominee> findByOwner(String owner);
	Optional<Nominee> findByEmail(String email);
	
	@Query("SELECT u.userName FROM Nominee u")
	List<String> findAllUserNames();

	@Query("SELECT u.email FROM Nominee u")
	List<String> findAllEmails();
	@Query("SELECT u.mobileNumber FROM Nominee u")
	List<String> findAllMobileNumber();
	
	@Query("SELECT u.owner FROM Nominee u")
	List<String> findAllOwner();
}
