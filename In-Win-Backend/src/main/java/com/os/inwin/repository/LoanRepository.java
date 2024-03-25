package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserName(String userName);
}

