package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Issue {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("TITLE")
    private String title;
    @JsonProperty("CONTENT")
    private String content;
    @JsonProperty("CREATED_DATE")
    private String createdDate;
    @JsonProperty("REPORTER")
    private String reporter;
    @JsonProperty("STATUS")
    private String status;

    public Issue(){}

    public Issue(String title, String content, String reporter) {
        this.title = title;
        this.content = content;
        this.reporter = reporter;
    }

    public Issue(int id, String title, String content, String reporter) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.reporter = reporter;
    }

    public Issue(String title, String content, String createdDate, String reporter, String status) {
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.reporter = reporter;
        this.status = status;
    }

    public Issue(int id, String title, String content, String createdDate, String reporter, String status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.reporter = reporter;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
