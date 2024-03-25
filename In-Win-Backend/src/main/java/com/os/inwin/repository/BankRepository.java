package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.BankAccounts;

public interface BankRepository extends JpaRepository<BankAccounts, Long>{
	
	List<BankAccounts> findByUserName(String userName);

}
