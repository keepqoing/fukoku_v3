package kr.co.fukoku.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class Machine {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("process")
	private Process process;
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
	
	@JsonProperty("acronym")
	private String acronym;
	
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	@JsonProperty("lst_process")
	private List<Process> processes;
	
	public List<Process> getProcesses() {
		return processes;
	}
	
	public void setProcesses(List<Process> processes) {
		this.processes = processes;
	}
	
	
	
	public Machine(String name) {
		super();
		this.name = name;
	}

	public Machine() {
		super();
	}
	
	public Machine(long id, long seq, String name, Process process, String ip, String importDate, String code,
			String manufacturer, String facilityStaff, String facilityContactPerson, String plcType,
			String plcCommunicationDevice, String remark, String status, String station) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.process = process;
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
		this.station = station;
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
	public Process getProcess() {
		return process;
	}
	public void setProcess(Process process) {
		this.process = process;
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
	public String getStation() {
		return station;
	}
	public void setStation(String station) {
		this.station = station;
	}
	
	
	
	
	
	
	
	
	
	
}
