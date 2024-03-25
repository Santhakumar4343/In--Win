package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Loan;

public interface LoanService {
    Loan saveLoan(Loan loan);
    Loan updateLoan(Long id, Loan loan);
    boolean deleteLoan(Long id);
    public List<Loan >getLoansByUser(String userName);
    List<Loan> getAllLoans();
}
