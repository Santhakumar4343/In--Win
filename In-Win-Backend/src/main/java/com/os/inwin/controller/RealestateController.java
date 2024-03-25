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

import com.os.inwin.entity.Realestate;
import com.os.inwin.serviceImpl.RealestateServiceImpl;

@RestController
@RequestMapping("/api/realestate")
public class RealestateController {
	
	@Autowired
	private RealestateServiceImpl relRealestateService;
	
	@GetMapping("/totalRealestatePrice/{userName}")
    public Map<String,Double> getTotalCurrentValue(@PathVariable String userName) {
        double totalPrice= relRealestateService.calculateTotalCurrentValue(userName);
        
        Map <String,Double> response=new HashMap<>();
        response.put("totalPrice", totalPrice);
        return response;
        
    }
    @GetMapping
    public ResponseEntity<List<Realestate>> getAllRealestates() {
        List<Realestate> realestate = relRealestateService.getAllRealestate();
        return new ResponseEntity<>(realestate, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Realestate> saveRealestate(@RequestBody Realestate realestate) {
    	Realestate savedRealestate = relRealestateService.saveRealestate(realestate);
        return new ResponseEntity<>(savedRealestate, HttpStatus.CREATED);
    }

    @PutMapping("/updateRealestate/{id}")
    public ResponseEntity<String> updateRealestate(@PathVariable long id, @RequestBody Realestate realestate) {
    	Realestate updatedRealestate = relRealestateService.updateRealestate(id, realestate);
        return updatedRealestate != null ? new ResponseEntity<>("Realestate updated successfully", HttpStatus.OK) :
                new ResponseEntity<>("Realestate not found", HttpStatus.NOT_FOUND);
    }

    
    @GetMapping("/getRealestateForUser/{userName}")
    public List<Realestate> getStocksByUserName(@PathVariable("userName") String userName) {
        return relRealestateService.getRealestatesByUserName(userName);
    }
    
    @DeleteMapping("/deleteRealestate/{id}")
    public ResponseEntity<String> deleteRealestate(@PathVariable long id) {
        boolean deleted = relRealestateService.deleteRealestate(id);
        if (deleted) {
            return ResponseEntity.ok("Realestate with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Realestate with ID " + id + " not found");
        }
    }
}
