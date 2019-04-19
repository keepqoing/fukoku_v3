package kr.co.fukoku.model.impl;

import java.util.List;

public class PLine {

    private int id;
    private String name;
    private String mappingName;
    private List<PMachine> machineList;

    public PLine(){}

    public PLine(int id, String name, String mappingName, List<PMachine> machineList) {
        this.id = id;
        this.name = name;
        this.mappingName = mappingName;
        this.machineList = machineList;
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

    public String getMappingName() {
        return mappingName;
    }

    public void setMappingName(String mappingName) {
        this.mappingName = mappingName;
    }

    public List<PMachine> getMachineList() {
        return machineList;
    }

    public void setMachineList(List<PMachine> machineList) {
        this.machineList = machineList;
    }


}




