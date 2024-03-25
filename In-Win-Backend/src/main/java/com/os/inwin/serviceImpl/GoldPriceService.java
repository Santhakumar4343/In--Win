package com.os.inwin.serviceImpl;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.os.inwin.entity.Gold;
import com.os.inwin.goldapi.MetalPriceApiResponse;
import com.os.inwin.repository.GoldRepository;

@Service
public class GoldPriceService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private GoldRepository goldRepository;

    public void updateAllGoldPrices() {
        Iterable<Gold> allGolds = goldRepository.findAll();
        for (Gold gold : allGolds) {
            double currentGoldPriceInUSD = getCurrentGoldPriceInUSD();
            double currentGoldPriceInINR = convertToINR(currentGoldPriceInUSD);
            gold.setCurrentPrice(currentGoldPriceInINR);
            gold.setLastUpdateDate(LocalDate.now());
            goldRepository.save(gold);
        }
    }

    private double getCurrentGoldPriceInUSD() {
        String apiUrl = "https://api.metalpriceapi.com/v1/latest?api_key=d317d1fb8a5c931a60dad6efd5e6529a";
        try {
            ResponseEntity<MetalPriceApiResponse> responseEntity = restTemplate.getForEntity(apiUrl, MetalPriceApiResponse.class);
            if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
                MetalPriceApiResponse response = responseEntity.getBody();
                double goldPrice = response.getRates().getGold(); // Accessing gold price directly
                System.out.println("Current Gold Price in USD: " + goldPrice);
                return goldPrice;
            } else {
                // Log error response status code
                System.err.println("Failed to fetch gold price. Status code: " + responseEntity.getStatusCodeValue());
                return 0.0;
            }
        } catch (Exception e) {
            // Log exception
            System.err.println("Failed to fetch gold price: " + e.getMessage());
            return 0.0;
        }
    }



    private double convertToINR(double priceUSD) {
        // Conversion logic remains the same
        return priceUSD * 82.8655956219;
    }
}
