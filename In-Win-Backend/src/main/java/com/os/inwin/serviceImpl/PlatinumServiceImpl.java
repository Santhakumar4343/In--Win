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
import com.os.inwin.entity.Platinum;
import com.os.inwin.entity.PlatinumResponse;
import com.os.inwin.repository.PlatinumRepository;
import com.os.inwin.service.PlatinumService;

import jakarta.transaction.Transactional;

@Service
public class PlatinumServiceImpl implements PlatinumService{
	@Autowired
	private PlatinumRepository platinumRepository;
	
	public double calculateTotalCurrentValue(String userName) {
        Iterable<Platinum> platinums = platinumRepository.findByUserName(userName);
        double totalValue = 0.0;

        for (Platinum platinum : platinums) {
            totalValue += platinum.getCurrentPrice() * platinum.getQuantity();
        }

        return totalValue;
    }
	@Override
	public List<Platinum> getAllPlatinums() {
		
		return platinumRepository.findAll();
	}

	@Override
	public Platinum savePlatinum(Platinum platinum) {
		platinum.setLastUpdateDate(LocalDate.now());
		
		return platinumRepository.save(platinum);
	}

	@Override
	public List<Platinum> getPlatinumByUserName(String userName) {
		
		return platinumRepository.findByUserName(userName);
	}

	@Override
	public Platinum updatePlatinum(Long id, Platinum platinum) {
		
		Optional<Platinum> optionalPlatinum = platinumRepository.findById(id);
	    if (optionalPlatinum.isPresent()) {
	    	Platinum existingPlatinum= optionalPlatinum.get();
	    	existingPlatinum.setName(platinum.getName());
	    	existingPlatinum.setQuantity(platinum.getQuantity());
	    	existingPlatinum.setBuyDate(platinum.getBuyDate());
	    	existingPlatinum.setPurchasePrice(platinum.getPurchasePrice());
	    	existingPlatinum.setLastUpdateDate(LocalDate.now());
	        return platinumRepository.save(existingPlatinum);
	    }
	    return null;
	}

	@Override
	public boolean deletePlatinum(long id) {
		Optional<Platinum> optionalPlatinum = platinumRepository.findById(id);
		if(optionalPlatinum.isPresent()) {
			platinumRepository.deleteById(id);
			return true;
		}
		else
		return false;
	}
	
	
	public PlatinumResponse getPlatinumPricePerGramInIndia() {
        String url = "https://www.goldpriceindia.com/platinum-price-india.php";
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
                throw new RuntimeException("Row containing platinum price per 1 gram  not found.");
            }
            // Extract the price for 1 kilogram from the third column
            Elements columns = row.select("td");
            double pricePerKg = parsePrice(columns.get(1).text());
            // Update silver price in the database
            updatePlatinumPrices(pricePerKg);
            // Create a SilverPriceResponse object
            return new PlatinumResponse(pricePerKg);
        } catch (IOException e) {
            throw new RuntimeException("Error fetching Platinum price", e);
        }
    }

private double parsePrice(String priceString) {
    String cleanPrice = priceString.replaceAll("[^\\d.]+", "");
    return Double.parseDouble(cleanPrice);
}

@Transactional
private void updatePlatinumPrices(double pricePerKg) {
    // Retrieve all silver entries from the database
    List<Platinum> PlatinumList = platinumRepository.findAll();
    for (Platinum platinum : PlatinumList) {
        // Update the current price
    	platinum.setCurrentPrice(pricePerKg);
        // Update the last update date
    	platinum.setLastUpdateDate(LocalDate.now());
    }
    // Save the updated silver entries
    platinumRepository.saveAll(PlatinumList);
}

}


