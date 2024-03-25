package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Stock;

public interface StockService {
    List<Stock> getAllStocks();
    Stock saveStock(Stock stock);
    void updateStockPrices();
    List<Stock> getStocksByUserName(String userName);
    Stock updateStock(Long id,Stock stock);
    boolean deleteStock(long id);
}


