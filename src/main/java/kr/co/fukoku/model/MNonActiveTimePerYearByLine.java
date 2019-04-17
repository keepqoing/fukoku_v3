package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MNonActiveTimePerYearByLine {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("MACHINE_NAME")
    private String machineName;

    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    @JsonProperty("_DATE")
    private String _date;
    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty("TOTAL_WAIT")
    private String total_wait;
    @JsonProperty("TOTAL_AUTO")
    private String total_auto;
    @JsonProperty("TOTAL_STOP")
    private String total_stop;
    @JsonProperty("TOTAL_OFFLINE")
    private String total_offline;
    @JsonProperty("TOTAL_MANUAL")
    private String total_manual;
    @JsonProperty("TOTAL_STOP_OFFLINE")
    private String total_stop_offline;
    @JsonProperty("PERCENTAGE")
    private String percentage;
    @JsonProperty("STOPAUTOWAIT")
    private String stopautowait;
    @JsonProperty("STOPAUTOWAITS")
    private double stopautowaits;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("WORKINGTIME")
    private String workingTime;
    @JsonProperty("PLANINGNONWORKINGTIME")
    private String planingnonworkingtime;
    @JsonProperty("MONTHS")
    private String[] monthStopTime;
    @JsonProperty("NON_OPERATING_TIME")
    private double non_operating_time;

    private String jan="0",feb="0",mar="0",apr="0",may="0",jun="0",jul="0",aug="0",sept="0",oct="0",nov="0",dec="0";
    private String activeTime;
    private String stopTime;

    public double getNon_operating_time() {
        return non_operating_time;
    }

    public void setNon_operating_time(double non_operating_time) {
        this.non_operating_time = non_operating_time;
    }


    public double getStopautowaits() {
        return stopautowaits;
    }

    public void setStopautowaits(double stopautowaits) {
        this.stopautowaits = stopautowaits;
    }

    public String getWorkingTime() {
        return workingTime;
    }

    public void setWorkingTime(String workingTime) {
        this.workingTime = workingTime;
    }

    public String getPlaningnonworkingtime() {
        return planingnonworkingtime;
    }

    public void setPlaningnonworkingtime(String planingnonworkingtime) {
        this.planingnonworkingtime = planingnonworkingtime;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getTotal_stop_offline() {
        return total_stop_offline;
    }

    public void setTotal_stop_offline(String total_stop_offline) {
        this.total_stop_offline = total_stop_offline;
    }

    public String getPercentage() {
        return percentage;
    }

    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }

    public String getStopautowait() {
        return stopautowait;
    }

    public void setStopautowait(String stopautowait) {
        this.stopautowait = stopautowait;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getTotal_wait() {
        return total_wait;
    }

    public void setTotal_wait(String total_wait) {
        this.total_wait = total_wait;
    }

    public String getTotal_auto() {
        return total_auto;
    }

    public void setTotal_auto(String total_auto) {
        this.total_auto = total_auto;
    }

    public String getTotal_stop() {
        return total_stop;
    }

    public void setTotal_stop(String total_stop) {
        this.total_stop = total_stop;
    }

    public String getTotal_offline() {
        return total_offline;
    }

    public void setTotal_offline(String total_offline) {
        this.total_offline = total_offline;
    }

    public String getTotal_manual() {
        return total_manual;
    }

    public void setTotal_manual(String total_manual) {
        this.total_manual = total_manual;
    }

    public MNonActiveTimePerYearByLine(){}

    public MNonActiveTimePerYearByLine(String lineName, String machineName, String _date, String total_stop, String total_offline, String stop_offline, String percentage) {
       this.lineName=lineName;
       this.machineName=machineName;
       this._date=_date;
       this.total_stop=total_stop;
       this.total_offline=total_offline;
       this.total_stop_offline=stop_offline;
       this.percentage=percentage;
    }

    public MNonActiveTimePerYearByLine(String lineName) {
        this.lineName = lineName;
    }
    public MNonActiveTimePerYearByLine(String machineName, String lineName) {
        this.machineName=machineName;
        this.lineName = lineName;
    }

    public MNonActiveTimePerYearByLine(String _date, String lineName, String stopautowait, String machine, String workingTime, String planingnonworkingtime) {
        this._date = _date;
        this.lineName = lineName;
        this.stopautowait = stopautowait;
        this.machine=machine;
        this.workingTime=workingTime;
        this.planingnonworkingtime=planingnonworkingtime;
    }
    public MNonActiveTimePerYearByLine(String lineName, String machine, String jan, String feb, String mar, String apr, String may, String jun, String jul, String aug, String sept, String oct, String nov, String dec, String activeTime, String stopTime, String planingnonworkingtime) {
        //this._date = _date;
        this.lineName = lineName;
        this.machine = machine;
        this.jan = jan;
        this.feb = feb;
        this.mar = mar;
        this.apr = apr;
        this.may = may;
        this.jun = jun;
        this.jul = jul;
        this.aug = aug;
        this.sept = sept;
        this.oct = oct;
        this.nov = nov;
        this.dec = dec;
        this.activeTime = activeTime;
        this.stopTime=stopTime;
        this.planingnonworkingtime = planingnonworkingtime;

    }

    public String[] getMonthStopTime() {
        return monthStopTime;
    }

    public void setMonthStopTime(String[] monthStopTime) {
        this.monthStopTime = monthStopTime;
    }

    public String getJan() {
        return jan;
    }

    public void setJan(String jan) {
        this.jan = jan;
    }

    public String getFeb() {
        return feb;
    }

    public void setFeb(String feb) {
        this.feb = feb;
    }

    public String getMar() {
        return mar;
    }

    public void setMar(String mar) {
        this.mar = mar;
    }

    public String getApr() {
        return apr;
    }

    public void setApr(String apr) {
        this.apr = apr;
    }

    public String getMay() {
        return may;
    }

    public void setMay(String may) {
        this.may = may;
    }

    public String getJun() {
        return jun;
    }

    public void setJun(String jun) {
        this.jun = jun;
    }

    public String getJul() {
        return jul;
    }

    public void setJul(String jul) {
        this.jul = jul;
    }

    public String getAug() {
        return aug;
    }

    public void setAug(String aug) {
        this.aug = aug;
    }

    public String getSept() {
        return sept;
    }

    public void setSept(String sept) {
        this.sept = sept;
    }

    public String getOct() {
        return oct;
    }

    public void setOct(String oct) {
        this.oct = oct;
    }

    public String getNov() {
        return nov;
    }

    public void setNov(String nov) {
        this.nov = nov;
    }

    public String getDec() {
        return dec;
    }

    public void setDec(String dec) {
        this.dec = dec;
    }

    public String getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(String activeTime) {
        this.activeTime = activeTime;
    }

    public String getStopTime() {
        return stopTime;
    }

    public void setStopTime(String stopTime) {
        this.stopTime = stopTime;
    }
    /*@Override
    public String toString() {
        return "Machine{" + "line=" + lineName + ", duration=" + stopautowait +", MachineName=" + machine +", Date=" + _date +", WorkingTime=" + workingTime +", Planingnonworkingtime=" + planingnonworkingtime + '}';
    }*/
}
