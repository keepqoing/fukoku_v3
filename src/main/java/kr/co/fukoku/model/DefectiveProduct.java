package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DefectiveProduct {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("DATE")
    private String date;
    @JsonProperty("LINE")
    private String line;
    @JsonProperty("PRODUCT_NAME")
    private String productName;
    @JsonProperty("AMOUNT")
    private int amount;
    @JsonProperty("TYPE")
    private String type;
    @JsonProperty("MACHINE")
    private String machine;
    @JsonProperty("REASON")
    private String reason;
    @JsonProperty("ASSEMBLY_STATE")
    private String assemblyState;
    @JsonProperty("DETAIL")
    private String detail;
    @JsonProperty("IMPORTANT")
    private String important;
    @JsonProperty("RELATED_FILE")
    private String relatedFile;


    public DefectiveProduct() {
    }

    public DefectiveProduct(int id, String date, String line, String productName, int amount, String type, String machine, String reason, String assemblyState, String detail, String important, String relatedFile) {
        this.id = id;
        this.date = date;
        this.line = line;
        this.productName = productName;
        this.amount = amount;
        this.type = type;
        this.machine = machine;
        this.reason = reason;
        this.assemblyState = assemblyState;
        this.detail = detail;
        this.important = important;
        this.relatedFile = relatedFile;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getAssemblyState() {
        return assemblyState;
    }

    public void setAssemblyState(String assemblyState) {
        this.assemblyState = assemblyState;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getImportant() {
        return important;
    }

    public void setImportant(String important) {
        this.important = important;
    }

    public String getRelatedFile() {
        return relatedFile;
    }

    public void setRelatedFile(String relatedFile) {
        this.relatedFile = relatedFile;
    }
}
