package kr.co.fukoku.filters;

public class WorkTimeCalendarFilter {
    private String line;
    private String shortDate;

    public WorkTimeCalendarFilter(){
        line = "";
        shortDate = "";
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getShortDate() {
        return shortDate;
    }

    public void setShortDate(String shortDate) {
        this.shortDate = shortDate;
    }
}
