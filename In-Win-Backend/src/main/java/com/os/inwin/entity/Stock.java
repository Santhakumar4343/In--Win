package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String symbol;
	private double purchasePrice;
	private LocalDate buyDate;
	private int quantity;
	private double currentPrice;
	private LocalDate lastUpdateDate;
    private String userName;
	
	public Stock() {
		super();

	}

	public Stock(Long id, String name, String symbol, double purchasePrice, LocalDate buyDate, int quantity,
			double currentPrice, LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.name = name;
		this.symbol = symbol;
		this.purchasePrice = purchasePrice;
		this.buyDate = buyDate;
		this.quantity = quantity;
		this.currentPrice = currentPrice;
		this.lastUpdateDate = lastUpdateDate;
		this.userName = userName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public LocalDate getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(LocalDate buyDate) {
		this.buyDate = buyDate;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getCurrentPrice() {
		return currentPrice;
	}

	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}

	public LocalDate getLastUpdateDate() {
		return lastUpdateDate;
	}

	public void setLastUpdateDate(LocalDate lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
}
