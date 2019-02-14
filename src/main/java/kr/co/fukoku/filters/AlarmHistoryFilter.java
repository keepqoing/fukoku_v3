package kr.co.fukoku.filters;

public class AlarmHistoryFilter {
    private String line;
    private String machine;
    private String startTime;
    private String endTime;
    private String department;
    private String productionDate;
    private String alarmName;

    public AlarmHistoryFilter(){
        line = "0";
        machine = "0";
        startTime = "";
        endTime = "";
        department = "";
        productionDate = "";
        alarmName = "";
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(String productionDate) {
        this.productionDate = productionDate;
    }

    public String getAlarmName() {
        return alarmName;
    }

    public void setAlarmName(String alarmName) {
        this.alarmName = alarmName;
    }

    @Override
    public String toString() {
        return "AlarmHistoryFilter{" +
                "line='" + line + '\'' +
                ", machine='" + machine + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", department='" + department + '\'' +
                ", productionDate='" + productionDate + '\'' +
                ", alarmName='" + alarmName + '\'' +
                '}';
    }
}
