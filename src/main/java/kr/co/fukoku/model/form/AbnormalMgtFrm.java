package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AbnormalMgtFrm {
    @JsonProperty("NAME")
    private String name;

    @JsonProperty("REF_FACTORY")
    private int refFactory;

    @JsonProperty("REF_DEPARTMENT")
    private int refDepartment;

    @JsonProperty("LINES")
    private String lines;

    @JsonProperty("DATA")
    private String data;

    @JsonProperty("ORDER_BY")
    private String orderBy;

    public AbnormalMgtFrm() {
    }

    public AbnormalMgtFrm(String name, int refFactory, int refDepartment, String lines, String data) {
        this.name = name;
        this.refFactory = refFactory;
        this.refDepartment = refDepartment;
        this.lines = lines;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRefFactory() {
        return refFactory;
    }

    public void setRefFactory(int refFactory) {
        this.refFactory = refFactory;
    }

    public int getRefDepartment() {
        return refDepartment;
    }

    public void setRefDepartment(int refDepartment) {
        this.refDepartment = refDepartment;
    }

    public String getLines() {
        return lines;
    }

    public void setLines(String lines) {
        this.lines = lines;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
}
