package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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

import com.os.inwin.entity.Insurance;
import com.os.inwin.entity.Realestate;
import com.os.inwin.serviceImpl.InsuranceServiceImpl;

@RestController
@RequestMapping("/api/insurance")
public class InsuranceController {
	@Autowired
	private InsuranceServiceImpl insuranceServiceImpl;

	@GetMapping("/totalPermiumPrice/{userName}")
    public Map<String ,Double> getTotalCurrentValue(@PathVariable String userName) {
		double totalPrice=  insuranceServiceImpl.calculateTotalPremiumPrices(userName);
		Map<String,Double> response=new HashMap<>();
        response.put("totalPrice", totalPrice);
        return response;
    }
	@GetMapping("/getAllInsurances")
	public ResponseEntity<List<Insurance>> getAllInsurances() {
		List<Insurance> insurance = insuranceServiceImpl.getAllInsurances();
		return new ResponseEntity<>(insurance, HttpStatus.OK);
	}
	
	


	@PostMapping("/save")
	public ResponseEntity<Insurance> saveRealestate(@RequestBody Insurance insurance) {
		Insurance savedInsurance = insuranceServiceImpl.saveInsurance(insurance);
		return new ResponseEntity<>(savedInsurance, HttpStatus.CREATED);
	}

	@PutMapping("/updateInsurance/{id}")
	public ResponseEntity<String> updateInsurance(@PathVariable long id, @RequestBody Insurance insurance) {
		Insurance updatedRealestate = insuranceServiceImpl.updateInsurance(id, insurance);
		return updatedRealestate != null ? new ResponseEntity<>("Insurance updated successfully", HttpStatus.OK)
				: new ResponseEntity<>("Insurance not found", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/getInsuranceForUser/{userName}")
	public List<Insurance> getInsuranceByUserName(@PathVariable("userName") String userName) {
		return insuranceServiceImpl.getInsurancesByUserName(userName);
	}

	@DeleteMapping("/deleteInsurance/{id}")
	public ResponseEntity<String> deleteInsurance(@PathVariable long id) {
		boolean deleted = insuranceServiceImpl.deleteInsurance(id);
		if (deleted) {
			return ResponseEntity.ok("Insurance with ID " + id + " deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Insurance with ID " + id + " not found");
		}
	}

}
