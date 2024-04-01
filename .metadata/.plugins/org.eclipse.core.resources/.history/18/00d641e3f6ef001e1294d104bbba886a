package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.Nominee;
import com.os.inwin.entity.User;
import com.os.inwin.serviceImpl.NomineeServiceImpl;

import jakarta.security.auth.message.AuthException;

@RestController
@RequestMapping("/api/nominees")
public class NomineeController {

	@Autowired
	private NomineeServiceImpl nomineeService;
	
	private final Map<String,Nominee> nomineeMap = new HashMap<>();
	
	
@GetMapping("/getNomineesForOwner/{owner}")
public  ResponseEntity<List<Nominee>> getNomineeForOwner(@PathVariable String owner){
	
	List<Nominee> allNominees=nomineeService.getAllNomineesByOwner(owner);
	if(allNominees!=null) {
		return new ResponseEntity<List<Nominee>> (allNominees,HttpStatus.OK);
	}
	else 
		return new ResponseEntity<List<Nominee>> (HttpStatus.NOT_FOUND);
}
	
	
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody Nominee nominee) {
		if (nominee != null) {
			// Store the user data temporarily
			nomineeMap.put(nominee.getUserName(), nominee);

			// Generate OTP and send it
			 nomineeService.sendOtpToOwner(nominee);

			return ResponseEntity.ok("OTP sent successfully");
		} else {
			return new ResponseEntity<>("Nominee data cannot be null", HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtpAndSaveNominee(@RequestParam String otp) {
		// Iterate over all users in temporary storage
		for (Map.Entry<String, Nominee> entry : nomineeMap.entrySet()) {
			String username = entry.getKey();
			Nominee nominee = entry.getValue();

			// Call the verifyOtp method with the entered OTP for each user
			ResponseEntity<String> otpVerificationResult = nomineeService.verifyOtp(nominee, otp);

			// If OTP verification succeeds, save the user data and remove it from temporary
			// storage
			if (otpVerificationResult.getStatusCode() == HttpStatus.OK) {
				nomineeService.createNominee(nominee);
			nomineeMap.remove(username); 
				return new ResponseEntity<>("Nominee created successfully", HttpStatus.CREATED);
			}
		}

		// If no matching OTP is found in temporary storage, OTP verification fails
		return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/getNominee/{id}")
	public ResponseEntity<Nominee> getNomineeById(@PathVariable long id) {
		Nominee user = nomineeService.getNominee(id);
		if (user != null) {
			return new ResponseEntity<>(nomineeService.getNominee(id), HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
	
	@GetMapping("/getAllNominees")
	public ResponseEntity<List<Nominee>> getAllUsers() {

		List<Nominee> nominees = nomineeService.getAllNominees();
		if (nominees != null) {
			return new ResponseEntity<>(nominees, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	@PutMapping("/updateNominee/{id}")
	public ResponseEntity<String> updateNominee(@PathVariable long id, @RequestBody Nominee nominee) {
		Nominee updateNominee = nomineeService.UpdateNominee(id, nominee);

		return updateNominee != null ? new ResponseEntity<>("Nominee Updated Successfully", HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			nomineeService.deleteNominee(id);
			return new ResponseEntity<>("Nominee deleted successfully", HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>("Nominee not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Error deleting Nominee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Nominee> login(@RequestParam String userName, @RequestParam String password) {
	    try {
	        Nominee authenticatedUser = nomineeService.login(userName, password);
	        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
	    } catch (AuthException e) {
	        if (e.getMessage().equals("Invalid username")) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Username not found
	        } else {
	            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Incorrect password
	        }
	    }
	}
	
}
