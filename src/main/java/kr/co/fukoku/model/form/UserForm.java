package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserForm {
    @JsonProperty("E_ID")
    private String eId;
    @JsonProperty("PASSWORD")
    private String password;
    @JsonProperty("NAME")
    private String name;
    @JsonProperty("PHONE")
    private String phone;
    @JsonProperty("CELL_PHONE")
    private String cellPhone;
    @JsonProperty("EMAIL")
    private String email;
    @JsonProperty("POSITION")
    private String position;
    @JsonProperty("ROLE")
    private String role;
    @JsonProperty("STATUS")
    private String status;
    @JsonProperty("DEPARTMENT")
    private String department;
    @JsonProperty("LINE")
    private String line;

    public String geteId() {
        return eId;
    }

    public void seteId(String eId) {
        this.eId = eId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public static class UserUpdateForm extends UserForm{
        @JsonProperty("ID")
        private int id;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }
    }
}
