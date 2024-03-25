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

import com.os.inwin.entity.MonthlyExpenditure;
import com.os.inwin.serviceImpl.MonthlyExpenditureServiceImpl;

@RestController
@RequestMapping("/api/monthlyExpenses")
public class MonthlyExpenditureController {
	@Autowired
	private MonthlyExpenditureServiceImpl monthlyExpenditureService;
	
	
	
	@GetMapping("/totalmonthlyExpenditurePrice/{userName}")
    public Map<String, Double> getTotalCurrentValue(@PathVariable String userName) {
        double totalPrice = monthlyExpenditureService.calculateTotalCurrentValue(userName);
        Map<String, Double> response = new HashMap<>();
        response.put("totalPrice", totalPrice);
        return response;
    }
	   
	    @PostMapping("/save")
	    public ResponseEntity<MonthlyExpenditure> saveMonthlyExpenditure(@RequestBody MonthlyExpenditure monthlyExpenditure) {
	    	MonthlyExpenditure savedMonthlyExpenditure = monthlyExpenditureService.createMonthlyExpenditure(monthlyExpenditure);
	        return new ResponseEntity<>(savedMonthlyExpenditure, HttpStatus.CREATED);
	    }

	 
	    
	    @PutMapping("/update/{id}")
	    public ResponseEntity<String> updateMonthlyExpenditure(@PathVariable long id, @RequestBody MonthlyExpenditure monthlyExpenditure) {
	    	MonthlyExpenditure updatedMonthlyExpenditure = monthlyExpenditureService.updateMonthlyExpenditure(id, monthlyExpenditure);
	        return updatedMonthlyExpenditure != null ? new ResponseEntity<>("MonthlyExpenditure updated successfully", HttpStatus.OK) :
	                new ResponseEntity<>("MonthlyExpenditure not found", HttpStatus.NOT_FOUND);
	    }

	    
	    @GetMapping("/getMonthlyExpenditureForUser/{userName}")
	    public List<MonthlyExpenditure> getMonthlyExpenditureByUserName(@PathVariable("userName") String userName) {
	        return monthlyExpenditureService.getMonthlyExpenditureByUserName(userName);
	    }
	    
	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<String> deleteMonthlyExpenditure(@PathVariable long id) {
	        boolean deleted = monthlyExpenditureService.deleteMonthlyExpenditure(id);
	        if (deleted) {
	            return ResponseEntity.ok("MonthlyExpenditure with ID " + id + " deleted successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("MonthlyExpenditure with ID " + id + " not found");
	        }
	    }

}
