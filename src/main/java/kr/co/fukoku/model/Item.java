package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Item {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("CODE")
    private String code;
    @JsonProperty("NAME")
    private String name;
    @JsonProperty("REMARK")
    private String remark;
    @JsonProperty("DEP_OF_CAT")
    private int depOfCat;
    @JsonProperty("REF_PARENT")
    private int ref_parent;
    @JsonProperty("DEPARTMENT")
    private String department;

    public Item(){}

    public Item(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Item(int id, String code, String name, String remark, int depOfCat, int ref_parent) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.remark = remark;
        this.depOfCat = depOfCat;
        this.ref_parent = ref_parent;
    }

    public Item(String code, String name, String remark, int depOfCat, int ref_parent) {
        this.code = code;
        this.name = name;
        this.remark = remark;
        this.depOfCat = depOfCat;
        this.ref_parent = ref_parent;
    }

    public Item(int id, String code, String name, String emark, int depOfCat) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.remark = emark;
        this.depOfCat = depOfCat;
    }

    public int getRef_parent() {
        return ref_parent;
    }

    public void setRef_parent(int ref_parent) {
        this.ref_parent = ref_parent;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getDepOfCat() {
        return depOfCat;
    }

    public void setDepOfCat(int depOfCat) {
        this.depOfCat = depOfCat;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
