package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StateNameFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("eng_name")
	private String engName;
	@JsonProperty("korean_name")
	private String koreanName;
	@JsonProperty("status")
	private String status;
	@JsonProperty("color")
	private String color;
	@JsonProperty("unit")
	private String unit;
	@JsonProperty("api_field_name")
	private String apiFieldName;

	public StateNameFrm() {
	}

	public StateNameFrm(long id, long seq, String engName, String koreanName, String status, String color, String unit, String apiFieldName) {
		this.id = id;
		this.seq = seq;
		this.engName = engName;
		this.koreanName = koreanName;
		this.status = status;
		this.color = color;
		this.unit = unit;
		this.apiFieldName = apiFieldName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getSeq() {
		return seq;
	}

	public void setSeq(long seq) {
		this.seq = seq;
	}

	public String getEngName() {
		return engName;
	}

	public void setEngName(String engName) {
		this.engName = engName;
	}

	public String getKoreanName() {
		return koreanName;
	}

	public void setKoreanName(String koreanName) {
		this.koreanName = koreanName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getApiFieldName() {
		return apiFieldName;
	}

	public void setApiFieldName(String apiFieldName) {
		this.apiFieldName = apiFieldName;
	}
}
