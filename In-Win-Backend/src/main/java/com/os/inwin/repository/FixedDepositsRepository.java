package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.FixedDeposits;

public interface FixedDepositsRepository extends JpaRepository<FixedDeposits, Long>{

	List<FixedDeposits> findByUserName(String userName);
}
