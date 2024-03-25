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

import com.os.inwin.entity.Gold;
import com.os.inwin.goldapi.GoldPriceResponse;
import com.os.inwin.serviceImpl.GoldPriceService;
import com.os.inwin.serviceImpl.GoldServiceImpl;


@RestController
@RequestMapping("/api/gold")
public class GoldController {
   @Autowired
   private GoldPriceService goldPriceService;
	
  @Autowired
   private GoldServiceImpl goldService;
  
  
  @GetMapping("/totalGoldPrice/{userName}")
  public Map<String, Double> getTotalGoldPrice(@PathVariable String userName) {
      double totalPrice = goldService.calculateTotalCurrentValue(userName);
      Map<String, Double> response = new HashMap<>();
      response.put("totalPrice", totalPrice);
      return response;
  }

  
  @GetMapping("/gold-price")
  public GoldPriceResponse getGoldPrice() {
      return goldService.getGoldPricePerGramInHyderabad();
  }
  @GetMapping
  public ResponseEntity<List<Gold>> getAllGolds() {
      List<Gold> golds = goldService.getAllGolds();
      return new ResponseEntity<>(golds, HttpStatus.OK);
  }
   
   @PostMapping("/save")
   public ResponseEntity<Gold> saveGold(@RequestBody Gold gold) {
       Gold savedGold = goldService.saveGold(gold);
       if (savedGold != null) {
           return new ResponseEntity<>(savedGold, HttpStatus.CREATED);
       } else {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
   }

   
   @PostMapping("/updateAllPrices")
   public String updateAllGoldPrices() {
	   goldPriceService.updateAllGoldPrices();
       return "All gold prices updated successfully";
   }
   
   @GetMapping("/getGoldForUser/{userName}")
   public List<Gold> getGoldByUserName(@PathVariable("userName") String userName) {
       return goldService.getGoldByUserName(userName);
   }
   
   @DeleteMapping("/deleteGold/{id}")
   public ResponseEntity<String> deleteGold(@PathVariable long id) {
       boolean deleted = goldService.deleteGold(id);
       if (deleted) {
           return ResponseEntity.ok("Gold with ID " + id + " deleted successfully");
       } else {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gold with ID " + id + " not found");
       }
   }
   
   @PutMapping("/updateGold/{id}")
   public ResponseEntity<String> updateGold(@PathVariable long id, @RequestBody Gold gold) {
       Gold updatedGold = goldService.updateGold(id, gold);
       return updatedGold != null ? new ResponseEntity<>("Gold updated successfully", HttpStatus.OK) :
               new ResponseEntity<>("Gold not found", HttpStatus.NOT_FOUND);
   }
}
