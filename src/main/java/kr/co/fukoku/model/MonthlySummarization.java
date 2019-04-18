package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MonthlySummarization {
    @JsonProperty("LINE")
    private String line;

    @JsonProperty("MACHINE")
    private String machine;

    @JsonProperty("M_1")
    private double m_1;

    @JsonProperty("M_2")
    private double m_2;

    @JsonProperty("M_3")
    private double m_3;

    @JsonProperty("M_4")
    private double m_4;

    @JsonProperty("M_5")
    private double m_5;

    @JsonProperty("M_6")
    private double m_6;

    @JsonProperty("M_7")
    private double m_7;

    @JsonProperty("M_8")
    private double m_8;

    @JsonProperty("M_9")
    private double m_9;

    @JsonProperty("M_10")
    private double m_10;

    @JsonProperty("M_11")
    private double m_11;

    @JsonProperty("M_12")
    private double m_12;

    @JsonProperty("TOTAL")
    private double total;

    @JsonProperty("RATIO")
    private float ratio;

    public MonthlySummarization() {
    }

    public MonthlySummarization(String line, double m_1, double m_2, double m_3, double m_4, double m_5, double m_6, double m_7, double m_8, double m_9, double m_10, double m_11, double m_12, double total, float ratio) {
        this.line = line;
        this.m_1 = m_1;
        this.m_2 = m_2;
        this.m_3 = m_3;
        this.m_4 = m_4;
        this.m_5 = m_5;
        this.m_6 = m_6;
        this.m_7 = m_7;
        this.m_8 = m_8;
        this.m_9 = m_9;
        this.m_10 = m_10;
        this.m_11 = m_11;
        this.m_12 = m_12;
        this.total = total;
        this.ratio = ratio;
    }

    public MonthlySummarization(String line, String machine, double m_1, double m_2, double m_3, double m_4, double m_5, double m_6, double m_7, double m_8, double m_9, double m_10, double m_11, double m_12, double total, float ratio) {
        this.line = line;
        this.machine = machine;
        this.m_1 = m_1;
        this.m_2 = m_2;
        this.m_3 = m_3;
        this.m_4 = m_4;
        this.m_5 = m_5;
        this.m_6 = m_6;
        this.m_7 = m_7;
        this.m_8 = m_8;
        this.m_9 = m_9;
        this.m_10 = m_10;
        this.m_11 = m_11;
        this.m_12 = m_12;
        this.total = total;
        this.ratio = ratio;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public double getM_1() {
        return m_1;
    }

    public void setM_1(double m_1) {
        this.m_1 = m_1;
    }

    public double getM_2() {
        return m_2;
    }

    public void setM_2(double m_2) {
        this.m_2 = m_2;
    }

    public double getM_3() {
        return m_3;
    }

    public void setM_3(double m_3) {
        this.m_3 = m_3;
    }

    public double getM_4() {
        return m_4;
    }

    public void setM_4(double m_4) {
        this.m_4 = m_4;
    }

    public double getM_5() {
        return m_5;
    }

    public void setM_5(double m_5) {
        this.m_5 = m_5;
    }

    public double getM_6() {
        return m_6;
    }

    public void setM_6(double m_6) {
        this.m_6 = m_6;
    }

    public double getM_7() {
        return m_7;
    }

    public void setM_7(double m_7) {
        this.m_7 = m_7;
    }

    public double getM_8() {
        return m_8;
    }

    public void setM_8(double m_8) {
        this.m_8 = m_8;
    }

    public double getM_9() {
        return m_9;
    }

    public void setM_9(double m_9) {
        this.m_9 = m_9;
    }

    public double getM_10() {
        return m_10;
    }

    public void setM_10(double m_10) {
        this.m_10 = m_10;
    }

    public double getM_11() {
        return m_11;
    }

    public void setM_11(double m_11) {
        this.m_11 = m_11;
    }

    public double getM_12() {
        return m_12;
    }

    public void setM_12(double m_12) {
        this.m_12 = m_12;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public float getRatio() {
        return ratio;
    }

    public void setRatio(float ratio) {
        this.ratio = ratio;
    }
}
