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

import com.os.inwin.entity.Silver;
import com.os.inwin.entity.SilverPriceResponse;
import com.os.inwin.repository.SilverRepository;
import com.os.inwin.service.SilverService;

import jakarta.transaction.Transactional;

@Service
public class SilverServiceImpl implements SilverService{

	@Autowired
	private SilverRepository silverRepository;
	
	
	public double calculateTotalCurrentValue(String userName) {
        Iterable<Silver> silvers = silverRepository.findByUserName(userName);
        double totalValue = 0.0;

        for (Silver silver : silvers) {
            totalValue += silver.getCurrentPrice() * (silver.getQuantity()*1000);
        }

        return totalValue;
    }
	@Override
	public List<Silver> getAllSilvers() {
		
		return silverRepository.findAll();
	}

	@Override
	public Silver saveSilver(Silver silver) {
		
		silver.setLastUpdateDate(LocalDate.now());
		return silverRepository.save(silver);
	}

	

	@Override
	public List<Silver> getSilverByUserName(String userName) {
		
		return silverRepository.findByUserName(userName);
	}

	@Override
	public Silver updateSilver(Long id, Silver silver) {
		Optional<Silver> optionalSilver = silverRepository.findById(id);
	    if (optionalSilver.isPresent()) {
	    	Silver existingSilver= optionalSilver.get();
	    	existingSilver.setName(silver.getName());
	    	existingSilver.setQuantity(silver.getQuantity()*1000);
	    	existingSilver.setBuyDate(silver.getBuyDate());
	    	existingSilver.setPurchasePrice(silver.getPurchasePrice());
	    	existingSilver.setLastUpdateDate(LocalDate.now());
	        return silverRepository.save(existingSilver);
	    }
	    return null;
		
	}

	@Override
	public boolean deleteSilver(long id) {
		Optional<Silver> optionalSilver = silverRepository.findById(id);
		if(optionalSilver.isPresent()) {
			silverRepository.deleteById(id);
			return true;
		}
		else
		return false;
	}

	 public SilverPriceResponse getPlatinumPricePerKgInIndia() {
	        String url = "https://www.goldpriceindia.com/silver-price-india.php";
	        try {
	            // Fetch the HTML content of the URL
	            Document doc = Jsoup.connect(url).get();
	            // Extract the table containing silver prices
	            Element table = doc.select("table").first(); // Assuming the first table on the page contains the prices
	            // Extract the rows of the table
	            Elements rows = table.select("tr");
	            // Find the row containing the silver price per kilogram
	            Element row = null;
	            for (Element r : rows) {
	                if (r.text().contains("1 gram")) {
	                    row = r;
	                    break;
	                }
	            }
	            // Ensure the row is found
	            if (row == null) {
	                throw new RuntimeException("Row containing silver price per kilogram not found.");
	            }
	            // Extract the price for 1 kilogram from the third column
	            Elements columns = row.select("td");
	            double pricePerKg = parsePrice(columns.get(1).text());
	            // Update silver price in the database
	            updateSilverPrices(pricePerKg);
	            // Create a SilverPriceResponse object
	            return new SilverPriceResponse(pricePerKg);
	        } catch (IOException e) {
	            throw new RuntimeException("Error fetching silver price", e);
	        }
	    }

    private double parsePrice(String priceString) {
        String cleanPrice = priceString.replaceAll("[^\\d.]+", "");
        return Double.parseDouble(cleanPrice);
    }

    @Transactional
    private void updateSilverPrices(double pricePerKg) {
        // Retrieve all silver entries from the database
        List<Silver> silverList = silverRepository.findAll();
        for (Silver silver : silverList) {
            // Update the current price
            silver.setCurrentPrice(pricePerKg);
            // Update the last update date
            silver.setLastUpdateDate(LocalDate.now());
        }
        // Save the updated silver entries
        silverRepository.saveAll(silverList);
    }

}

