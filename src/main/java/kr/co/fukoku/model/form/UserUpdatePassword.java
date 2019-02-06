package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserUpdatePassword {
    @JsonProperty("ID")
    private int id;
    @JsonProperty("PASSWORD")
    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
