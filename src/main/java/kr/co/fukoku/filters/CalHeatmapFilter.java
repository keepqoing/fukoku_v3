package kr.co.fukoku.filters;

public class CalHeatmapFilter {
    private String line;
    private String machine;
    private String date;

    public CalHeatmapFilter() {
        line = "";
        machine = "";
        date = "";
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

    public void setMachine(String line) {
        this.machine = line;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
