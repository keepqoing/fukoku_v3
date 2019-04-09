package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CalHeatmap {
    @JsonProperty("date")
    private String date;
    @JsonProperty("amount")
    private int amount;

    public CalHeatmap(){}

    public CalHeatmap(String date, int amount) {
        this.date = date;
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
