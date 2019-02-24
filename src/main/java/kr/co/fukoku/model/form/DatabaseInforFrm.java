package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;


public class DatabaseInforFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("db_name")
	private String name;
	@JsonProperty("db_ip_address")
	private String ipAddress;
	@JsonProperty("db_port_no")
	private String port;
	@JsonProperty("db_user_name")
	private String username;
	@JsonProperty("db_user_password")
	private String password;
	@JsonProperty("db_type")
	private String type;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	@JsonProperty("order_by")
	private String orderBy;
	
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
	public String getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	
	
	
	
	
	
	
	
}
