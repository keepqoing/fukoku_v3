package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlarmProductYear {

    @JsonProperty("M1")
    private int m1;

    @JsonProperty("M2")
    private int m2;

    @JsonProperty("M3")
    private int m3;

    @JsonProperty("M4")
    private int m4;

    @JsonProperty("M5")
    private int m5;

    @JsonProperty("M6")
    private int m6;

    @JsonProperty("M7")
    private int m7;

    @JsonProperty("M8")
    private int m8;

    @JsonProperty("M9")
    private int m9;

    @JsonProperty("M10")
    private int m10;

    @JsonProperty("M11")
    private int m11;

    @JsonProperty("M12")
    private int m12;

    @JsonProperty("TOTAL")
    private int total;

    @JsonProperty("YEAR")
    private int year;

    public AlarmProductYear() {
    }

    public AlarmProductYear(int m1, int m2, int m3, int m4, int m5, int m6, int m7, int m8, int m9, int m10, int m11, int m12, int total, int year) {
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
        this.m4 = m4;
        this.m5 = m5;
        this.m6 = m6;
        this.m7 = m7;
        this.m8 = m8;
        this.m9 = m9;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.total = total;
        this.year = year;
    }

    public int getM1() {
        return m1;
    }

    public void setM1(int m1) {
        this.m1 = m1;
    }

    public int getM2() {
        return m2;
    }

    public void setM2(int m2) {
        this.m2 = m2;
    }

    public int getM3() {
        return m3;
    }

    public void setM3(int m3) {
        this.m3 = m3;
    }

    public int getM4() {
        return m4;
    }

    public void setM4(int m4) {
        this.m4 = m4;
    }

    public int getM5() {
        return m5;
    }

    public void setM5(int m5) {
        this.m5 = m5;
    }

    public int getM6() {
        return m6;
    }

    public void setM6(int m6) {
        this.m6 = m6;
    }

    public int getM7() {
        return m7;
    }

    public void setM7(int m7) {
        this.m7 = m7;
    }

    public int getM8() {
        return m8;
    }

    public void setM8(int m8) {
        this.m8 = m8;
    }

    public int getM9() {
        return m9;
    }

    public void setM9(int m9) {
        this.m9 = m9;
    }

    public int getM10() {
        return m10;
    }

    public void setM10(int m10) {
        this.m10 = m10;
    }

    public int getM11() {
        return m11;
    }

    public void setM11(int m11) {
        this.m11 = m11;
    }

    public int getM12() {
        return m12;
    }

    public void setM12(int m12) {
        this.m12 = m12;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
