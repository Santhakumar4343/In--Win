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

import com.os.inwin.entity.Silver;
import com.os.inwin.entity.SilverPriceResponse;
import com.os.inwin.serviceImpl.SilverServiceImpl;

@RestController
@RequestMapping("/api/silver")
public class SilverController {
	@Autowired
	private SilverServiceImpl silverService;
	
	@GetMapping("/totalSilverPrice/{userName}")
	  public Map<String, Double> getTotalSilverPrice(@PathVariable String userName) {
	      double totalPrice = silverService.calculateTotalCurrentValue(userName);
	      Map<String, Double> response = new HashMap<>();
	      response.put("totalSilverPrice", totalPrice);
	      return response;
	  }
	@GetMapping("/silver-price")
	  public SilverPriceResponse getGoldPrice() {
	      return silverService.getPlatinumPricePerKgInIndia();
	  }
	 @GetMapping
	  public ResponseEntity<List<Silver>> getAllSilvers() {
	      List<Silver> silvers = silverService.getAllSilvers();
	      return new ResponseEntity<>(silvers, HttpStatus.OK);
	  }
	   
	   @PostMapping("/save")
	   public ResponseEntity<Silver> saveSilver(@RequestBody Silver silver) {
		   Silver savedSilver = silverService.saveSilver(silver);
	       if (savedSilver != null) {
	           return new ResponseEntity<>(savedSilver, HttpStatus.CREATED);
	       } else {
	           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	       }
	   }

	   
	  
	   
	   @GetMapping("/getSilverForUser/{userName}")
	   public List<Silver> getSilverByUserName(@PathVariable("userName") String userName) {
	       return silverService.getSilverByUserName(userName);
	   }
	   
	   @DeleteMapping("/deleteSilver/{id}")
	   public ResponseEntity<String> deleteSilver(@PathVariable long id) {
	       boolean deleted = silverService.deleteSilver(id);
	       if (deleted) {
	           return ResponseEntity.ok("Silver with ID " + id + " deleted successfully");
	       } else {
	           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Silver with ID " + id + " not found");
	       }
	   }
	   
	   @PutMapping("/updateSilver/{id}")
	   public ResponseEntity<String> updateSilver(@PathVariable long id, @RequestBody Silver silver) {
		   Silver updatedSilver = silverService.updateSilver(id, silver);
	       return updatedSilver != null ? new ResponseEntity<>("Silver updated successfully", HttpStatus.OK) :
	               new ResponseEntity<>("Silver not found", HttpStatus.NOT_FOUND);
	   }

}
