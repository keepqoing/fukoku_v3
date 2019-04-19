package kr.co.fukoku.model.impl;


import java.util.List;

public class NonActiveData {
    private String machine;

    private List<String> datas;

    public NonActiveData() {
    }

    public NonActiveData(String machine, List<String> datas) {
        this.machine = machine;
        this.datas = datas;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public List<String> getDatas() {
        return datas;
    }

    public void setDatas(List<String> datas) {
        this.datas = datas;
    }
}
