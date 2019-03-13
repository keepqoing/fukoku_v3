package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Strings;


public class DashBoard2 {

    @JsonProperty("WORK_PLAN")
    private String work_plan;
    @JsonProperty("PLANNED_WORK_TIME")
    private double planned_work_time;
    @JsonProperty("WORKING_TIME")
    private double working_time;
    @JsonProperty("WK_NON_ACTIVE_TIME")
    private double wk_non_active_time;
    @JsonProperty("TARGET_PRODUCT_QTY")
    private double target_product_qty;
    @JsonProperty("THEORETICAL_CYCLE_TIME")
    private double theoretical_cycle_time;
    @JsonProperty("NON_ACTIVE_TIME")
    private double non_active_time;
    @JsonProperty("PLANNED_STOP_TIME")
    private double planned_stop_time;
    @JsonProperty("NON_PLANNED_STOP_TIME")
    private double non_planned_stop_time;
    @JsonProperty("TOTAL_PRODUCT")
    private double total_product;
    @JsonProperty("OK_PRODUCT")
    private double ok_product;
    @JsonProperty("NG_PRODUCT")
    private double ng_product;
    @JsonProperty("TIME_OPERATION_RATE")
    private double time_operation_rate;
    @JsonProperty("TOTAL_PRODUCT_RATE")
    private double total_product_rate;
    @JsonProperty("OK_PRODUCT_RATE")
    private double ok_product_rate;
    @JsonProperty("MACHINE_EFFICIENCY_RATE")
    private double machine_efficiency_rate;

    public DashBoard2() {
    }

    public DashBoard2(String work_plan, double planned_work_time, double working_time, double wk_non_active_time, double target_product_qty, double theoretical_cycle_time, double non_active_time, double planned_stop_time, double non_planned_stop_time, double total_product, double ok_product, double ng_product, double time_operation_rate, double total_product_rate, double ok_product_rate, double machine_efficiency_rate) {
        this.work_plan = work_plan;
        this.planned_work_time = planned_work_time;
        this.working_time = working_time;
        this.wk_non_active_time = wk_non_active_time;
        this.target_product_qty = target_product_qty;
        this.theoretical_cycle_time = theoretical_cycle_time;
        this.non_active_time = non_active_time;
        this.planned_stop_time = planned_stop_time;
        this.non_planned_stop_time = non_planned_stop_time;
        this.total_product = total_product;
        this.ok_product = ok_product;
        this.ng_product = ng_product;
        this.time_operation_rate = time_operation_rate;
        this.total_product_rate = total_product_rate;
        this.ok_product_rate = ok_product_rate;
        this.machine_efficiency_rate = machine_efficiency_rate;
    }

    public String getWork_plan() {
        if(Strings.isNullOrEmpty(work_plan)) return "";
        return work_plan;
    }

    public void setWork_plan(String work_plan) {
        this.work_plan = work_plan;
    }

    public double getPlanned_work_time() {
        return planned_work_time;
    }

    public void setPlanned_work_time(double planned_work_time) {
        this.planned_work_time = planned_work_time;
    }

    public double getWorking_time() {
        return working_time;
    }

    public void setWorking_time(double working_time) {
        this.working_time = working_time;
    }

    public double getWk_non_active_time() {
        return wk_non_active_time;
    }

    public void setWk_non_active_time(double wk_non_active_time) {
        this.wk_non_active_time = wk_non_active_time;
    }

    public double getTarget_product_qty() {
        return target_product_qty;
    }

    public void setTarget_product_qty(double target_product_qty) {
        this.target_product_qty = target_product_qty;
    }

    public double getTheoretical_cycle_time() {
        return theoretical_cycle_time;
    }

    public void setTheoretical_cycle_time(double theoretical_cycle_time) {
        this.theoretical_cycle_time = theoretical_cycle_time;
    }

    public double getNon_active_time() {
        return non_active_time;
    }

    public void setNon_active_time(double non_active_time) {
        this.non_active_time = non_active_time;
    }

    public double getPlanned_stop_time() {
        return planned_stop_time;
    }

    public void setPlanned_stop_time(double planned_stop_time) {
        this.planned_stop_time = planned_stop_time;
    }

    public double getNon_planned_stop_time() {
        return non_planned_stop_time;
    }

    public void setNon_planned_stop_time(double non_planned_stop_time) {
        this.non_planned_stop_time = non_planned_stop_time;
    }

    public double getTotal_product() {
        return total_product;
    }

    public void setTotal_product(double total_product) {
        this.total_product = total_product;
    }

    public double getOk_product() {
        return ok_product;
    }

    public void setOk_product(double ok_product) {
        this.ok_product = ok_product;
    }

    public double getNg_product() {
        return ng_product;
    }

    public void setNg_product(double ng_product) {
        this.ng_product = ng_product;
    }

    public double getTime_operation_rate() {
        return time_operation_rate;
    }

    public void setTime_operation_rate(double time_operation_rate) {
        this.time_operation_rate = time_operation_rate;
    }

    public double getTotal_product_rate() {
        return total_product_rate;
    }

    public void setTotal_product_rate(double total_product_rate) {
        this.total_product_rate = total_product_rate;
    }

    public double getOk_product_rate() {
        return ok_product_rate;
    }

    public void setOk_product_rate(double ok_product_rate) {
        this.ok_product_rate = ok_product_rate;
    }

    public double getMachine_efficiency_rate() {
        return machine_efficiency_rate;
    }

    public void setMachine_efficiency_rate(double machine_efficiency_rate) {
        this.machine_efficiency_rate = machine_efficiency_rate;
    }

    @Override
    public String toString() {
        return "DashBoard2{" +
                "work_plan='" + work_plan + '\'' +
                ", planned_work_time=" + planned_work_time +
                ", working_time=" + working_time +
                ", wk_non_active_time=" + wk_non_active_time +
                ", target_product_qty=" + target_product_qty +
                ", theoretical_cycle_time=" + theoretical_cycle_time +
                ", non_active_time=" + non_active_time +
                ", planned_stop_time=" + planned_stop_time +
                ", non_planned_stop_time=" + non_planned_stop_time +
                ", total_product=" + total_product +
                ", ok_product=" + ok_product +
                ", ng_product=" + ng_product +
                ", time_operation_rate=" + time_operation_rate +
                ", total_product_rate=" + total_product_rate +
                ", ok_product_rate=" + ok_product_rate +
                ", machine_efficiency_rate=" + machine_efficiency_rate +
                '}';
    }
}
