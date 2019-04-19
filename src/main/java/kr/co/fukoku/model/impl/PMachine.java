package kr.co.fukoku.model.impl;

import java.util.List;

public class PMachine{

    private String displayName;
    private String mappingName;
    private String lineName;
    private String code;
    private List<PProduct> productList;

    public PMachine(){}

    public PMachine(String displayName, String mappingName, String lineName, List<PProduct> productList, String code) {
        this.displayName = displayName;
        this.mappingName = mappingName;
        this.lineName = lineName;
        this.productList = productList;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getMappingName() {
        return mappingName;
    }

    public void setMappingName(String mappingName) {
        this.mappingName = mappingName;
    }

    public List<PProduct> getProductList() {
        return productList;
    }

    public void setProductList(List<PProduct> productList) {
        this.productList = productList;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getLineName() {
        return lineName;
    }
}
