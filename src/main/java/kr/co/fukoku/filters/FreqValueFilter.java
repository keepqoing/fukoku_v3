package kr.co.fukoku.filters;


import kr.co.fukoku.utils.Helper;

public class FreqValueFilter {
    private String line;
    private String startDate;
    private String endDate;
    private int limit;

    public FreqValueFilter(){
        line = "";
        startDate = Helper.getCurrentDate();
        endDate = Helper.getCurrentDate();
        limit = 10;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
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

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
