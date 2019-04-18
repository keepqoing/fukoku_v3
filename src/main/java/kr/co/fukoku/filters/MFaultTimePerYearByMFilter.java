package kr.co.fukoku.filters;

public class MFaultTimePerYearByMFilter {
    private String lineName;
    private String machineName;
    private String startTime;
    private String endTime;
    private String mStatus;
    private String machineNameEng;
    public MFaultTimePerYearByMFilter(){
        lineName = "";
        machineName = "";
        startTime = "";
        endTime = "";
    }

    public String getMachineNameEng() {
        return machineNameEng;
    }

    public void setMachineNameEng(String machineNameEng) {
        this.machineNameEng = machineNameEng;
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

    public String getmStatus() {
        return mStatus;
    }

    public void setmStatus(String mStatus) {
        this.mStatus = mStatus;
    }
}
