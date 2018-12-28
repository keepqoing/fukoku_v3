package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class MachineFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ip")
	private String ip;
	@JsonProperty("import_date")
	private String importDate;
	@JsonProperty("code")
	private String code;
	@JsonProperty("manufacturer")
	private String manufacturer;
	@JsonProperty("facility_staff")
	private String facilityStaff;
	@JsonProperty("facility_contact_person")
	private String facilityContactPerson;
	@JsonProperty("plc_type")
	private String plcType;
	@JsonProperty("plc_communication_device")
	private String plcCommunicationDevice;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	@JsonProperty("station")
	private String station;
	
	public String getStation() {
		return station;
	}

	public void setStation(String station) {
		this.station = station;
	}
	public MachineFrm() {
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
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getImportDate() {
		return importDate;
	}
	public void setImportDate(String importDate) {
		this.importDate = importDate;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getFacilityStaff() {
		return facilityStaff;
	}
	public void setFacilityStaff(String facilityStaff) {
		this.facilityStaff = facilityStaff;
	}
	public String getFacilityContactPerson() {
		return facilityContactPerson;
	}
	public void setFacilityContactPerson(String facilityContactPerson) {
		this.facilityContactPerson = facilityContactPerson;
	}
	public String getPlcType() {
		return plcType;
	}
	public void setPlcType(String plcType) {
		this.plcType = plcType;
	}
	public String getPlcCommunicationDevice() {
		return plcCommunicationDevice;
	}
	public void setPlcCommunicationDevice(String plcCommunicationDevice) {
		this.plcCommunicationDevice = plcCommunicationDevice;
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
	public MachineFrm(long id, long seq, String name, String ip, String importDate, String code, String manufacturer,
			String facilityStaff, String facilityContactPerson, String plcType, String plcCommunication, String remark,
			String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.ip = ip;
		this.importDate = importDate;
		this.code = code;
		this.manufacturer = manufacturer;
		this.facilityStaff = facilityStaff;
		this.facilityContactPerson = facilityContactPerson;
		this.plcType = plcType;
		this.plcCommunicationDevice = plcCommunicationDevice;
		this.remark = remark;
		this.status = status;
	}
	@Override
	public String toString() {
		return "MachineFrm [id=" + id + ", seq=" + seq + ", name=" + name + ", ip=" + ip + ", importDate=" + importDate
				+ ", code=" + code + ", manufacturer=" + manufacturer + ", facilityStaff=" + facilityStaff
				+ ", facilityContactPerson=" + facilityContactPerson + ", plcType=" + plcType + ", plcCommunicationDevice="
				+ plcCommunicationDevice + ", remark=" + remark + ", status=" + status + "]";
	}
	
	
	
	
	
	
	
	
	
	
	
}
