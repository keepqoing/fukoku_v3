package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Image {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("URL")
    private String url;
    @JsonProperty("REMARK")
    private String remark;
    @JsonProperty("TRAN_ID")
    private int tranId;
    @JsonProperty("TRAN_HIS_ID")
    private int tranHisId;
    @JsonProperty("DEPARTMENT")
    private String department;
    @JsonProperty("CREATED_DATE")
    private String createdDate;

    public Image(){}

    public Image(String url, String remark, int tranId, String department) {
        this.url = url;
        this.remark = remark;
        this.tranId = tranId;
        this.department = department;
    }

    public Image(int id, String url, String remark, int tranId, String department) {
        this.id = id;
        this.url = url;
        this.remark = remark;
        this.tranId = tranId;
        this.department = department;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getTranId() {
        return tranId;
    }

    public void setTranId(int tranId) {
        this.tranId = tranId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public int getTranHisId() {
        return tranHisId;
    }

    public void setTranHisId(int tranHisId) {
        this.tranHisId = tranHisId;
    }
}
