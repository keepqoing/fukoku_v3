package kr.co.fukoku.filters;

public class OperatingTimeFilter {
    private String workingTypeName;
    private String actionType;
    private String startTime;
    private String endTime;
    private String line;

    public OperatingTimeFilter(){
        workingTypeName = "";
        actionType = "";
        startTime = "";
        endTime = "";
        line = "";
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getWorkingTypeName() {
        return workingTypeName;
    }

    public void setWorkingTypeName(String workingTypeName) {
        this.workingTypeName = workingTypeName;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
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
