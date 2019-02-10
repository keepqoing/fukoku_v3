package kr.co.fukoku.filters;


import com.google.common.base.Strings;

public class AlarmStatisticsFilter {
    private String factory;
    private String line;
    private String machine;
    private String startYear;
    private String endYear;


    public AlarmStatisticsFilter() {
    }

    public AlarmStatisticsFilter(String factory, String line, String machine, String startYear, String endYear) {
        this.factory = factory;
        this.line = line;
        this.machine = machine;
        this.startYear = startYear;
        this.endYear = endYear;
    }

    public String getFactory() {
        if(Strings.isNullOrEmpty(factory)) return "";
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public String getLine() {
        if(Strings.isNullOrEmpty(line)) return "";
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        if(Strings.isNullOrEmpty(machine)) return "";
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getStartYear() {
        if(Strings.isNullOrEmpty(startYear)) return "";
        return startYear;
    }

    public void setStartYear(String startYear) {
        this.startYear = startYear;
    }

    public String getEndYear() {
        if(Strings.isNullOrEmpty(endYear)) return "";
        return endYear;
    }

    public void setEndYear(String endYear) {
        this.endYear = endYear;
    }
}
