package com.os.inwin.entity;

public class SilverPriceResponse {
    private double pricePerKg;

    public SilverPriceResponse(double pricePerKg) {
        this.pricePerKg = pricePerKg;
    }

	public double getPricePerKg() {
		return pricePerKg;
	}

	public void setPricePerKg(double pricePerKg) {
		this.pricePerKg = pricePerKg;
	}

    
}
