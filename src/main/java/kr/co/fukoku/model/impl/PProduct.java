package kr.co.fukoku.model.impl;

public class PProduct{

    private int id;
    private String name;
    private String refMachine;
    private String refLine;
    private String code;

    public PProduct(){}

    public PProduct(int id, String name, String refMachine, String refLine, String code) {
        this.id = id;
        this.name = name;
        this.refMachine = refMachine;
        this.refLine = refLine;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRefMachine() {
        return refMachine;
    }

    public void setRefMachine(String refMachine) {
        this.refMachine = refMachine;
    }

    public String getRefLine() {
        return refLine;
    }

    public void setRefLine(String refLine) {
        this.refLine = refLine;
    }
}
