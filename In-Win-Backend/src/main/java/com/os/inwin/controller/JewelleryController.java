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

import com.os.inwin.entity.Jewellery;
import com.os.inwin.goldapi.GoldPriceResponse;
import com.os.inwin.serviceImpl.JewelleryServiceImpl;

@RestController
@RequestMapping("/api/jewellery")
public class JewelleryController {

	@Autowired
	private JewelleryServiceImpl jewelleryService;

	
	@GetMapping("/totalJewelleryPrice/{userName}")
	public Map<String, Double> getTotalJewelleryPrice(@PathVariable String userName) {
	    double totalPrice = jewelleryService.calculateTotalCurrentValue(userName);
	    Map<String, Double> response = new HashMap<>();
	    response.put("totalPrice", totalPrice);
	    return response;
	}
	  @GetMapping("/jewellery-price")
	  public GoldPriceResponse getGoldPrice() {
		  jewelleryService.getPlatinumPricePerKgInIndia();  
		  jewelleryService.updateDiamondPrices();
	      return jewelleryService.getGoldPricePerGramInHyderabad();
	  }
	@PostMapping("/save")
	public ResponseEntity<Jewellery> saveJewellery(@RequestBody Jewellery jewellery) {
		Jewellery savedJewellery = jewelleryService.saveJewellery(jewellery);
		if (savedJewellery != null) {
			return new ResponseEntity<>(savedJewellery, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getJewelleryForUser/{userName}")
	public List<Jewellery> getJewelleryByUserName(@PathVariable("userName") String userName) {
		return jewelleryService.getJewelleryByUserName(userName);
	}

	@DeleteMapping("/deleteJewellery/{id}")
	public ResponseEntity<String> deleteJewellery(@PathVariable long id) {
		boolean deleted = jewelleryService.deleteJewellery(id);
		if (deleted) {
			return ResponseEntity.ok("Jewellery with ID " + id + " deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Jewellery with ID " + id + " not found");
		}
	}

	@PutMapping("/updateJewellery/{id}")
	public ResponseEntity<String> updateJewellery(@PathVariable long id, @RequestBody Jewellery jewellery) {
		Jewellery updatedJewellery = jewelleryService.updateJewellery(id, jewellery);
		return updatedJewellery != null ? new ResponseEntity<>("Jewellery updated successfully", HttpStatus.OK)
				: new ResponseEntity<>("Jewellery not found", HttpStatus.NOT_FOUND);
	}

}
