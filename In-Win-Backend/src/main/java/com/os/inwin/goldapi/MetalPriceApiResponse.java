package com.os.inwin.goldapi;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MetalPriceApiResponse {
    
    @JsonProperty("success")
    private boolean success;

    @JsonProperty("base")
    private String base;

    @JsonProperty("timestamp")
    private long timestamp;

    @JsonProperty("rates")
    private MetalRates rates;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getBase() {
		return base;
	}

	public void setBase(String base) {
		this.base = base;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public MetalRates getRates() {
		return rates;
	}

	public void setRates(MetalRates rates) {
		this.rates = rates;
	}

   
}
