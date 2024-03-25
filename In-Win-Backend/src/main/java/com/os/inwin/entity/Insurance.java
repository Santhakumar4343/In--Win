package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Insurance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private double premium;
	private LocalDate buyDate;
	private double totalAmount;
	private LocalDate lastUpdateDate;
    private String userName;
	public Insurance() {
		super();
		
	}
	public Insurance(Long id, String name, double premium, LocalDate buyDate, double totalAmount,
			LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.name = name;
		this.premium = premium;
		this.buyDate = buyDate;
		this.totalAmount = totalAmount;
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
	public double getPremium() {
		return premium;
	}
	public void setPremium(double premium) {
		this.premium = premium;
	}
	public LocalDate getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(LocalDate buyDate) {
		this.buyDate = buyDate;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
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
