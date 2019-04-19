package kr.co.fukoku.model.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class WorkingTimeAnalysis implements Comparable{

    private int id;
    private String line;
    private String machine;
    private String product;
    private String type;
    private String crossDate;
    private String date;
    private String startTime;
    private String endTime;
    private String spStartTime;
    private String spStopTime;
    private String spStartDate;
    private String spEndDate;
    private long duration;
    private String sorter;
    private String status;
    private int assignWorkingTimeId;
    private String originStartTime;
    private String originEndTime;

    public WorkingTimeAnalysis(int id, String line, String machine, String product, String type, String crossDate, String date, String startTime, String endTime, String spStartTime, String spStopTime, String spStartDate, String spEndDate, long duration, String originStartTime, String originEndTime) {
        this.id = id;
        this.line = line;
        this.machine = machine;
        this.product = product;
        this.type = type;
        this.crossDate = crossDate;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.spStartTime = spStartTime;
        this.spStopTime = spStopTime;
        this.spStartDate = spStartDate;
        this.spEndDate = spEndDate;
        this.duration = duration;
        this.originStartTime = originStartTime;
        this.originEndTime = originEndTime;

    }

    public String getOriginStartTime() {
        return originStartTime;
    }

    public void setOriginStartTime(String originStartTime) {
        this.originStartTime = originStartTime;
    }

    public String getOriginEndTime() {
        return originEndTime;
    }

    public void setOriginEndTime(String originEndTime) {
        this.originEndTime = originEndTime;
    }

    public WorkingTimeAnalysis() {
    }

    public String getSpStartDate() {
        return spStartDate;
    }

    public void setSpStartDate(String spStartDate) {
        this.spStartDate = spStartDate;
    }

    public String getSpEndDate() {
        return spEndDate;
    }

    public void setSpEndDate(String spEndDate) {
        this.spEndDate = spEndDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCrossDate() {
        return crossDate;
    }

    public void setCrossDate(String crossDate) {
        this.crossDate = crossDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getSpStartTime() {
        return spStartTime;
    }

    public void setSpStartTime(String spStartTime) {
        this.spStartTime = spStartTime;
    }

    public String getSpStopTime() {
        return spStopTime;
    }

    public void setSpStopTime(String spStopTime) {
        this.spStopTime = spStopTime;
    }

    public String getSorter() {
        return Long.parseLong(convertStringDateToEpoch(  this.startTime, "yyyy-MM-dd HH:mm" ))+"";
    }

    public void setSorter(String sorter) {
        this.sorter = sorter;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setAssignWorkingTimeId(int assignWorkingTimeId) {
        this.assignWorkingTimeId = assignWorkingTimeId;
    }


    public int getAssignWorkingTimeId() {
        return assignWorkingTimeId;
    }

    @Override
    public int compareTo(Object o) {
        return this.getSorter().compareTo(((WorkingTimeAnalysis) o).getSorter());
    }

    private static String convertStringDateToEpoch(String time, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Long timeInMillis = date.getTime();
        return timeInMillis.toString();
    }
}
