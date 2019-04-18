package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ImageForm {
    @JsonProperty("URL")
    private String url;
    @JsonProperty("REMARK")
    private String remark;
    @JsonProperty("TRAN_ID")
    private int tranId;
    @JsonProperty("DEPARTMENT")
    private String department;
    @JsonProperty("CREATED_DATE")
    private String createdDate;
    @JsonProperty("ITEM")
    private String item;
    @JsonProperty("SUB_ITEM")
    private String subItem;
    @JsonProperty("ERROR")
    private String error;
    @JsonProperty("TREATMENT")
    private String treatment;
    @JsonProperty("TRAN_HIS_ID")
    private int tranHisId;

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

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getSubItem() {
        return subItem;
    }

    public void setSubItem(String subItem) {
        this.subItem = subItem;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public int getTranHisId() {
        return tranHisId;
    }

    public void setTranHisId(int tranHisId) {
        this.tranHisId = tranHisId;
    }

    public static class ImageUpdateForm extends ImageForm{
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
