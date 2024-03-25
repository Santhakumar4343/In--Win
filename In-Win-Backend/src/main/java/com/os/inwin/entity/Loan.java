package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Loan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String loanType;
    private String bankName;
    private String loanName;
    private int tenureInYears;
    
    private double rateOfInterest;
    private double loanAmount;
    private double monthlyEMI;
    private LocalDate buyDate;
    private LocalDate lastUpdateDate;
    private String userName;
	public Loan() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Loan(Long id, String loanType, String bankName, String loanName, int tenureInYears, double rateOfInterest,
			double loanAmount, double monthlyEMI, LocalDate buyDate, LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.loanType = loanType;
		this.bankName = bankName;
		this.loanName = loanName;
		this.tenureInYears = tenureInYears;
		this.rateOfInterest = rateOfInterest;
		this.loanAmount = loanAmount;
		this.monthlyEMI = monthlyEMI;
		this.buyDate = buyDate;
		this.lastUpdateDate = lastUpdateDate;
		this.userName = userName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLoanType() {
		return loanType;
	}
	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getLoanName() {
		return loanName;
	}
	public void setLoanName(String loanName) {
		this.loanName = loanName;
	}
	public int getTenureInYears() {
		return tenureInYears;
	}
	public void setTenureInYears(int tenureInYears) {
		this.tenureInYears = tenureInYears;
	}
	public double getRateOfInterest() {
		return rateOfInterest;
	}
	public void setRateOfInterest(double rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}
	public double getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(double loanAmount) {
		this.loanAmount = loanAmount;
	}
	public double getMonthlyEMI() {
		return monthlyEMI;
	}
	public void setMonthlyEMI(double monthlyEMI) {
		this.monthlyEMI = monthlyEMI;
	}
	public LocalDate getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(LocalDate buyDate) {
		this.buyDate = buyDate;
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

