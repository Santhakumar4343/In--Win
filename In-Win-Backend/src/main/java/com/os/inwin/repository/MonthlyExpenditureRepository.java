package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.MonthlyExpenditure;

public interface MonthlyExpenditureRepository extends JpaRepository<MonthlyExpenditure, Long> {
	List<MonthlyExpenditure> findByUserName(String userName);
}

