package kr.co.fukoku.filters;

public class EquipStatusFilter {
    private String lineName;
    private String machineName;
    private String startTime;
    private String endTime;

    public EquipStatusFilter(){
        lineName = "";
        machineName = "";
        startTime = "";
        endTime = "";
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
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
}
