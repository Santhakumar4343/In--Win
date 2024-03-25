package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.os.inwin.entity.Loan;
import com.os.inwin.serviceImpl.LoanServiceImpl;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

	@Autowired
	private LoanServiceImpl loanService;
	
	@GetMapping("/loanStatus/{userName}")
	public Map<String, Double> getLoanStatus(@PathVariable String userName) {
	    return loanService.getTotalCurrentAndPaidValue(userName);
	}


	@PostMapping("/save")
	public ResponseEntity<String> saveLoan(@RequestBody Loan loan){
		
		Loan savedLoan=loanService.saveLoan(loan);
		if(savedLoan!=null) {
			return new ResponseEntity<>("Loan Saved Successfully",HttpStatus.CREATED);
		}
		else 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/updateLoan/{id}")
	public ResponseEntity<String> updateLoan(@PathVariable long id,@RequestBody Loan loan){
		Loan updateLoan=loanService.updateLoan(id, loan);
		if(updateLoan!=null) {
			return new ResponseEntity<>("Loan updated Successfully",HttpStatus.OK);
		}
		else 
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getLoansForUser/{userName}")
	public ResponseEntity<List<Loan>> getLoansForUser(@PathVariable String userName){
		
		List<Loan> loans=loanService.getLoansByUser(userName);
		if(loans!=null) {
			return new ResponseEntity<>(loans,HttpStatus.OK);
			
		}
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/getAllLoans")
	public ResponseEntity<List<Loan>> getAllLoans(){
		
		List<Loan> loans=loanService.getAllLoans();
		if(loans!=null) {
			return new ResponseEntity<>(loans,HttpStatus.OK);
			
		}
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/deleteLoan/{id}")
	public ResponseEntity<String> deleteLoan(@PathVariable long id) {
		
		boolean deleted =loanService.deleteLoan(id);
		if(deleted) {
			return ResponseEntity.ok("Loan with "+id+" deleted successfully");
		}
		
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Loan with "+id+" not found");
		}
		
		
		
	}
	
	
}
