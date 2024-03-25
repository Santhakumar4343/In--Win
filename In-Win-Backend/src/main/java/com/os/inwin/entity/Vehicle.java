package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Vehicle {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long  id;
	private String vehicleName;
	private String vehicleNumber;
	private double purchasePrice;
	private LocalDate buyDate;
	private int quantity;
	private LocalDate lastUpdateDate;
    private String userName;
	public Vehicle() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Vehicle(long id, String vehicleName, String vehicleNumber, double purchasePrice, LocalDate buyDate,
			int quantity, LocalDate lastUpdateDate, String userName) {
		super();
		this.id = id;
		this.vehicleName = vehicleName;
		this.vehicleNumber = vehicleNumber;
		this.purchasePrice = purchasePrice;
		this.buyDate = buyDate;
		this.quantity = quantity;
		this.lastUpdateDate = lastUpdateDate;
		this.userName = userName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getVehicleName() {
		return vehicleName;
	}
	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
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
