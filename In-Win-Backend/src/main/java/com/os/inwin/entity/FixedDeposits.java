package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class FixedDeposits {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String years;
	private String bankName;
	private LocalDate fixedDate;
	private double totalAmount;
	private LocalDate lastUpdateDate;
    private String userName;
	public FixedDeposits() {
		super();
	
	}
	public FixedDeposits(Long id, String name, String years, String bankName, LocalDate fixedDate, double totalAmount,
			LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.name = name;
		this.years = years;
		this.bankName = bankName;
		this.fixedDate = fixedDate;
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
	public String getYears() {
		return years;
	}
	public void setYears(String years) {
		this.years = years;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public LocalDate getFixedDate() {
		return fixedDate;
	}
	public void setFixedDate(LocalDate fixedDate) {
		this.fixedDate = fixedDate;
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
