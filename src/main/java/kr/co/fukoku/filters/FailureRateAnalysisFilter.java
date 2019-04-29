package kr.co.fukoku.filters;

public class FailureRateAnalysisFilter {
    private String lineName;
    private String machineName;
    private String startTime;

    public FailureRateAnalysisFilter(){
        lineName = "";
        machineName = "";
        startTime = "";
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


}
