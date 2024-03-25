package com.os.inwin.serviceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Gold;
import com.os.inwin.goldapi.GoldPriceResponse;
import com.os.inwin.repository.GoldRepository;
import com.os.inwin.service.GoldService;

import jakarta.transaction.Transactional;

@Service
public class GoldServiceImpl implements GoldService{

	
	@Autowired
	private GoldRepository goldRepository;
	
	public double calculateTotalCurrentValue(String userName) {
        Iterable<Gold> golds = goldRepository.findByUserName(userName);
        double totalValue = 0.0;

        for (Gold gold : golds) {
            totalValue += gold.getCurrentPrice() * gold.getQuantity();
        }

        return totalValue;
    }
	@Override
	public List<Gold> getAllGolds() {
		
		return goldRepository.findAll();
	}

	@Override
	public Gold saveGold(Gold gold) {
		gold.setLastUpdateDate(LocalDate.now());
	        return  goldRepository.save(gold);
	}

	@Override
	public void updateGoldPrices() {	
	}

	@Override
	public List<Gold> getGoldByUserName(String userName) {
		
		return goldRepository.findByUserName(userName);
	}

	@Override
	public Gold updateGold(Long id, Gold gold) {
		 Optional<Gold> optionalGold = goldRepository.findById(id);
		    if (optionalGold.isPresent()) {
		        Gold existingGold= optionalGold.get();
		        existingGold.setName(gold.getName());
		        existingGold.setCarat(gold.getCarat());
		        existingGold.setQuantity(gold.getQuantity());
		        existingGold.setBuyDate(gold.getBuyDate());
		        existingGold.setPurchasePrice(gold.getPurchasePrice());
		        existingGold.setSymbol(gold.getSymbol());
		        existingGold.setLastUpdateDate(LocalDate.now());
		        return goldRepository.save(existingGold);
		    }
		    return null;
	}

	@Override
	public boolean deleteGold(long id) {
		 Optional<Gold> optionalGold= goldRepository.findById(id);
		    if (optionalGold.isPresent()) {
		    	goldRepository.deleteById(id);
		        return true; 
		    } else {
		        return false; 
		    }
	}
	public GoldPriceResponse getGoldPricePerGramInHyderabad() {
	    String url = "http://www.goldpriceindia.com/gold-price-hyderabad.php";
	    try {
	        // Fetch the HTML content of the URL
	        Document doc = Jsoup.connect(url).get();
	        // Extract the table containing gold prices
	        Element table = doc.select("table").first(); // Assuming the first table on the page contains the prices
	        // Extract the rows of the table
	        Elements rows = table.select("tr");
	        // Find the row containing the gold price per gram
	        Element row = null;
	        for (Element r : rows) {
	            if (r.text().contains("1 gram")) {
	                row = r;
	                break;
	            }
	        }
	        // Ensure the row is found
	        if (row == null) {
	            throw new RuntimeException("Row containing gold price per gram not found.");
	        }
	        // Extract the prices from the second and third columns for 24K and 22K
	        Elements columns = row.select("td");
	        double price24K = parsePrice(columns.get(1).text());
	        double price22K = parsePrice(columns.get(2).text());
	        // Update gold prices in the database
	        updateGoldPrices(price24K, price22K);
	        // Create a GoldPriceResponse object
	        return new GoldPriceResponse(price24K, price22K);
	    } catch (IOException e) {
	        throw new RuntimeException("Error fetching gold price", e);
	    }
	}

	private double parsePrice(String priceString) {
	    String cleanPrice = priceString.replaceAll("[^\\d.]+", "");
	    return Double.parseDouble(cleanPrice);
	}

	@Transactional
	private void updateGoldPrices(double price24K, double price22K) {
	    // Retrieve existing gold entries from the database
	    List<Gold> goldList = goldRepository.findAll();
	    for (Gold gold : goldList) {
	        // Check the carat and update the current price accordingly
	        if ("24".equals(gold.getCarat())) {
	            gold.setCurrentPrice(price24K);
	        } else if ("22".equals(gold.getCarat())) {
	            gold.setCurrentPrice(price22K);
	        }
	        // Update the last update date
	        gold.setLastUpdateDate(LocalDate.now());
	        // Save the updated gold entry
	        goldRepository.save(gold);
	    }
	}

}
