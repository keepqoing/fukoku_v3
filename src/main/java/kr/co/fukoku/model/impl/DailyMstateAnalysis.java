package kr.co.fukoku.model.impl;

public class DailyMstateAnalysis {

    private long id;
    private String line;
    private String machine;
    private String product_model;
    private String start_date;
    private String end_date;
    private String work_date;
    private String calendar_work_time_s;
    private String planned_work_time_s;
    private String planned_stop_time_s;
    private String working_time_s; // 부하시간
    private String target_working_time_s;
    private String run_time_s;
    private String stop_time_s;
    private String wait_time_s;
    private String manual_time_s;
    private String offline_time_s;
    private String active_time_s;
    private String non_active_time_s; // non_active_time
    private String non_planned_stop_time_s;
    private String working_nonactive_time_s;
    private String theoretical_cycle_time_s;
    private String process_cycle_time_s;
    private String alarm_time_s;
    private String fault_time_s;
    private String time_operation_rate;
    private String total_product_rate;
    private String ok_product_rate;
    private String machine_efficiency_rate;
    private String uph;
    private String target_product_qty;
    private String theoretical_product_qty;
    private String total_product;
    private String ok_product;
    private String ng_product;


    public DailyMstateAnalysis() {
    }




    public String getTheoretical_product_qty() {
        return theoretical_product_qty;
    }

    public void setTheoretical_product_qty(String theoretical_product_qty) {
        this.theoretical_product_qty = theoretical_product_qty;
    }

    public String getTotal_product() {
        return total_product;
    }

    public void setTotal_product(String total_product) {
        this.total_product = total_product;
    }

    public String getOk_product() {
        return ok_product;
    }

    public void setOk_product(String ok_product) {
        this.ok_product = ok_product;
    }

    public String getNg_product() {
        return ng_product;
    }

    public void setNg_product(String ng_product) {
        this.ng_product = ng_product;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getCalendar_work_time_s() {
        return calendar_work_time_s;
    }

    public void setCalendar_work_time_s(String calendar_work_time_s) {
        this.calendar_work_time_s = calendar_work_time_s;
    }

    public String getPlanned_work_time_s() {
        return planned_work_time_s;
    }

    public void setPlanned_work_time_s(String planned_work_time_s) {
        this.planned_work_time_s = planned_work_time_s;
    }

    public String getPlanned_stop_time_s() {
        return planned_stop_time_s;
    }

    public void setPlanned_stop_time_s(String planned_stop_time_s) {
        this.planned_stop_time_s = planned_stop_time_s;
    }

    public String getWorking_time_s() {
        return working_time_s;
    }

    public void setWorking_time_s(String working_time_s) {
        this.working_time_s = working_time_s;
    }

    public String getTarget_working_time_s() {
        return  target_working_time_s;
    }

    public void setTarget_working_time_s(String  target_working_time_s) {
        this.target_working_time_s =  target_working_time_s;
    }

    public String getRun_time_s() {
        return run_time_s;
    }

    public void setRun_time_s(String run_time_s) {
        this.run_time_s = run_time_s;
    }

    public String getStop_time_s() {
        return stop_time_s;
    }

    public void setStop_time_s(String stop_time_s) {
        this.stop_time_s = stop_time_s;
    }

    public String getWait_time_s() {
        return wait_time_s;
    }

    public void setWait_time_s(String wait_time_s) {
        this.wait_time_s = wait_time_s;
    }

    public String getManual_time_s() {
        return manual_time_s;
    }

    public void setManual_time_s(String manual_time_s) {
        this.manual_time_s = manual_time_s;
    }

    public String getOffline_time_s() {
        return offline_time_s;
    }

    public void setOffline_time_s(String offline_time_s) {
        this.offline_time_s = offline_time_s;
    }

    public String getActive_time_s() {
        return active_time_s;
    }

    public void setActive_time_s(String active_time_s) {
        this.active_time_s = active_time_s;
    }

    public String getNon_active_time_s() {
        return non_active_time_s;
    }

    public void setNon_active_time_s(String non_active_time_s) {
        this.non_active_time_s = non_active_time_s;
    }

    public String getNon_planned_stop_time_s() {
        return non_planned_stop_time_s;
    }

    public void setNon_planned_stop_time_s(String non_planned_stop_time_s) {
        this.non_planned_stop_time_s = non_planned_stop_time_s;
    }

    public String getWorking_nonactive_time_s() {
        return working_nonactive_time_s;
    }

    public void setWorking_nonactive_time_s(String working_nonactive_time_s) {
        this.working_nonactive_time_s = working_nonactive_time_s;
    }

    public String getTheoretical_cycle_time_s() {
        return theoretical_cycle_time_s;
    }

    public void setTheoretical_cycle_time_s(String theoretical_cycle_time_s) {
        this.theoretical_cycle_time_s = theoretical_cycle_time_s;
    }

    public String getProcess_cycle_time_s() {
        return process_cycle_time_s;
    }

    public void setProcess_cycle_time_s(String process_cycle_time_s) {
        this.process_cycle_time_s = process_cycle_time_s;
    }

    public String getAlarm_time_s() {
        return alarm_time_s;
    }

    public void setAlarm_time_s(String alarm_time_s) {
        this.alarm_time_s = alarm_time_s;
    }

    public String getFault_time_s() {
        return fault_time_s;
    }

    public void setFault_time_s(String fault_time_s) {
        this.fault_time_s = fault_time_s;
    }

    public String getTime_operation_rate() {
        return time_operation_rate;
    }

    public void setTime_operation_rate(String time_operation_rate) {
        this.time_operation_rate = time_operation_rate;
    }

    public String getTotal_product_rate() {
        return total_product_rate;
    }

    public void setTotal_product_rate(String total_product_rate) {
        this.total_product_rate = total_product_rate;
    }

    public String getOk_product_rate() {
        return ok_product_rate;
    }

    public void setOk_product_rate(String ok_product_rate) {
        this.ok_product_rate = ok_product_rate;
    }

    public String getMachine_efficiency_rate() {
        return machine_efficiency_rate;
    }

    public void setMachine_efficiency_rate(String machine_efficiency_rate) {
        this.machine_efficiency_rate = machine_efficiency_rate;
    }

    public String getUph() {
        return uph;
    }

    public void setUph(String uph) {
        this.uph = uph;
    }

    public String getTarget_product_qty() {
        return target_product_qty;
    }

    public void setTarget_product_qty(String target_product_qty) {
        this.target_product_qty = target_product_qty;
    }

    @Override
    public String toString() {
        return "DailyMstateAnalysis{" +
                "id=" + id +
                ", line='" + line + '\'' +
                ", machine='" + machine + '\'' +
                ", product_model='" + product_model + '\'' +
                ", start_date='" + start_date + '\'' +
                ", end_date='" + end_date + '\'' +
                ", work_date='" + work_date + '\'' +
                ", calendar_work_time_s='" + calendar_work_time_s + '\'' +
                ", planned_work_time_s='" + planned_work_time_s + '\'' +
                ", planned_stop_time_s='" + planned_stop_time_s + '\'' +
                ", working_time_s='" + working_time_s + '\'' +
                ",  target_working_time_s='" +  target_working_time_s + '\'' +
                ", run_time_s='" + run_time_s + '\'' +
                ", stop_time_s='" + stop_time_s + '\'' +
                ", wait_time_s='" + wait_time_s + '\'' +
                ", manual_time_s='" + manual_time_s + '\'' +
                ", offline_time_s='" + offline_time_s + '\'' +
                ", active_time_s='" + active_time_s + '\'' +
                ", non_active_time_s='" + non_active_time_s + '\'' +
                ", non_planned_stop_time_s='" + non_planned_stop_time_s + '\'' +
                ", working_nonactive_time_s='" + working_nonactive_time_s + '\'' +
                ", theoretical_cycle_time_s='" + theoretical_cycle_time_s + '\'' +
                ", process_cycle_time_s='" + process_cycle_time_s + '\'' +
                ", alarm_time_s='" + alarm_time_s + '\'' +
                ", fault_time_s='" + fault_time_s + '\'' +
                ", time_operation_rate='" + time_operation_rate + '\'' +
                ", total_product_rate='" + total_product_rate + '\'' +
                ", ok_product_rate='" + ok_product_rate + '\'' +
                ", machine_efficiency_rate='" + machine_efficiency_rate + '\'' +
                ", uph='" + uph + '\'' +
                ", target_product_qty='" + target_product_qty + '\'' +
                '}';
    }
}
