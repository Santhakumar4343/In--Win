package com.os.inwin.goldapi;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MetalRates {
    
    @JsonProperty("XAU")
    private double gold;

    @JsonProperty("XAG")
    private double silver;

    @JsonProperty("EUR")
    private double euro;

	public double getGold() {
		return gold;
	}

	public void setGold(double gold) {
		this.gold = gold;
	}

	public double getSilver() {
		return silver;
	}

	public void setSilver(double silver) {
		this.silver = silver;
	}

	public double getEuro() {
		return euro;
	}

	public void setEuro(double euro) {
		this.euro = euro;
	}

    
}
