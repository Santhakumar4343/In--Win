package com.os.inwin.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.BankAccounts;
import com.os.inwin.repository.BankRepository;
import com.os.inwin.service.BankService;

@Service
public class BankServiceImpl implements BankService{

	
	@Autowired
	private BankRepository bankRepository;

	@Override
	public BankAccounts saveBankAccount(BankAccounts bankAccount) {
		return bankRepository.save(bankAccount);
	}

	@Override
	public BankAccounts updateBankAccounts(Long id, BankAccounts bankAccount) {
		Optional<BankAccounts> optionalBankAc=bankRepository.findById(id);
		if(optionalBankAc.isPresent()) {
			BankAccounts existingAC=optionalBankAc.get();
			existingAC.setBankName(bankAccount.getBankName());
			existingAC.setAccountHolderName(bankAccount.getAccountHolderName());
			existingAC.setAccountNumber(bankAccount.getAccountNumber());
			existingAC.setIfscCode(bankAccount.getIfscCode());
			existingAC.setBranch(bankAccount.getBranch());
			existingAC.setAccountType(bankAccount.getAccountType());
			return bankRepository.save(existingAC);
		}
		return null;
	}

	@Override
	public boolean deleteBankAccount(Long id) {
		Optional <BankAccounts> optionalAc=bankRepository.findById(id);
		if (optionalAc.isPresent()) {
			bankRepository.deleteById(id);
			return true;
		}
		else
		return false;
	}

	@Override
	public List<BankAccounts> getBankAccountsByUser(String userName) {
		
		return bankRepository.findByUserName(userName);
	}

	@Override
	public List<BankAccounts> getAllBankAccounts() {
		
		return bankRepository.findAll();
	}
	
	
	
}
