package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AbnormalFrm {
    @JsonProperty("factory")
    private String factory;

    @JsonProperty("department")
    private String department;

    @JsonProperty("management_name")
    private String managementName;

    @JsonProperty("line")
    private String line;

    @JsonProperty("type")
    private String type;

    @JsonProperty("step")
    private String step;

    @JsonProperty("code")
    private String code;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("sub_category_code")
    private String subCategoryCode;

    public AbnormalFrm(){
        super();
    }

    public AbnormalFrm(String type){
        super();
        this.type = type;
    }

    public AbnormalFrm(String factory, String department, String managementName, String line, String type, String step, String code, String categoryName, String subCategoryCode) {
        super();
        this.factory = factory;
        this.department = department;
        this.managementName = managementName;
        this.line = line;
        this.type = type;
        this.step = step;
        this.code = code;
        this.categoryName = categoryName;
        this.subCategoryCode = subCategoryCode;
    }

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getManagementName() {
        return managementName;
    }

    public void setManagementName(String managementName) {
        this.managementName = managementName;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getSubCategoryCode() {
        return subCategoryCode;
    }

    public void setSubCategoryCode(String subCategoryCode) {
        this.subCategoryCode = subCategoryCode;
    }
}
