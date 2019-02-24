package kr.co.fukoku.model.form.AlarmModel;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Yearly {
    @JsonProperty("YEAR")
    private String year;

    @JsonProperty("JANUARY")
    private January january;

    @JsonProperty("FEBRUARY")
    private February february;

    @JsonProperty("MARCH")
    private March march;

    @JsonProperty("APRIL")
    private April april;

    @JsonProperty("MAY")
    private May may;

    @JsonProperty("JUNE")
    private June june;

    @JsonProperty("JULY")
    private July july;

    @JsonProperty("AUGUST")
    private August august;

    @JsonProperty("SEPTEMBER")
    private September september;

    @JsonProperty("OCTOBER")
    private October october;

    @JsonProperty("NOVEMBER")
    private November november;

    @JsonProperty("DECEMBER")
    private December december;

    public Yearly() {
    }

    public Yearly(String year, January january, February february, March march, April april, May may, June june, July july, August august, September september, October october, November november, December december) {
        this.year = year;
        this.january = january;
        this.february = february;
        this.march = march;
        this.april = april;
        this.may = may;
        this.june = june;
        this.july = july;
        this.august = august;
        this.september = september;
        this.october = october;
        this.november = november;
        this.december = december;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public January getJanuary() {
        return january;
    }

    public void setJanuary(January january) {
        this.january = january;
    }

    public February getFebruary() {
        return february;
    }

    public void setFebruary(February february) {
        this.february = february;
    }

    public March getMarch() {
        return march;
    }

    public void setMarch(March march) {
        this.march = march;
    }

    public April getApril() {
        return april;
    }

    public void setApril(April april) {
        this.april = april;
    }

    public May getMay() {
        return may;
    }

    public void setMay(May may) {
        this.may = may;
    }

    public June getJune() {
        return june;
    }

    public void setJune(June june) {
        this.june = june;
    }

    public July getJuly() {
        return july;
    }

    public void setJuly(July july) {
        this.july = july;
    }

    public August getAugust() {
        return august;
    }

    public void setAugust(August august) {
        this.august = august;
    }

    public September getSeptember() {
        return september;
    }

    public void setSeptember(September september) {
        this.september = september;
    }

    public October getOctober() {
        return october;
    }

    public void setOctober(October october) {
        this.october = october;
    }

    public November getNovember() {
        return november;
    }

    public void setNovember(November november) {
        this.november = november;
    }

    public December getDecember() {
        return december;
    }

    public void setDecember(December december) {
        this.december = december;
    }
}
