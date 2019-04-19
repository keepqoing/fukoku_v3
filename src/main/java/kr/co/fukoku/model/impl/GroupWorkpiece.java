package kr.co.fukoku.model.impl;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.utils.Helper;

public class GroupWorkpiece {

    private long workpiece_cycle;
    private long pure_cycle;
    private long process_cycle;
    private long pure_interval;
    private String product_date;
    private String start_time;
    private String end_time;
    private String cvt_start_time;
    private String cvt_end_time;
    private String data;
    private String process_name;
    private String model;
    private long avg_lsl;
    private long avg_usl;
    private long min_lsl;
    private long max_lsl;
    private long min_usl;
    private long max_usl;
    private long min_rd;
    private long max_rd;
    private String rd;
    private String rp;
    private long rdArr[];
    private long total_rd;
    private long freq_total_wp_cycle;
    private long id;

    private long pd_id;

    private double cp;
    private double ppk;

    private long total_product;
    private long total_good_product;
    private long total_detective_product;
    private long max_total_product;

    private String pd_lsl;
    private String pd_usl;
    private String pd_start;
    private String pd_end;
    private String pd_seq;
    private String pd_cycle;
    private String pd_max_rd;

    private double dayUph;
    private double dayCp;
    private double dayCpk;
    private double dayWorkingTime;




    @JsonProperty("bar_values")
    private Object[][] barValues;

    @JsonProperty("lcl_values")
    private Object[][] lclValues;

    @JsonProperty("ucl_values")
    private Object[][] uclValues;

    @JsonProperty("bar_workpiece_cycle")
    private Object[][] bar_workpiece_cycle;

    @JsonProperty("bar_pure_cycle")
    private Object[][] bar_pure_cycle;

    @JsonProperty("bar_process_cycle")
    private Object[][] bar_process_cycle;

    @JsonProperty("bar_pure_interval")
    private Object[][] bar_pure_interval;

    public Object[][] getBarValues() {
        return barValues;
    }

    public void setBarValues(Object[][] barValues) {
        this.barValues = barValues;
    }

    public Object[][] getLclValues() {
        return lclValues;
    }

    public void setLclValues(Object[][] lclValues) {
        this.lclValues = lclValues;
    }

    public Object[][] getUclValues() {
        return uclValues;
    }

    public void setUclValues(Object[][] uclValues) {
        this.uclValues = uclValues;
    }

    public long getTotal_rd() {
        return total_rd;
    }

    public void setTotal_rd(long total_rd) {
        this.total_rd = total_rd;
    }

    public long getAvg_lsl() {
        return avg_lsl;
    }

    public void setAvg_lsl(long avg_lsl) {
        this.avg_lsl = avg_lsl;
    }

    public long getAvg_usl() {
        return avg_usl;
    }

    public void setAvg_usl(long avg_usl) {
        this.avg_usl = avg_usl;
    }

    public long getMin_rd() {
        return min_rd;
    }

    public void setMin_rd(long min_rd) {
        this.min_rd = min_rd;
    }

    public long getMax_rd() {
        return max_rd;
    }

    public void setMax_rd(long max_rd) {
        this.max_rd = max_rd;
    }

    public long[] getRdArr() {
        return rdArr;
    }

    public void setRdArr(long[] rdArr) {
        this.rdArr = rdArr;
    }

    public String getRd() {
        return rd;
    }

    public void setRd(String rd) {
        this.rd = rd;
    }

    public long getWorkpiece_cycle() {
        return workpiece_cycle;
    }

    public void setWorkpiece_cycle(long workpiece_cycle) {
        this.workpiece_cycle = workpiece_cycle;
    }

    public long getPure_cycle() {
        return pure_cycle;
    }

    public void setPure_cycle(long pure_cycle) {
        this.pure_cycle = pure_cycle;
    }

    public long getProcess_cycle() {
        return process_cycle;
    }

    public void setProcess_cycle(long process_cycle) {
        this.process_cycle = process_cycle;
    }

    public long getPure_interval() {
        return pure_interval;
    }

    public void setPure_interval(long pure_interval) {
        this.pure_interval = pure_interval;
    }

    public String getProduct_date() {
        return product_date;
    }

    public void setProduct_date(String product_date) {
        this.product_date = product_date;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getProcess_name() {
        return process_name;
    }

    public void setProcess_name(String process_name) {
        this.process_name = process_name;
    }

    public Object[][] getBar_workpiece_cycle() {
        return bar_workpiece_cycle;
    }

    public void setBar_workpiece_cycle(Object[][] bar_workpiece_cycle) {
        this.bar_workpiece_cycle = bar_workpiece_cycle;
    }

    public Object[][] getBar_pure_cycle() {
        return bar_pure_cycle;
    }

    public void setBar_pure_cycle(Object[][] bar_pure_cycle) {
        this.bar_pure_cycle = bar_pure_cycle;
    }

    public Object[][] getBar_process_cycle() {
        return bar_process_cycle;
    }

    public void setBar_process_cycle(Object[][] bar_process_cycle) {
        this.bar_process_cycle = bar_process_cycle;
    }

    public Object[][] getBar_pure_interval() {
        return bar_pure_interval;
    }

    public void setBar_pure_interval(Object[][] bar_pure_interval) {
        this.bar_pure_interval = bar_pure_interval;
    }

    public long getFreq_total_wp_cycle() {
        return freq_total_wp_cycle;
    }

    public void setFreq_total_wp_cycle(long freq_total_wp_cycle) {
        this.freq_total_wp_cycle = freq_total_wp_cycle;
    }

    public double getCp() {
        return cp;
    }

    public void setCp(double cp) {
        this.cp = cp;
    }

    public double getPpk() {
        return ppk;
    }

    public void setPpk(double ppk) {
        this.ppk = ppk;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getRp() {
        return rp;
    }

    public void setRp(String rp) {
        this.rp = rp;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getCvt_start_time() {
        String st = this.start_time;
        try{
            st = Helper.convertEpochToStringDate(st);
        }catch (Exception e){
            //e.printStackTrace();
        }
        return st;
    }

    public void setCvt_start_time(String cvt_start_time) {
        this.cvt_start_time = cvt_start_time;
    }

    public String getCvt_end_time() {
        String et = this.end_time;
        try{
            et = Helper.convertEpochToStringDate(et);
        }catch (Exception e){
          //  e.printStackTrace();
        }
        return et;
    }

    public void setCvt_end_time(String cvt_end_time) {
        this.cvt_end_time = cvt_end_time;
    }

    public long getMin_lsl() {
        return min_lsl;
    }

    public void setMin_lsl(long min_lsl) {
        this.min_lsl = min_lsl;
    }

    public long getMax_lsl() {
        return max_lsl;
    }

    public void setMax_lsl(long max_lsl) {
        this.max_lsl = max_lsl;
    }

    public long getMin_usl() {
        return min_usl;
    }

    public void setMin_usl(long min_usl) {
        this.min_usl = min_usl;
    }

    public long getMax_usl() {
        return max_usl;
    }

    public void setMax_usl(long max_usl) {
        this.max_usl = max_usl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTotal_product() {
        return total_product;
    }

    public void setTotal_product(long total_product) {
        this.total_product = total_product;
    }

    public long getTotal_good_product() {
        return total_good_product;
    }

    public void setTotal_good_product(long total_good_product) {
        this.total_good_product = total_good_product;
    }

    public long getTotal_detective_product() {
        return total_detective_product;
    }

    public void setTotal_detective_product(long total_detective_product) {
        this.total_detective_product = total_detective_product;
    }

    public long getMax_total_product() {
        return max_total_product;
    }

    public void setMax_total_product(long max_total_product) {
        this.max_total_product = max_total_product;
    }

    public String getPd_lsl() {
        return pd_lsl;
    }

    public void setPd_lsl(String pd_lsl) {
        this.pd_lsl = pd_lsl;
    }

    public String getPd_usl() {
        return pd_usl;
    }

    public void setPd_usl(String pd_usl) {
        this.pd_usl = pd_usl;
    }

    public String getPd_start() {
        return pd_start;
    }

    public void setPd_start(String pd_start) {
        this.pd_start = pd_start;
    }

    public String getPd_end() {
        return pd_end;
    }

    public void setPd_end(String pd_end) {
        this.pd_end = pd_end;
    }

    public String getPd_seq() {
        return pd_seq;
    }

    public void setPd_seq(String pd_seq) {
        this.pd_seq = pd_seq;
    }

    public String getPd_cycle() {
        return pd_cycle;
    }

    public void setPd_cycle(String pd_cycle) {
        this.pd_cycle = pd_cycle;
    }

    public void setPd_max_rd(String pd_max_rd) {
        this.pd_max_rd = pd_max_rd;
    }

    public String getPd_max_rd() {
        return pd_max_rd;
    }

    public void setPd_id(long pd_id) {
        this.pd_id = pd_id;
    }

    public long getPd_id() {
        return pd_id;
    }

    public double getDayUph() {
        return dayUph;
    }

    public void setDayUph(double dayUph) {
        this.dayUph = dayUph;
    }

    public double getDayCp() {
        return dayCp;
    }

    public void setDayCp(long dayCp) {
        this.dayCp = dayCp;
    }

    public double getDayCpk() {
        return dayCpk;
    }

    public void setDayCpk(double dayCpk) {
        this.dayCpk = dayCpk;
    }

    public void setDayCp(double dayCp) {
        this.dayCp = dayCp;
    }

    public double getDayWorkingTime() {
        return dayWorkingTime;
    }

    public void setDayWorkingTime(double dayWorkingTime) {
        this.dayWorkingTime = dayWorkingTime;
    }
}
