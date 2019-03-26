package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AbnormalMgt {
    @JsonProperty("id")
    private int id;

    @JsonProperty("seq")
    private int seq;

    @JsonProperty("name")
    private String name;

    @JsonProperty("factory")
    private Factory factory;

    @JsonProperty("department")
    private Department department;

    @JsonProperty("lst_line")
    private List<Line> lines;

    @JsonProperty("data")
    private String data;

    public AbnormalMgt() {
    }

    public AbnormalMgt(int id, int seq, String name, Factory factory, Department department, List<Line> lines, String data) {
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.factory = factory;
        this.department = department;
        this.lines = lines;
        this.data = data;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Factory getFactory() {
        return factory;
    }

    public void setFactory(Factory factory) {
        this.factory = factory;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Line> getLines() {
        return lines;
    }

    public void setLines(List<Line> lines) {
        this.lines = lines;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
