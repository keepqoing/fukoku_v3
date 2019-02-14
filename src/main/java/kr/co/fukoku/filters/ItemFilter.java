package kr.co.fukoku.filters;

public class ItemFilter {
    private String department;
    private String classification;

    public ItemFilter(){
        department = "0";
        classification = "0";
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }
}
