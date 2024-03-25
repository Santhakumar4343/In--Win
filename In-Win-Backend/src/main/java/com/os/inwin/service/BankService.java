package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.BankAccounts;



public interface BankService {

	BankAccounts saveBankAccount(BankAccounts bankAccount);
	BankAccounts updateBankAccounts(Long id, BankAccounts bankAccount);
	    boolean deleteBankAccount(Long id);
	    public List<BankAccounts >getBankAccountsByUser(String userName);
	    List<BankAccounts> getAllBankAccounts();
}
