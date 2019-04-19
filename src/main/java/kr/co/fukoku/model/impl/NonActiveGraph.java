package kr.co.fukoku.model.impl;


import java.util.List;

public class NonActiveGraph {
    private List<String> months;

    private List<NonActiveData> data;

    public NonActiveGraph() {
    }

    public NonActiveGraph(List<String> months, List<NonActiveData> data) {
        this.months = months;
        this.data = data;
    }

    public List<String> getMonths() {
        return months;
    }

    public void setMonths(List<String> months) {
        this.months = months;
    }

    public List<NonActiveData> getData() {
        return data;
    }

    public void setData(List<NonActiveData> data) {
        this.data = data;
    }
}
