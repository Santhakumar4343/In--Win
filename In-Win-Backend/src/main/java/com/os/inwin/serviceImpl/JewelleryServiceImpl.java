package com.os.inwin.serviceImpl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Diamond;
import com.os.inwin.entity.Gold;
import com.os.inwin.entity.Jewellery;
import com.os.inwin.entity.Silver;
import com.os.inwin.entity.SilverPriceResponse;
import com.os.inwin.goldapi.GoldPriceResponse;
import com.os.inwin.repository.JewelleryRepository;
import com.os.inwin.service.JewelleryService;

import jakarta.transaction.Transactional;

@Service
public class JewelleryServiceImpl implements JewelleryService {

	@Autowired
	private JewelleryRepository jewelleryRepository;

	public double calculateTotalCurrentValue(String userName) {
	    Iterable<Jewellery> jewellerys = jewelleryRepository.findByUserName(userName);
	    double totalValue = 0.0;

	    for (Jewellery jewellery : jewellerys) {
	        double goldValue = jewellery.getGoldCurrentPrice() * jewellery.getGoldQuantity();
	        double diamondValue = jewellery.getDiamondCurrentPrice() * jewellery.getDiamondQuantity();
	        double silverValue = jewellery.getSilverCurrentPrice() * (jewellery.getSilverQuantity()*1000);
	        double platinumValue = jewellery.getPlatinumCurrentPrice() * jewellery.getPlatinumQuantity();
	        double totalPriceOfJewellery = goldValue + diamondValue + silverValue + platinumValue;
	        
	        jewellery.setTotalPriceOfJewellery(totalPriceOfJewellery);
	        
	        // Save the updated jewellery entity
	        jewelleryRepository.save(jewellery);
	        
	        // Add the total price of this jewellery item to the overall total
	        totalValue += totalPriceOfJewellery;
	    }

	    return totalValue;
	}
	@Override
	public Jewellery saveJewellery(Jewellery jewellery) {
		jewellery.setLastUpdateDate(LocalDate.now());
		return jewelleryRepository.save(jewellery);
	}

	@Override
	public List<Jewellery> getJewelleryByUserName(String userName) {
		return jewelleryRepository.findByUserName(userName);
	}

	@Override
	public Jewellery updateJewellery(Long id, Jewellery updatedJewellery) {
		Optional<Jewellery> optionalJewellery = jewelleryRepository.findById(id);
		if (optionalJewellery.isPresent()) {
			Jewellery existingJewellery = optionalJewellery.get();
			existingJewellery.setName(updatedJewellery.getName());
			existingJewellery.setMetal(updatedJewellery.getMetal());
			existingJewellery.setStone(updatedJewellery.getStone());
			existingJewellery.setGoldCarat(updatedJewellery.getGoldCarat());
			existingJewellery.setGoldQuantity(updatedJewellery.getGoldQuantity());
			existingJewellery.setDiamondShape(updatedJewellery.getDiamondShape());
			existingJewellery.setDiamondCarat(updatedJewellery.getDiamondCarat());
			existingJewellery.setDiamondQuantity(updatedJewellery.getDiamondQuantity());
            existingJewellery.setSilverQuantity(updatedJewellery.getSilverQuantity());
            existingJewellery.setPlatinumQuantity(updatedJewellery.getPlatinumQuantity());
			existingJewellery.setPurchasePrice(updatedJewellery.getPurchasePrice());
			existingJewellery.setBuyDate(updatedJewellery.getBuyDate());
			existingJewellery.setLastUpdateDate(LocalDate.now());

			return jewelleryRepository.save(existingJewellery);
		} else {

			return null;
		}
	}

	@Override
	public boolean deleteJewellery(long id) {
		Optional<Jewellery> optionalJewellery = jewelleryRepository.findById(id);
		if (optionalJewellery.isPresent()) {
			jewelleryRepository.deleteById(id);
			return true;
		} else
			return false;
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
	    List<Jewellery> jewelleryList = jewelleryRepository.findAll();
	    for (Jewellery jewellery : jewelleryList) {
	        // Check the carat and update the current price accordingly
	    	if(jewellery.getMetal().equals("gold")){
	        if ("24".equals(jewellery.getGoldCarat())) {
	        	jewellery.setGoldCurrentPrice(price24K);
	        } else if ("22".equals(jewellery.getGoldCarat())) {
	        	jewellery.setGoldCurrentPrice(price22K);
	        }
	        // Update the last update date
	        jewellery.setLastUpdateDate(LocalDate.now());
	        // Save the updated gold entry
	        jewelleryRepository.save(jewellery);
	    	}
	    }
	}
	
	
	
	 public void updateDiamondPrices() {
	        try {
	            // Make an HTTP request to fetch the webpage content
	            Document doc = Jsoup.connect("https://www.stonealgo.com/diamond-prices/").get();

	            // Define the section headers and their associated shapes
	            Map<String, String> sectionToShapeMapping = new HashMap<>();
	            sectionToShapeMapping.put("Round Diamonds", "Round");
	            sectionToShapeMapping.put("Oval Diamonds", "Oval");
	            sectionToShapeMapping.put("Emerald Diamonds", "Emerald");

	            // Iterate over the section headers and their associated prices
	            for (Map.Entry<String, String> entry : sectionToShapeMapping.entrySet()) {
	                String sectionHeader = entry.getKey();
	                String shape = entry.getValue();
	                // Get the prices for the current section
	                Map<String, Map<Double, Double>> prices = getPricesForSection(doc, sectionHeader);
	                // Update prices in the database
	                updateDiamondPricesInDatabase(shape, prices.get(sectionHeader));
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }

	 private Map<String, Map<Double, Double>> getPricesForSection(Document doc, String sectionHeader) {
		    Map<String, Map<Double, Double>> prices = new HashMap<>();
		    // Select the rows corresponding to the section header
		    Elements rows = doc.select("table tbody tr:has(td:contains(" + sectionHeader + "))");
		    // Extract prices from the selected rows
		    for (Element row : rows) {
		        Map<Double, Double> caratToPrice = new LinkedHashMap<>(); // Use LinkedHashMap to maintain insertion order
		        Elements cells = row.select("td");
		        String shape = cells.get(0).text(); // Extract the shape
		        // Start from index 1 to skip the first column (shape)
		        for (int i = 1; i < cells.size()-1; i++) {
		            // Calculate carat based on the index
		            double carat = i * 0.5;
		            if (i == 3) {
		                carat = 2.0; // For the fourth cell, set carat to 2.0
		            }
		            double price = Double.parseDouble(cells.get(i).text().replace("$", "").replace(",", ""));
		            caratToPrice.put(carat, price);
		            System.out.println(carat +  " " +price + "     "+shape );
		        }
		        prices.put(shape, caratToPrice);
		    }
		    // Remove duplicate carat values
		    prices.forEach((shape, caratPrices) -> {
		        Set<Double> uniqueCarats = new HashSet<>(caratPrices.keySet());
		        caratPrices.keySet().retainAll(uniqueCarats);
		    });
		    return prices;
		}



	    private double fetchExchangeRateFromAPI(String baseCurrency) throws IOException {
	        URL url = new URL("https://api.exchangerate-api.com/v4/latest/" + baseCurrency);
	        HttpURLConnection con = null;
	        try {
	            con = (HttpURLConnection) url.openConnection();
	            con.setRequestMethod("GET");

	            try (BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()))) {
	                String inputLine;
	                StringBuilder response = new StringBuilder();
	                while ((inputLine = in.readLine()) != null) {
	                    response.append(inputLine);
	                }

	                // Parse JSON response to get exchange rate
	                JSONObject jsonObject = new JSONObject(response.toString());
	                JSONObject rates = jsonObject.getJSONObject("rates");
	                return rates.getDouble("INR");
	            }
	        } finally {
	            if (con != null) {
	                con.disconnect();
	            }
	        }
	    }

	    @Transactional
	    private void updateDiamondPricesInDatabase(String shape, Map<Double, Double> prices) {
	        try {
	            // Fetch exchange rate
	            double exchangeRate = fetchExchangeRateFromAPI("USD");

	            // Retrieve existing diamond entries from the database based on shape
	            List<Jewellery> jewellerys = jewelleryRepository.findByDiamondShape(shape);
	            if (jewellerys.isEmpty()) {
	                System.out.println("No Jewellery found for shape: " + shape);
	                return;
	            }

	            for (Jewellery jewellery : jewellerys) {
	                // Update prices based on carat and convert to INR
	                String caratStr = jewellery.getDiamondCarat();
	                try {
	                    double carat = Double.parseDouble(caratStr);
	                    if (prices.containsKey(carat)) {
	                        double priceInUSD = prices.get(carat);
	                        double priceInINR = priceInUSD * exchangeRate;
	                        if(jewellery.getStone().equals("diamond")) {
	                        jewellery.setDiamondCurrentPrice(priceInINR);
	                        jewellery.setLastUpdateDate(LocalDate.now());
	                        }
	                        // Save the updated diamond entry
	                        jewelleryRepository.save(jewellery);
	                    } else {
	                        System.out.println("No price found for carat " + carat + " and shape " + shape);
	                    }
	                } catch (NumberFormatException e) {
	                    System.out.println("Error parsing carat value for diamond: " + jewellery.getId());
	                }
	            }
	        } catch (IOException e) {
	            System.out.println("Error fetching exchange rate from API: " + e.getMessage());
	        }
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
	            double pricePerKg = parsePriceSilver(columns.get(1).text());
	            // Update silver price in the database
	            updateSilverPrices(pricePerKg);
	            // Create a SilverPriceResponse object
	            return new SilverPriceResponse(pricePerKg);
	        } catch (IOException e) {
	            throw new RuntimeException("Error fetching silver price", e);
	        }
	    }

    private double parsePriceSilver(String priceString) {
        String cleanPrice = priceString.replaceAll("[^\\d.]+", "");
        return Double.parseDouble(cleanPrice);
    }

    @Transactional
    private void updateSilverPrices(double pricePerKg) {
        // Retrieve all silver entries from the database
        List<Jewellery> jewelleryList = jewelleryRepository.findAll();
        for (Jewellery jewellery : jewelleryList) {
            // Update the current price
        	if(jewellery.getMetal().equals("silver"))
        	jewellery.setSilverCurrentPrice(pricePerKg);
            // Update the last update date
        	jewellery.setLastUpdateDate(LocalDate.now());
        }
        // Save the updated silver entries
        jewelleryRepository.saveAll(jewelleryList);
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
