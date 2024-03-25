package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.os.inwin.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
	List<Stock> findByUserName(String userName);
	Stock findBySymbol(String symbol);
}

