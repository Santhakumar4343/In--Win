package com.os.inwin.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlphaVantageResponse {
    @JsonProperty("Global Quote")
    private GlobalQuote globalQuote;

    public GlobalQuote getGlobalQuote() {
        return globalQuote;
    }

    public void setGlobalQuote(GlobalQuote globalQuote) {
        this.globalQuote = globalQuote;
    }
}
