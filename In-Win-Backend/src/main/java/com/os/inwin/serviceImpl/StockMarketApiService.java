package com.os.inwin.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.AlphaVantageResponse;
import com.os.inwin.entity.Stock; 
import com.os.inwin.repository.StockRepository; 

@Service
public class StockMarketApiService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private StockRepository stockRepository;

    private static final String BASE_URL = "https://www.alphavantage.co";
    private static final String API_KEY = "NKJ16P10309806JJ"; 
    private static final double EXCHANGE_RATE = 82.8655956219; // Exchange rate from USD to INR

    public double getCurrentPriceAndUpdate(String symbol) {
        // Check if the symbol exists in your database
        Stock stock = stockRepository.findBySymbol(symbol);
        if (stock == null) {
            System.out.println("Stock symbol not found in the database: " + symbol);
            return 0.0; // Return 0 or handle the case accordingly
        }

        String apiUrl = BASE_URL + "/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + API_KEY;
        System.out.println(symbol);
        AlphaVantageResponse response = restTemplate.getForObject(apiUrl, AlphaVantageResponse.class);
        if (response != null && response.getGlobalQuote() != null) {
            System.out.println(response.getGlobalQuote().getPrice());
            // Convert the price from USD to INR
            double priceInUSD = response.getGlobalQuote().getPrice();
            double currentPriceInINR = priceInUSD * EXCHANGE_RATE;
            
            // Update the current price in the database
            stock.setCurrentPrice(currentPriceInINR);
            stockRepository.save(stock);
            return currentPriceInINR;
        } else {
            return 0.0;
        }
    }
}
