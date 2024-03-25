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

import com.os.inwin.entity.Platinum;
import com.os.inwin.entity.PlatinumResponse;
import com.os.inwin.serviceImpl.PlatinumServiceImpl;

@RestController
@RequestMapping("/api/platinum")
public class PlatinumController {

	@Autowired
	private PlatinumServiceImpl platinumService;
	@GetMapping("/totalPlatinumPrice/{userName}")
	  public Map<String, Double> getTotalPlatinumPrice(@PathVariable String userName) {
	      double totalPrice = platinumService.calculateTotalCurrentValue(userName);
	      Map<String, Double> response = new HashMap<>();
	      response.put("totalPlatinumPrice", totalPrice);
	      return response;
	  }
	
	@GetMapping("/platinum-price")
	  public PlatinumResponse getPlatinumPrice() {
	      return platinumService.getPlatinumPricePerGramInIndia();
	  }
	 @GetMapping
	  public ResponseEntity<List<Platinum>> getAllPlatinums() {
	      List<Platinum> platinum = platinumService.getAllPlatinums();
	      return new ResponseEntity<>(platinum, HttpStatus.OK);
	  }
	   
	   @PostMapping("/save")
	   public ResponseEntity<Platinum> savePlatinum(@RequestBody Platinum platinum) {
		   Platinum savedPlatinum = platinumService.savePlatinum(platinum);
	       if (savedPlatinum != null) {
	           return new ResponseEntity<>(savedPlatinum, HttpStatus.CREATED);
	       } else {
	           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	       }
	   }
   
	   @GetMapping("/getPlatinumForUser/{userName}")
	   public List<Platinum> getPlatinumByUserName(@PathVariable("userName") String userName) {
	       return platinumService.getPlatinumByUserName(userName);
	   }
	   
	   @DeleteMapping("/deletePlatinum/{id}")
	   public ResponseEntity<String> deletePlatinum(@PathVariable long id) {
	       boolean deleted = platinumService.deletePlatinum(id);
	       if (deleted) {
	           return ResponseEntity.ok("Platinum with ID " + id + " deleted successfully");
	       } else {
	           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Platinum with ID " + id + " not found");
	       }
	   }
	   
	   @PutMapping("/updatePlatinum/{id}")
	   public ResponseEntity<String> updatePlatinum(@PathVariable long id, @RequestBody Platinum platinum) {
		   Platinum updatedPlatinum = platinumService.updatePlatinum(id, platinum);
	       return updatedPlatinum != null ? new ResponseEntity<>("Platinum updated successfully", HttpStatus.OK) :
	               new ResponseEntity<>("Platinum not found", HttpStatus.NOT_FOUND);
	   }

}
