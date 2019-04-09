package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ProductStatusFreq {
    @JsonProperty("categorie")
    private String categorie;
    @JsonProperty("values")
    private List<StatusFreq> values;

    public ProductStatusFreq(){}

    public ProductStatusFreq(String categorie, List<StatusFreq> values) {
        this.categorie = categorie;
        this.values = values;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public List<StatusFreq> getValues() {
        return values;
    }

    public void setValues(List<StatusFreq> values) {
        this.values = values;
    }

    @Override
    public String toString() {
        return "ProductStatusFreq{" +
                "categorie='" + categorie + '\'' +
                ", values=" + values +
                '}';
    }
}
