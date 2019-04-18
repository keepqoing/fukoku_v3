package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MNonActiveTimePerYearByM {
    @JsonProperty("_DATE")
    private String _date;
    @JsonProperty("LINE_NAME")
    private String lineName;
    @JsonProperty("STOPAUTOWAIT")
    private String stopautowait;
    @JsonProperty("STOPAUTOWAITS")
    private double stopautowaits;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("WORKINGTIME")
    private String workingtime;
    @JsonProperty("PLANINGNONWORKINGTIME")
    private String planingnonworkingtime;
    @JsonProperty("MAPPINGNAME")
    private String mappingName;
    @JsonProperty("JOINNAME")
    private String joinName;
    @JsonProperty("NON_OPERATING_TIME")
    private double non_operating_time;
    @JsonProperty("MONTHS")
    private String[] monthStopTime;
    private String jan="0",feb="0",mar="0",apr="0",may="0",jun="0",jul="0",aug="0",sept="0",oct="0",nov="0",dec="0";
    private String activeTime;
    private String stopTime;

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

    public double getStopautowaits() {
        return stopautowaits;
    }

    public void setStopautowaits(double stopautowaits) {
        this.stopautowaits = stopautowaits;
    }

    public double getNon_operating_time() {
        return non_operating_time;
    }

    public void setNon_operating_time(double non_operating_time) {
        this.non_operating_time = non_operating_time;
    }

    public MNonActiveTimePerYearByM() {

    }

    public String[] getMonthStopTime() {
        return monthStopTime;
    }

    public void setMonthStopTime(String[] monthStopTime) {
        this.monthStopTime = monthStopTime;
    }

    public String getMappingName() {
        return mappingName;
    }

    public void setMappingName(String mappingName) {
        this.mappingName = mappingName;
    }

    public String getJoinName() {
        return joinName;
    }

    public void setJoinName(String joinName) {
        this.joinName = joinName;
    }

    public MNonActiveTimePerYearByM(String mappingName, String joinName, String lineName) {
        this.mappingName = mappingName;
        this.joinName = joinName;
        this.lineName = lineName;

    }

    public MNonActiveTimePerYearByM(String machine) {
        this.machine = machine;
    }

    public MNonActiveTimePerYearByM(String _date, String lineName, String stopautowait, String machine, String workingtime, String planingnonworkingtime) {
        this._date = _date;
        this.lineName = lineName;
        this.stopautowait = stopautowait;
        this.machine = machine;
        this.workingtime = workingtime;
        this.planingnonworkingtime = planingnonworkingtime;
    }


    public MNonActiveTimePerYearByM(String lineName, String machine, String jan, String feb, String mar, String apr, String may, String jun, String jul, String aug, String sept, String oct, String nov, String dec, String activeTime, String stopTime, String planingnonworkingtime) {
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


    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getStopautowait() {
        return stopautowait;
    }

    public void setStopautowait(String stopautowait) {
        this.stopautowait = stopautowait;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(String activeTime) {
        this.activeTime = activeTime;
    }

    public String getWorkingtime() {
        return workingtime;
    }

    public void setWorkingtime(String workingtime) {
        this.workingtime = workingtime;
    }

    public String getStopTime() {
        return stopTime;
    }

    public void setStopTime(String stopTime) {
        this.stopTime = stopTime;
    }

    public String getPlaningnonworkingtime() {
        return planingnonworkingtime;
    }

    public void setPlaningnonworkingtime(String planingnonworkingtime) {
        this.planingnonworkingtime = planingnonworkingtime;
    }
}
