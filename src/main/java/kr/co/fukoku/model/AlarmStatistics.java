package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import kr.co.fukoku.model.form.AlarmProduct;

import java.util.List;

public class AlarmStatistics {
    @JsonProperty("ALARM_ID")
    private String alarmId;
    @JsonProperty("ALARM_NAME")
    private String alarmName;
    @JsonProperty("ALARM_COUNT")
    private long alarmCount;

    @JsonProperty("ALARM_PRODUCT")
    private List<AlarmProduct> alarmProducts;

    public AlarmStatistics() {
    }

    public AlarmStatistics(String alarmId, String alarmName, long alarmCount, List<AlarmProduct> alarmProducts) {
        this.alarmId = alarmId;
        this.alarmName = alarmName;
        this.alarmCount = alarmCount;
        this.alarmProducts = alarmProducts;
    }

    public String getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(String alarmId) {
        this.alarmId = alarmId;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(String alarmName) {
        this.alarmName = alarmName;
    }

    public long getAlarmCount() {
        return alarmCount;
    }

    public void setAlarmCount(long alarmCount) {
        this.alarmCount = alarmCount;
    }

    public List<AlarmProduct> getAlarmProducts() {
        return alarmProducts;
    }

    public void setAlarmProducts(List<AlarmProduct> alarmProducts) {
        this.alarmProducts = alarmProducts;
    }
}
