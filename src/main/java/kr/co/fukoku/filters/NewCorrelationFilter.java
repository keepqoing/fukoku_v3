package kr.co.fukoku.filters;

public class NewCorrelationFilter {
    private String line;
    private String machine1;
    private String machine2;
    private String process1;
    private String process2;
    private String startDate1;
    private String endDate1;
    private String startDate2;
    private String endDate2;

    public NewCorrelationFilter() {
    }

    public NewCorrelationFilter(String line, String machine1, String machine2, String process1, String process2, String startDate1, String endDate1, String startDate2, String endDate2) {
        this.line = line;
        this.machine1 = machine1;
        this.machine2 = machine2;
        this.process1 = process1;
        this.process2 = process2;
        this.startDate1 = startDate1;
        this.endDate1 = endDate1;
        this.startDate2 = startDate2;
        this.endDate2 = endDate2;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine1() {
        return machine1;
    }

    public void setMachine1(String machine1) {
        this.machine1 = machine1;
    }

    public String getMachine2() {
        return machine2;
    }

    public void setMachine2(String machine2) {
        this.machine2 = machine2;
    }

    public String getProcess1() {
        return process1;
    }

    public void setProcess1(String process1) {
        this.process1 = process1;
    }

    public String getProcess2() {
        return process2;
    }

    public void setProcess2(String process2) {
        this.process2 = process2;
    }

    public String getStartDate1() {
        return startDate1;
    }

    public void setStartDate1(String startDate1) {
        this.startDate1 = startDate1;
    }

    public String getEndDate1() {
        return endDate1;
    }

    public void setEndDate1(String endDate1) {
        this.endDate1 = endDate1;
    }

    public String getStartDate2() {
        return startDate2;
    }

    public void setStartDate2(String startDate2) {
        this.startDate2 = startDate2;
    }

    public String getEndDate2() {
        return endDate2;
    }

    public void setEndDate2(String endDate2) {
        this.endDate2 = endDate2;
    }

    @Override
    public String toString() {
        return "NewCorrelationFilter{" +
                "line='" + line + '\'' +
                ", machine1='" + machine1 + '\'' +
                ", machine2='" + machine2 + '\'' +
                ", process1='" + process1 + '\'' +
                ", process2='" + process2 + '\'' +
                ", startDate1='" + startDate1 + '\'' +
                ", endDate1='" + endDate1 + '\'' +
                ", startDate2='" + startDate2 + '\'' +
                ", endDate2='" + endDate2 + '\'' +
                '}';
    }
}
