package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AntiquePieces {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String years;
	private LocalDate buyDate;
	private double price;
	private LocalDate lastUpdateDate;
    private String userName;
	public AntiquePieces() {
		super();
		
	}
	public AntiquePieces(Long id, String name, String years, LocalDate buyDate, double price, LocalDate lastUpdateDate,
			String userName) {
		super();
		this.id = id;
		this.name = name;
		this.years = years;
		this.buyDate = buyDate;
		this.price = price;
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
	public String getYears() {
		return years;
	}
	public void setYears(String years) {
		this.years = years;
	}
	public LocalDate getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(LocalDate buyDate) {
		this.buyDate = buyDate;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
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
