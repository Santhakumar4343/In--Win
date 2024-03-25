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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.Stock;
import com.os.inwin.serviceImpl.StockServiceImpl;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockServiceImpl stockService;

 
   
    @GetMapping("/totalStocksPrice/{userName}")
    public Map<String, Double> getTotalCurrentValue(@PathVariable String userName) {
        double totalPrice = stockService.calculateTotalCurrentValue(userName);
        Map<String, Double> response = new HashMap<>();
        response.put("totalPrice", totalPrice);
        return response;
    }

    
    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Stock> saveStock(@RequestBody Stock stock) {
        Stock savedStock = stockService.saveStock(stock);
        return new ResponseEntity<>(savedStock, HttpStatus.CREATED);
    }

    @PostMapping("/update-prices")
    public ResponseEntity<String> updateStockPrices() {
        stockService.updateStockPrices();
        return new ResponseEntity<>("Stock prices updated successfully", HttpStatus.OK);
    }
    
    @PutMapping("/updateStock/{id}")
    public ResponseEntity<String> updateStock(@PathVariable long id, @RequestBody Stock stock) {
        Stock updatedStock = stockService.updateStock(id, stock);
        return updatedStock != null ? new ResponseEntity<>("Stock updated successfully", HttpStatus.OK) :
                new ResponseEntity<>("Stock not found", HttpStatus.NOT_FOUND);
    }

    
    @GetMapping("/getStocksForUser/{userName}")
    public List<Stock> getStocksByUserName(@PathVariable("userName") String userName) {
        return stockService.getStocksByUserName(userName);
    }
    
    @DeleteMapping("/deleteStock/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable long id) {
        boolean deleted = stockService.deleteStock(id);
        if (deleted) {
            return ResponseEntity.ok("Stock with ID " + id + " deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock with ID " + id + " not found");
        }
    }
}
