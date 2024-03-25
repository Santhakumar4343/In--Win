
package com.os.inwin.goldapi;

public class GoldPriceResponse {
    
    private double perGramPrice24K;
    private double perGramPrice22K;

    public GoldPriceResponse(double perGramPrice24K, double perGramPrice22K) {
        this.perGramPrice24K = perGramPrice24K;
        this.perGramPrice22K = perGramPrice22K;
    }

    public double getPerGramPrice24K() {
        return perGramPrice24K;
    }

    public double getPerGramPrice22K() {
        return perGramPrice22K;
    }
}
