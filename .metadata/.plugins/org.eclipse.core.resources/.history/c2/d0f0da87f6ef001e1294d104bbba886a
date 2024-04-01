package com.os.inwin.serviceImpl;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Nominee;
import com.os.inwin.entity.User;
import com.os.inwin.repository.NomineeRepository;
import com.os.inwin.repository.UserRepository;
import com.os.inwin.service.NomineeService;

import jakarta.security.auth.message.AuthException;


@Service
public class NomineeServiceImpl implements NomineeService{
	
	@Autowired
	private NomineeRepository nomineeRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JavaMailSender javaMailSender;
	@Override
	public Nominee createNominee(Nominee nominee) {
		
		return nomineeRepository.save(nominee);
	}
	@Override
	public Nominee getNominee(long id) {
		Optional<Nominee> user = nomineeRepository.findById(id);
		return user.orElse(null);
	}
	@Override
	public List<Nominee> getAllNominees() {
		return nomineeRepository.findAll();
	}
	@Override
	public Nominee UpdateNominee(long id, Nominee user) {
		Optional<Nominee> optionalNominee = nomineeRepository.findById(id);
		if (optionalNominee.isPresent()) {
			Nominee existingUser = optionalNominee.get();
			existingUser.setUserName(user.getUserName());
			existingUser.setEmail(user.getEmail());
			existingUser.setPassword(user.getPassword());
			existingUser.setMobileNumber(user.getMobileNumber());
			existingUser.setUserType(user.getUserType());
			return nomineeRepository.save(existingUser);

		}
		return null;
	}
	@Override
	public void deleteNominee(long id) {
		Optional<Nominee> optionalNominee = nomineeRepository.findById(id);
		if (optionalNominee.isPresent()) {
			nomineeRepository.deleteById(id);
		} else {
			
			throw new NoSuchElementException("Nominee with ID " + id + " not found");
		}
		
	}
	
	
	
	private final Map<String, String> otpCache = new ConcurrentHashMap<>();

	public String generateOtpAndSendEmail(Nominee nominee) {
		try {
			// Generate a random 6-digit OTP
			String otp = String.format("%06d", new Random().nextInt(1000000));

			// Save the OTP to the cache
			otpCache.put(nominee.getUserName(), otp);

			// Log the generated OTP for debugging (you can remove this in production)
			System.out.println("Generated OTP for user " + nominee.getUserName() + ": " + otp);

			// Return the generated OTP
			return otp;
		} catch (Exception e) {
			e.printStackTrace();
			return null; 
		}
	}

	public void sendOtpToOwner(Nominee nominee) {
		String ownerUsername = nominee.getOwner();
	    User user = userRepository.findByUserName(ownerUsername);
		// Generate a random 6-digit OTP and save it to the cache
		String otp = generateOtpAndSendEmail(nominee);

		System.err.println(user.getEmail()+"--------------------"+nominee.getUserName());
		sendOtpEmail(user.getEmail(), nominee.getUserName(), otp);
	}

	private void sendOtpEmail(String to, String username, String otp) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("OTP Verification");
		message.setText("Hello " + username + ",\n\nThe requested OTP is: " + otp);
		javaMailSender.send(message);
	}

	public ResponseEntity<String> verifyOtp(Nominee nominee, String enteredOtp) {
		try {
			// Retrieve the stored OTP from the cache
			String storedOtp = otpCache.get(nominee.getUserName());

			// Check if the storedOtp is null or empty
			if (storedOtp == null || storedOtp.isEmpty()) {
				return new ResponseEntity<>("Invalid OTP (Cache is empty)", HttpStatus.BAD_REQUEST);
			}

			// Compare the entered OTP with the stored OTP
			if (storedOtp.equals(enteredOtp)) {
				// If OTP matches, remove it from the cache
				otpCache.remove(nominee.getUserName());

				// OTP verification successful
				System.out.println("OTP verified successfully for user: " + nominee.getUserName());
				return new ResponseEntity<>("OTP verified successfully", HttpStatus.OK);
			} else {
				// OTP verification failed
				System.out.println("Invalid OTP (Mismatch)");
				return new ResponseEntity<>("Invalid OTP (Mismatch)", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("OTP verification failed");
			return new ResponseEntity<>("Failed to verify OTP", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	public User login(String userName, String password) throws AuthException {
//	    // Authenticate the user
//	    User user = userRepository.findByUserNameAndPassword(userName, password);
//
//	    if (user != null) {
//	        return user;
//	    } else {
//	        throw new AuthException("Invalid login credentials");
//	    }
//	}
	public Nominee login(String userName, String password) throws AuthException {
	    // Check if the user exists in the database
	    Nominee nominee = nomineeRepository.findByUserName(userName);

	    if (nominee != null) {
	       
	        if (nominee.getPassword().equals(password)) {
	            return nominee; 
	        } else {
	            throw new AuthException("Incorrect password");
	        }
	    } else {
	        throw new AuthException("Invalid username");
	    }
	}
	@Override
	public List<Nominee> getAllNomineesByOwner(String owner) {
		return  nomineeRepository.findByOwner(owner);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
