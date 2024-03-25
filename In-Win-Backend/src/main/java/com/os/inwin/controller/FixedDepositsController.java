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

import com.os.inwin.entity.FixedDeposits;
import com.os.inwin.entity.Insurance;
import com.os.inwin.serviceImpl.FixedDepositsServiceImpl;

@RestController
@RequestMapping("/api/fixedDeposits")
public class FixedDepositsController {

	@Autowired
	private FixedDepositsServiceImpl fixedDepositsService;
	

	@GetMapping("/totalFDPrice/{userName}")
    public Map<String,Double> getTotalCurrentValue(@PathVariable String userName) {
        double totalPrice= fixedDepositsService.calculateTotalCurrentValue(userName);
        Map<String,Double> response=new HashMap<>();
        response.put("totalPrice", totalPrice);
       return response;
    }
	@GetMapping("/getAllFixedDeposit")
	public ResponseEntity<List<FixedDeposits>> getAllFixedDeposits() {
		List<FixedDeposits> fixedDeposit = fixedDepositsService.getAllFixedDeposits();
		return new ResponseEntity<>(fixedDeposit, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<FixedDeposits> saveFixedDeposit(@RequestBody FixedDeposits fixedDeposit) {
		FixedDeposits savedFixedDeposit = fixedDepositsService.saveFixedDeposit(fixedDeposit);
		return new ResponseEntity<>(savedFixedDeposit, HttpStatus.CREATED);
	}

	@PutMapping("/updateFixedDeposit/{id}")
	public ResponseEntity<String> updateFixedDeposit(@PathVariable long id, @RequestBody FixedDeposits fixedDeposit) {
		FixedDeposits updatedFixedDeposit = fixedDepositsService.updateFixedDeposits(id, fixedDeposit);
		return updatedFixedDeposit != null ? new ResponseEntity<>("FixedDeposit updated successfully", HttpStatus.OK)
				: new ResponseEntity<>("FixedDeposit not found", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/getFixedDepositForUser/{userName}")
	public List<FixedDeposits> getInsuranceByUserName(@PathVariable("userName") String userName) {
		return fixedDepositsService.getFixedDepositByUserName(userName);
	}

	@DeleteMapping("/deleteFixedDeposit/{id}")
	public ResponseEntity<String> deleteFixedDeposit(@PathVariable long id) {
		boolean deleted = fixedDepositsService.deleteFixedDeposit(id);
		if (deleted) {
			return ResponseEntity.ok("FixedDeposit with ID " + id + " deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("FixedDeposit with ID " + id + " not found");
		}
	}
	
}
