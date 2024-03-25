package com.os.inwin.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GlobalQuote {
    @JsonProperty("05. price")
    private double price;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
