package com.os.inwin.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Jewellery {

	@Id
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String metal;
	private String stone;
	private String goldCarat;
	private int goldQuantity;
	private double goldCurrentPrice;
	private String diamondShape;
	private String diamondCarat;
	private int diamondQuantity;
	private double diamondCurrentPrice;
	private double silverCurrentPrice;
	private double platinumCurrentPrice;
	private int silverQuantity;
	private int platinumQuantity;
	private double purchasePrice;
	private LocalDate buyDate;
	private LocalDate lastUpdateDate;
	private String userName;
	private Double totalPriceOfJewellery;
	
	
	
	public Jewellery() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Jewellery(long id, String name, String metal, String stone, String goldCarat, int goldQuantity,
			double goldCurrentPrice, String diamondShape, String diamondCarat, int diamondQuantity,
			double diamondCurrentPrice, double silverCurrentPrice, double platinumCurrentPrice, int silverQuantity,
			int platinumQuantity, double purchasePrice, LocalDate buyDate, LocalDate lastUpdateDate, String userName,
			Double totalPriceOfJewellery) {
		super();
		this.id = id;
		this.name = name;
		this.metal = metal;
		this.stone = stone;
		this.goldCarat = goldCarat;
		this.goldQuantity = goldQuantity;
		this.goldCurrentPrice = goldCurrentPrice;
		this.diamondShape = diamondShape;
		this.diamondCarat = diamondCarat;
		this.diamondQuantity = diamondQuantity;
		this.diamondCurrentPrice = diamondCurrentPrice;
		this.silverCurrentPrice = silverCurrentPrice;
		this.platinumCurrentPrice = platinumCurrentPrice;
		this.silverQuantity = silverQuantity;
		this.platinumQuantity = platinumQuantity;
		this.purchasePrice = purchasePrice;
		this.buyDate = buyDate;
		this.lastUpdateDate = lastUpdateDate;
		this.userName = userName;
		this.totalPriceOfJewellery = totalPriceOfJewellery;
	}



	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getMetal() {
		return metal;
	}



	public void setMetal(String metal) {
		this.metal = metal;
	}



	public String getStone() {
		return stone;
	}



	public void setStone(String stone) {
		this.stone = stone;
	}



	public String getGoldCarat() {
		return goldCarat;
	}



	public void setGoldCarat(String goldCarat) {
		this.goldCarat = goldCarat;
	}



	public int getGoldQuantity() {
		return goldQuantity;
	}



	public void setGoldQuantity(int goldQuantity) {
		this.goldQuantity = goldQuantity;
	}



	public double getGoldCurrentPrice() {
		return goldCurrentPrice;
	}



	public void setGoldCurrentPrice(double goldCurrentPrice) {
		this.goldCurrentPrice = goldCurrentPrice;
	}



	public String getDiamondShape() {
		return diamondShape;
	}



	public void setDiamondShape(String diamondShape) {
		this.diamondShape = diamondShape;
	}



	public String getDiamondCarat() {
		return diamondCarat;
	}



	public void setDiamondCarat(String diamondCarat) {
		this.diamondCarat = diamondCarat;
	}



	public int getDiamondQuantity() {
		return diamondQuantity;
	}



	public void setDiamondQuantity(int diamondQuantity) {
		this.diamondQuantity = diamondQuantity;
	}



	public double getDiamondCurrentPrice() {
		return diamondCurrentPrice;
	}



	public void setDiamondCurrentPrice(double diamondCurrentPrice) {
		this.diamondCurrentPrice = diamondCurrentPrice;
	}



	public double getSilverCurrentPrice() {
		return silverCurrentPrice;
	}



	public void setSilverCurrentPrice(double silverCurrentPrice) {
		this.silverCurrentPrice = silverCurrentPrice;
	}



	public double getPlatinumCurrentPrice() {
		return platinumCurrentPrice;
	}



	public void setPlatinumCurrentPrice(double platinumCurrentPrice) {
		this.platinumCurrentPrice = platinumCurrentPrice;
	}



	public int getSilverQuantity() {
		return silverQuantity;
	}



	public void setSilverQuantity(int silverQuantity) {
		this.silverQuantity = silverQuantity;
	}



	public int getPlatinumQuantity() {
		return platinumQuantity;
	}



	public void setPlatinumQuantity(int platinumQuantity) {
		this.platinumQuantity = platinumQuantity;
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



	public Double getTotalPriceOfJewellery() {
		return totalPriceOfJewellery;
	}



	public void setTotalPriceOfJewellery(Double totalPriceOfJewellery) {
		this.totalPriceOfJewellery = totalPriceOfJewellery;
	}




	
	
	
	
}
