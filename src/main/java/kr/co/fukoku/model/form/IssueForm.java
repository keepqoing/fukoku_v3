package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IssueForm {
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

    public static class IssueUpdateForm extends IssueForm{
        @JsonProperty("ID")
        private int id;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }
    }
}
