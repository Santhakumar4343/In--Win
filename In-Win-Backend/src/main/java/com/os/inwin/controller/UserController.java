package com.os.inwin.controller;

import java.io.Console;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.os.inwin.entity.User;
import com.os.inwin.repository.UserRepository;
import com.os.inwin.serviceImpl.UserServiceImpl;

import jakarta.security.auth.message.AuthException;


@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserServiceImpl userService;
	@Autowired
	private UserRepository userRepository;
	private final Map<String, User> userMap = new HashMap<>();
   

	


	@GetMapping("/totalPFAmount/{userName}")
	public Map<String, Double> getTotalCurrentValue(@PathVariable String userName) {
	    double totalPF = userService.calculateTotalPFAmountForUser(userName);

	    Map<String, Double> response = new HashMap<>();
	    if (!Double.isNaN(totalPF)) {
	        response.put("totalPf", totalPF);
	    } else {
	        // Handle the situation where totalPF is NaN
	        response.put("error", 0.0); // Or any default value or error indication
	    }
	    return response;
	}


	
	
	@PostMapping("/save")
	public ResponseEntity<String> createUser(@RequestBody User user) {

		if (user != null) {
			userService.createUser(user);
			return new ResponseEntity<>("user create successfully", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>("user cant be null", HttpStatus.BAD_REQUEST);
		}
	}

//  
	@PostMapping("/send-otp")
	public ResponseEntity<String> sendOtp(@RequestBody User user) {
		if (user != null) {
			// Store the user data temporarily
			userMap.put(user.getUserName(), user);

			// Generate OTP and send it
			userService.sendOtpToSuperUser(user);

			return ResponseEntity.ok("OTP sent successfully: ");
		} else {
			return new ResponseEntity<>("User data cannot be null", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOtpAndSaveUser(@RequestParam String otp) {
		// Iterate over all users in temporary storage
		for (Map.Entry<String, User> entry : userMap.entrySet()) {
			String username = entry.getKey();
			User user = entry.getValue();

			// Call the verifyOtp method with the entered OTP for each user
			ResponseEntity<String> otpVerificationResult = userService.verifyOtp(user, otp);

			// If OTP verification succeeds, save the user data and remove it from temporary
			// storage
			if (otpVerificationResult.getStatusCode() == HttpStatus.OK) {
				userService.createUser(user);
				userMap.remove(username); // Remove the user data from temporary storage
				return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
			}
		}

		// If no matching OTP is found in temporary storage, OTP verification fails
		return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/getUser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable long id) {
		User user = userService.getUser(id);
		if (user != null) {
			return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() {

		List<User> users = userService.getAllUser();
		if (users != null) {
			return new ResponseEntity<>(users, HttpStatus.OK);

		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/updateUser-personal/{id}")
	public ResponseEntity<String> updateUserPersonalDetails(@PathVariable long id, @ModelAttribute User user, @RequestParam("image") MultipartFile imageFile) throws IOException {
	    User updateUser = userService.updateUserPersonalDetails(id, user, imageFile);
	    return updateUser != null ? new ResponseEntity<>("User Updated Successfully", HttpStatus.OK)
	            : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/updateUser-professional/{id}")
	public ResponseEntity<String> updateUserProfessionalDetails(@PathVariable long id, @RequestBody User user) {
		User updateUser = userService.updateUserProfessionalDetails(id, user);

		return updateUser != null ? new ResponseEntity<>("User Updated Successfully", HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>("User not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("Error deleting user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestParam String userName, @RequestParam String password) {
		try {
			User authenticatedUser = userService.login(userName, password);
			return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
		} catch (AuthException e) {
			if (e.getMessage().equals("Invalid username")) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Username not found
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Incorrect password
			}
		}
	}
	 @GetMapping("/allUsernames")
	    public List<String> getAllUsernames() {
	        return userRepository.findAllUserNames();
	    }

	    @GetMapping("/allEmails")
	    public List<String> getAllEmails() {
	        return userRepository.findAllEmails();
	    }

	   
	    @GetMapping("/getAllMobileNumber")
	    public List<String> getAllMobileNumbers() {
	        return userRepository.findAllMobileNumber();
	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    private Map<String, String> otpVerificationMap = new HashMap<>();

	    @PostMapping("/update-password")
	    public ResponseEntity<String> updatePassword(@RequestParam String email) {
	        // Update password functionality, generate OTP and send email
	        String updatedEmail = userService.updatePassword(email);
	        if (updatedEmail != null) {
	            return new ResponseEntity<>("Password reset initiated. Check your email.", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	    }

	    @PostMapping("/verify-otp/forgotpassword")
	    public ResponseEntity<String> verifyOtpForForgotpassword(@RequestParam String otp) {
	        // Check OTP for the provided email
	        String verifiedEmail = userService.verifyOtpForForgotPassword(otp);
	        if (verifiedEmail != null) {
	            // OTP verified successfully
	            otpVerificationMap.put(verifiedEmail, otp); // Store email and OTP in the map
	            return ResponseEntity.ok().body(verifiedEmail);
	        } else {
	            // Invalid OTP provided
	            return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
	        }
	    }
	    @PostMapping("/set-new-password")
	    private ResponseEntity<String> setNewPasswordForEmailAndOtp(@RequestParam String newPassword) {
	        // Retrieve email from otpVerificationMap
	    	System.err.println("password method called");
	      
	        String verifiedEmail = null;
	        for (Map.Entry<String, String> entry : otpVerificationMap.entrySet()) {
	            verifiedEmail = entry.getKey();
	            System.err.println("verified email is " + verifiedEmail);
	            break; // Assuming you only want to retrieve the first entry
	        }


	        if (verifiedEmail != null && !verifiedEmail.isEmpty()) {
	            // Update password functionality
	            Optional<User> optionalUser = userRepository.findByEmail(verifiedEmail);
	            if (optionalUser.isPresent()) {
	                User user = optionalUser.get();
	                // Set the new password for the user
	                user.setPassword(newPassword);
	                userRepository.save(user);
	                // Remove the entry from the map after updating the password
	                otpVerificationMap.remove(verifiedEmail);
	                return new ResponseEntity<>("Password updated successfully.", HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	            }
	        } else {
	            return new ResponseEntity<>("Email not verified", HttpStatus.BAD_REQUEST);
	        }
	    }


    
   
}
