package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessAnalysis {
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("PRODUCT_MODEL")
    private String product_model;
    @JsonProperty("START_DATE")
    private String start_date;
    @JsonProperty("END_DATE")
    private String end_date;
    @JsonProperty("WORK_DATE")
    private String work_date;
    @JsonProperty("WORKING_TIME_H")
    private double working_time_h;
    @JsonProperty("ACTIVE_TIME_H")
    private double active_time_h;
    @JsonProperty("WORKING_NONACTIVE_TIME_H")
    private double working_nonactive_time_h;
    @JsonProperty("WORKING_NONACTIVE_TIME_RATE")
    private double working_nonactive_time_rate;
    @JsonProperty("UPH")
    private double uph;
    @JsonProperty("TOTAL_PRODUCT")
    private int total_product;
    @JsonProperty("OK_PRODUCT")
    private int ok_product;
    @JsonProperty("DEFECTIVE_PRODUCT")
    private int defective_product;
    @JsonProperty("DEFECTIVE_PRODUCT_RATE")
    private double defective_product_rate;
    @JsonProperty("NG_PRODUCT")
    private int ng_product;
    @JsonProperty("NG_PRODUCT_RATE")
    private double ng_product_rate;
    @JsonProperty("THEORETICAL_PRODUCT_QTY")
    private double theoretical_product_qty;

    @JsonProperty("PROCESS_CYCLE_TIME_S")
    private double process_cycle_time_s;


    @JsonProperty("TOTAL_PRODUCT_RATE")
    private double total_product_rate;
    @JsonProperty("TIME_OPERATION_RATE")
    private double time_operation_rate;
    @JsonProperty("OK_PRODUCT_RATE")
    private double ok_product_rate;
    @JsonProperty("TARGET_PRODUCT_QTY")
    private int target_product_qty;
    @JsonProperty("THEORETICAL_CYCLE_TIME_S")
    private double theoretical_cycle_time_s;
    @JsonProperty("BYPASSED_PRODUCT")
    private int bypassed_product;
    @JsonProperty("BYPASSED_PRODUCT_RATE")
    private double bypassed_product_rate;
    @JsonProperty("ROW_NUM")
    private int row_num;

    public ProcessAnalysis() {
    }

    public ProcessAnalysis(String line, String machine, String product_model, String start_date, String end_date, String work_date, double working_time_h, double active_time_h, double working_nonactive_time_h, double working_nonactive_time_rate, double uph, int total_product, int ok_product, int defective_product, double defective_product_rate, int ng_product, double ng_product_rate, double process_cycle_time_s, double theoretical_product_qty, int row_num, double total_product_rate, double time_operation_rate, double ok_product_rate, int target_product_qty, double theoretical_cycle_time_s, int bypassed_product, double bypassed_product_rate) {
        this.line = line;
        this.machine = machine;
        this.product_model = product_model;
        this.start_date = start_date;
        this.end_date = end_date;
        this.work_date = work_date;
        this.working_time_h = working_time_h;
        this.active_time_h = active_time_h;
        this.working_nonactive_time_h = working_nonactive_time_h;
        this.working_nonactive_time_rate = working_nonactive_time_rate;
        this.uph = uph;
        this.total_product = total_product;
        this.ok_product = ok_product;
        this.defective_product = defective_product;
        this.defective_product_rate = defective_product_rate;
        this.ng_product = ng_product;
        this.ng_product_rate = ng_product_rate;
        this.process_cycle_time_s = process_cycle_time_s;
        this.theoretical_product_qty = theoretical_product_qty;
        this.row_num = row_num;
        this.total_product_rate = total_product_rate;
        this.time_operation_rate = time_operation_rate;
        this.ok_product_rate = ok_product_rate;
        this.target_product_qty = target_product_qty;
        this.theoretical_cycle_time_s = theoretical_cycle_time_s;
        this.bypassed_product = bypassed_product;
        this.bypassed_product_rate = bypassed_product_rate;
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

    public double getWorking_time_h() {
        return working_time_h;
    }

    public void setWorking_time_h(double working_time_h) {
        this.working_time_h = working_time_h;
    }

    public double getActive_time_h() {
        return active_time_h;
    }

    public void setActive_time_h(double active_time_h) {
        this.active_time_h = active_time_h;
    }

    public double getWorking_nonactive_time_h() {
        return working_nonactive_time_h;
    }

    public void setWorking_nonactive_time_h(double working_nonactive_time_h) {
        this.working_nonactive_time_h = working_nonactive_time_h;
    }

    public double getWorking_nonactive_time_rate() {
        return working_nonactive_time_rate;
    }

    public void setWorking_nonactive_time_rate(double working_nonactive_time_rate) {
        this.working_nonactive_time_rate = working_nonactive_time_rate;
    }

    public double getUph() {
        return uph;
    }

    public void setUph(double uph) {
        this.uph = uph;
    }

    public int getTotal_product() {
        return total_product;
    }

    public void setTotal_product(int total_product) {
        this.total_product = total_product;
    }

    public int getOk_product() {
        return ok_product;
    }

    public void setOk_product(int ok_product) {
        this.ok_product = ok_product;
    }

    public int getDefective_product() {
        return defective_product;
    }

    public void setDefective_product(int defective_product) {
        this.defective_product = defective_product;
    }

    public double getDefective_product_rate() {
        return defective_product_rate;
    }

    public void setDefective_product_rate(double defective_product_rate) {
        this.defective_product_rate = defective_product_rate;
    }

    public int getNg_product() {
        return ng_product;
    }

    public void setNg_product(int ng_product) {
        this.ng_product = ng_product;
    }

    public double getNg_product_rate() {
        return ng_product_rate;
    }

    public void setNg_product_rate(double ng_product_rate) {
        this.ng_product_rate = ng_product_rate;
    }

    public double getProcess_cycle_time_s() {
        return process_cycle_time_s;
    }

    public void setProcess_cycle_time_s(double process_cycle_time_s) {
        this.process_cycle_time_s = process_cycle_time_s;
    }

    public double getTheoretical_product_qty() {
        return theoretical_product_qty;
    }

    public void setTheoretical_product_qty(double theoretical_product_qty) {
        this.theoretical_product_qty = theoretical_product_qty;
    }

    public int getRow_num() {
        return row_num;
    }

    public void setRow_num(int row_num) {
        this.row_num = row_num;
    }

    public double getTotal_product_rate() {
        return total_product_rate;
    }

    public void setTotal_product_rate(double total_product_rate) {
        this.total_product_rate = total_product_rate;
    }

    public double getTime_operation_rate() {
        return time_operation_rate;
    }

    public void setTime_operation_rate(double time_operation_rate) {
        this.time_operation_rate = time_operation_rate;
    }

    public double getOk_product_rate() {
        return ok_product_rate;
    }

    public void setOk_product_rate(double ok_product_rate) {
        this.ok_product_rate = ok_product_rate;
    }

    public int getTarget_product_qty() {
        return target_product_qty;
    }

    public void setTarget_product_qty(int target_product_qty) {
        this.target_product_qty = target_product_qty;
    }

    public double getTheoretical_cycle_time_s() {
        return theoretical_cycle_time_s;
    }

    public void setTheoretical_cycle_time_s(double theoretical_cycle_time_s) {
        this.theoretical_cycle_time_s = theoretical_cycle_time_s;
    }

    public int getBypassed_product() {
        return bypassed_product;
    }

    public void setBypassed_product(int bypassed_product) {
        this.bypassed_product = bypassed_product;
    }

    public double getBypassed_product_rate() {
        return bypassed_product_rate;
    }

    public void setBypassed_product_rate(double bypassed_product_rate) {
        this.bypassed_product_rate = bypassed_product_rate;
    }
}
