package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Diamond {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String shape;
	private String carat;
	private double purchasePrice;
	private LocalDate buyDate;
	private int quantity;
	private double currentPrice;
	private LocalDate lastUpdateDate;
    private String userName;
	public Diamond() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Diamond(Long id, String name, String shape, String carat, double purchasePrice, LocalDate buyDate,
			int quantity, double currentPrice, LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.name = name;
		this.shape = shape;
		this.carat = carat;
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
	public String getShape() {
		return shape;
	}
	public void setShape(String shape) {
		this.shape = shape;
	}
	public String getCarat() {
		return carat;
	}
	public void setCarat(String carat) {
		this.carat = carat;
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
