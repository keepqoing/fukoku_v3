package kr.co.fukoku.model.impl;

public class DailyMstateAnalysisFilter {

    private String line;
    private String machine;
    private String product_model;
    private String start_date;
    private String end_date;
    private String work_date;

    public DailyMstateAnalysisFilter() {
    }

    public DailyMstateAnalysisFilter(String line, String machine, String product_model, String start_date, String end_date, String work_date) {
        this.line = line;
        this.machine = machine;
        this.product_model = product_model;
        this.start_date = start_date;
        this.end_date = end_date;
        this.work_date = work_date;
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

    public String getProduct_model() {
        return product_model;
    }

    public void setProduct_model(String product_model) {
        this.product_model = product_model;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getWork_date() {
        return work_date;
    }

    public void setWork_date(String work_date) {
        this.work_date = work_date;
    }

    @Override
    public String toString() {
        return "DailyMstateAnalysisFilter{" +
                "line='" + line + '\'' +
                ", machine='" + machine + '\'' +
                ", product_model='" + product_model + '\'' +
                ", start_date='" + start_date + '\'' +
                ", end_date='" + end_date + '\'' +
                ", work_date='" + work_date + '\'' +
                '}';
    }
}
