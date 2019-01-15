package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("rep_variable_name")
	private String repVariableName;
	
	@JsonProperty("desp_picture")
	private String despPicture;
	
	
	@JsonProperty("type")
	private String type;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	
	
	
	public ProcessFrm(long id, long seq, String name, String repVariableName, String despPicture, String type,
			String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.repVariableName = repVariableName;
		this.despPicture = despPicture;
		this.type = type;
		this.remark = remark;
		this.status = status;
	}
	
	
	public ProcessFrm() {
		super();
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}


	public String getRepVariableName() {
		return repVariableName;
	}


	public void setRepVariableName(String repVariableName) {
		this.repVariableName = repVariableName;
	}


	public String getDespPicture() {
		return despPicture;
	}


	public void setDespPicture(String despPicture) {
		this.despPicture = despPicture;
	}
	
	
	
	
	
	
}
