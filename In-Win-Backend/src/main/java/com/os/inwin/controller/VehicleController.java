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

import com.os.inwin.entity.Insurance;
import com.os.inwin.entity.Vehicle;
import com.os.inwin.serviceImpl.VehicleServiceImpl;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

	
	@Autowired
	private VehicleServiceImpl vechiService;
	
	  @GetMapping("/totalVehiclesPrice/{userName}")
	    public Map<String, Double> getTotalCurrentValue(@PathVariable String userName) {
	        double totalPrice=vechiService.calculateTotalCurrentValue(userName);
	        Map<String,Double> response=new HashMap<>();
	        response.put("totalPrice", totalPrice);
	        return response;
	    }

	@GetMapping("/getAllVehicles")
	public ResponseEntity<List<Vehicle>> getAllVehicles() {
		List<Vehicle> vehicle = vechiService.getAllVehicles();
		return new ResponseEntity<>(vehicle, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<Vehicle> saveVehicle(@RequestBody Vehicle vehicle) {
		Vehicle savedVehicle = vechiService.saveVehicle(vehicle);
		return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
	}

	@PutMapping("/updateVehicle/{id}")
	public ResponseEntity<String> updateVehicle(@PathVariable long id, @RequestBody Vehicle vehicle) {
		Vehicle updatedVehicle = vechiService.updateVehicle(id, vehicle);
		return updatedVehicle != null ? new ResponseEntity<>("Vehicle updated successfully", HttpStatus.OK)
				: new ResponseEntity<>("Vehicle not found", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/getVehiclesForUser/{userName}")
	public List<Vehicle> getVehicleByUserName(@PathVariable("userName") String userName) {
		return vechiService.getVehiclesByUserName(userName);
	}

	@DeleteMapping("/deleteVehicle/{id}")
	public ResponseEntity<String> deleteVehicle(@PathVariable long id) {
		boolean deleted = vechiService.deleteVehicle(id);
		if (deleted) {
			return ResponseEntity.ok("Vehicle with ID " + id + " deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle with ID " + id + " not found");
		}
	}
	
	
}
