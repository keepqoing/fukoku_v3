package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FaultNode {

    @JsonProperty("name")
    private String name;
    @JsonProperty("id")
    private String id;

    public FaultNode() {
    }

    public FaultNode(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
