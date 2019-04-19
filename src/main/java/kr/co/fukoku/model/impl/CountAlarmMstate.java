package kr.co.fukoku.model.impl;

public class CountAlarmMstate {

    private String lineName;
    private String mappingName;
    private long totalAlarmMstate;

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getMappingName() {
        return mappingName;
    }

    public void setMappingName(String mappingName) {
        this.mappingName = mappingName;
    }

    public long getTotalAlarmMstate() {
        return totalAlarmMstate;
    }

    public void setTotalAlarmMstate(long totalAlarmMstate) {
        this.totalAlarmMstate = totalAlarmMstate;
    }
}
