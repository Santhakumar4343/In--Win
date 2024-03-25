package com.os.inwin.serviceImpl;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Stock;
import com.os.inwin.repository.StockRepository;
import com.os.inwin.service.StockService;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockMarketApiService stockMarketApiService;

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock saveStock(Stock stock) {
        stock.setLastUpdateDate(LocalDate.now());
        return stockRepository.save(stock);
    }

    @Override
    public void updateStockPrices() {
        List<Stock> stocks = stockRepository.findAll();
        for (Stock stock : stocks) {
            double currentPrice = stockMarketApiService.getCurrentPriceAndUpdate(stock.getSymbol());
            stock.setCurrentPrice(currentPrice);
            stock.setLastUpdateDate(LocalDate.now());
            stockRepository.save(stock);
        }
    }

	@Override
	public List<Stock> getStocksByUserName(String userName) {
		
		return stockRepository.findByUserName(userName);
	}
	@Override
	public Stock updateStock(Long id, Stock stock) {
	    Optional<Stock> optionalStock = stockRepository.findById(id);
	    if (optionalStock.isPresent()) {
	        Stock existingStock = optionalStock.get();
	        existingStock.setName(stock.getName());
	        existingStock.setQuantity(stock.getQuantity());
	        existingStock.setBuyDate(stock.getBuyDate());
	        existingStock.setPurchasePrice(stock.getPurchasePrice());
	       existingStock.setSymbol(stock.getSymbol());
	        return stockRepository.save(existingStock);
	    }
	    return null;
	}

	@Override
	public boolean deleteStock(long id) {
	    Optional<Stock> optionalStock = stockRepository.findById(id);
	    if (optionalStock.isPresent()) {
	        stockRepository.deleteById(id);
	        return true; // Deletion successful
	    } else {
	        return false; // Stock with given ID not found
	    }
	}
	public double calculateTotalCurrentValue(String userName) {
	    Iterable<Stock> stocks = stockRepository.findByUserName(userName);
	    double totalValue = 0.0;

	    for (Stock stock : stocks) {
	        totalValue += stock.getCurrentPrice() * stock.getQuantity();
	    }

	    return totalValue;
	}

}

