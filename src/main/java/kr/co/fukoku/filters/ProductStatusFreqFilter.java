package kr.co.fukoku.filters;

public class ProductStatusFreqFilter {
    private String startDate;
    private String endDate;
    private String line;
    private String machine;

    public ProductStatusFreqFilter(){
        startDate = "";
        endDate = "";
        line = "";
        machine = "";
    }

    public ProductStatusFreqFilter(String startDate, String endDate, String line, String machine) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.line = line;
        this.machine = machine;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }
}
