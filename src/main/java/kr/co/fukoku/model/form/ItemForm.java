package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemForm {
    @JsonProperty("CODE")
    private String code;
    @JsonProperty("NAME")
    private String name;
    @JsonProperty("REMARK")
    private String remark;
    @JsonProperty("DEPARTMENT")
    private int refParent;
    @JsonProperty("CLASSIFICATION")
    private int refDepOfCat;

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

    public int getRefParent() {
        return refParent;
    }

    public void setRefParent(int refParent) {
        this.refParent = refParent;
    }

    public int getRefDepOfCat() {
        return refDepOfCat;
    }

    public void setRefDepOfCat(int refDepOfCat) {
        this.refDepOfCat = refDepOfCat;
    }

    public static class ItemUpdateForm extends ItemForm{
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
