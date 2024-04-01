package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

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
import com.os.inwin.repository.NomineeRepository;
import com.os.inwin.serviceImpl.NomineeServiceImpl;

import jakarta.security.auth.message.AuthException;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/nominees")
public class NomineeController {
	@Autowired
	private NomineeRepository nomineeRepository;
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
	@PutMapping("/updateNominee-personal/{id}")
	public ResponseEntity<String> updateNomineeProfile(@PathVariable long id, @RequestBody Nominee nominee) {
		Nominee updateNominee = nomineeService.UpdateNomineeProfile(id, nominee);

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
	
	
	
	
	
	
	
	
	
	
	
	 @PostMapping("/update-password")
	    public ResponseEntity<String> updatePassword(@RequestParam String email) {
	        // Update password functionality, generate OTP and send email
	        String updatedEmail = nomineeService.updatePassword(email);
	        if (updatedEmail != null) {
	            return new ResponseEntity<>("Password reset initiated. Check your email.", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	    }


	    @PostMapping("/verify-otp/forgotpassword")
	    public ResponseEntity<String> verifyOtpForForgotpassword(@RequestParam String otp, HttpSession session) {
	        // Check OTP for the provided email
	        String verifiedOtp = nomineeService.verifyOtpForForgotPassword(otp);
	        if (verifiedOtp != null) {
	            // OTP verified successfully, store the email in the session
	            String email = nomineeService.getEmailFromOTPVerification(verifiedOtp);
	            System.out.println(email);
	            session.setAttribute("verifiedEmail", email);
	            return new ResponseEntity<>("OTP verified successfully.", HttpStatus.OK);
	        } else {
	            // Invalid OTP provided
	            return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
	        }
	    }
	   

	    @PostMapping("/set-new-password")
	    public ResponseEntity<String> setNewPasswordForEmail(@RequestParam String newPassword, HttpSession session) {
	        // Get the email from the session
	        String email = (String) session.getAttribute("verifiedEmail");
	        if (email != null) {
	            // Update password functionality
	            Optional<Nominee> optionalUser = nomineeRepository.findByEmail(email);
	            if (optionalUser.isPresent()) {
	                Nominee user = optionalUser.get();
	                // Set the new password for the user
	                user.setPassword(newPassword);
	                nomineeRepository.save(user);
	                // Optionally, you can invalidate the session after updating the password
	                session.removeAttribute("verifiedEmail");
	                return new ResponseEntity<>("Password updated successfully.", HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	            }
	        } else {
	            return new ResponseEntity<>("Email not verified", HttpStatus.BAD_REQUEST);
	        }
	    }

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
