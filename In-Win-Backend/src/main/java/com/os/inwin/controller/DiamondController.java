package com.os.inwin.controller;

import java.io.IOException;
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

import com.os.inwin.entity.Diamond;
import com.os.inwin.serviceImpl.DiamondServiceImpl;

@RestController
@RequestMapping("/api/diamond")
public class DiamondController {
	
	@Autowired
	private DiamondServiceImpl diamondService;
	@GetMapping("/totalDiamondPrice/{userName}")
	  public Map<String, Double> getTotalGoldPrice(@PathVariable String userName) {
	      double totalPrice = diamondService.calculateTotalCurrentValue(userName);
	      Map<String, Double> response = new HashMap<>();
	      response.put("totalDiamondPrice", totalPrice);
	      return response;
	  }
	 @GetMapping("/updateDiamondPrices")
	    public String updateDiamondPrices() throws IOException {
		 diamondService.updateDiamondPrices();
	        return "Diamond prices updated successfully!";
	    }
	
	
	 @GetMapping
	  public ResponseEntity<List<Diamond>> getAllDiamonds() {
	      List<Diamond> diamonds = diamondService.getAllDiamonds();
	      return new ResponseEntity<>(diamonds, HttpStatus.OK);
	  }
	   
	   @PostMapping("/save")
	   public ResponseEntity<Diamond> saveDiamond(@RequestBody Diamond diamond) {
		   Diamond savedDiamond = diamondService.saveDiamond(diamond);
	       if (savedDiamond != null) {
	           return new ResponseEntity<>(savedDiamond, HttpStatus.CREATED);
	       } else {
	           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	       }
	   }

	   
	  
	   
	   @GetMapping("/getDiamondForUser/{userName}")
	   public List<Diamond> getDiamondByUserName(@PathVariable("userName") String userName) {
	       return diamondService.getDiamondByUserName(userName);
	   }
	   
	   @DeleteMapping("/deleteDiamond/{id}")
	   public ResponseEntity<String> deleteDiamond(@PathVariable long id) {
	       boolean deleted = diamondService.deleteDiamond(id);
	       if (deleted) {
	           return ResponseEntity.ok("Diamond with ID " + id + " deleted successfully");
	       } else {
	           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diamond with ID " + id + " not found");
	       }
	   }
	   
	   @PutMapping("/updateDiamond/{id}")
	   public ResponseEntity<String> updateDiamond(@PathVariable long id, @RequestBody Diamond diamond) {
		   Diamond updatedDiamond = diamondService.updateDiamond(id, diamond);
	       return updatedDiamond != null ? new ResponseEntity<>("Diamond updated successfully", HttpStatus.OK) :
	               new ResponseEntity<>("Diamond not found", HttpStatus.NOT_FOUND);
	   }
}
