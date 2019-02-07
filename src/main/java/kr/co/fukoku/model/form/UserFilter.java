package kr.co.fukoku.model.form;

public class UserFilter {
    private String department;
    private String filter;

    public UserFilter(){
        department = "";
        filter = "";
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }
}