package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WorkTimeCalendarForm {
    @JsonProperty("OPERATING_TIME")
    private int refOperatingTime;
    @JsonProperty("TOTAL")
    private int total;
    @JsonProperty("LINE")
    private String refLine;
    @JsonProperty("PRODUCT")
    private String refProduct;
    @JsonProperty("DATE")
    private String _date;
    @JsonProperty("SHORT_DATE")
    private String shortDate;
    @JsonProperty("CROSS_DATE")
    private String crossDate;
    @JsonProperty("CROSS_DATE_LABEL")
    private String crossDateLabel;

    public int getRefOperatingTime() {
        return refOperatingTime;
    }

    public void setRefOperatingTime(int refOperatingTime) {
        this.refOperatingTime = refOperatingTime;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getRefLine() {
        return refLine;
    }

    public void setRefLine(String refLine) {
        this.refLine = refLine;
    }

    public String getRefProduct() {
        return refProduct;
    }

    public void setRefProduct(String refProduct) {
        this.refProduct = refProduct;
    }

    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    public String getShortDate() {
        return shortDate;
    }

    public void setShortDate(String shortDate) {
        this.shortDate = shortDate;
    }

    public String getCrossDate() {
        return crossDate;
    }

    public void setCrossDate(String crossDate) {
        this.crossDate = crossDate;
    }

    public String getCrossDateLabel() {
        return crossDateLabel;
    }

    public void setCrossDateLabel(String crossDateLabel) {
        this.crossDateLabel = crossDateLabel;
    }

    public static class WorkTimeCalendarUpdateForm extends WorkTimeCalendarForm{
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
