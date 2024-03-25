package com.os.inwin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.BankAccounts;
import com.os.inwin.entity.Loan;
import com.os.inwin.serviceImpl.BankServiceImpl;

@RestController
@RequestMapping("/api/accounts")
public class BankController {
	
	@Autowired
	private BankServiceImpl bankService;
	
	@PostMapping("/save")
	public ResponseEntity<String> saveBankAccount(@RequestBody BankAccounts bankAccount){
		
		BankAccounts savedBankAccount=bankService.saveBankAccount(bankAccount);
		if(savedBankAccount!=null) {
			return new ResponseEntity<>("BankAccount Saved Successfully",HttpStatus.CREATED);
		}
		else 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/updateBankAccount/{id}")
	public ResponseEntity<String> updateBankAccounts(@PathVariable long id,@RequestBody BankAccounts bankAccount){
		BankAccounts updateLoan=bankService.updateBankAccounts(id, bankAccount);
		if(updateLoan!=null) {
			return new ResponseEntity<>("BankAccount updated Successfully",HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getBankAccountsForUser/{userName}")
	public ResponseEntity<List<BankAccounts>> getBankAccountsForUser(@PathVariable String userName){
		
		List<BankAccounts> bankAccounts=bankService.getBankAccountsByUser(userName);
		if(bankAccounts!=null) {
			return new ResponseEntity<>(bankAccounts,HttpStatus.OK);
			
		}
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getAllBankAccounts")
	public ResponseEntity<List<BankAccounts>> getAllBankAccounts(){
		
		List<BankAccounts> bankAccounts=bankService.getAllBankAccounts();
		if(bankAccounts!=null) {
			return new ResponseEntity<>(bankAccounts,HttpStatus.OK);
			
		}
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/deleteBankAccount/{id}")
	public ResponseEntity<String> deleteBankAccounts(@PathVariable long id) {
		
		boolean deleted =bankService.deleteBankAccount(id);
		if(deleted) {
			return ResponseEntity.ok("BankAccount with "+id+" deleted successfully");
		}
		
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("BankAccount with "+id+" not found");
		}
		
		
		
	}
	

}
