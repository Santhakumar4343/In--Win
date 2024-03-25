package com.os.inwin.entity;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExchangeRateResponse {
    @JsonProperty("rates")
    private Map<String, Double> rates;

    // Getters and setters
    @JsonProperty("rates")
    public Map<String, Double> getRates() {
        return rates;
    }

    @JsonProperty("rates")
    public void setRates(Map<String, Double> rates) {
        this.rates = rates;
    }
}
