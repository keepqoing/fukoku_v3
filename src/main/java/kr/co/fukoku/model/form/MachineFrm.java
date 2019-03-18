package kr.co.fukoku.model.form;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MachineFrm {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("ref_process_id")
	private long refProcessId;
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
	
	/*@JsonProperty("file")
	private MultipartFile file;*/
	
	@JsonProperty("lst_process")
	private List<Long> processes;
	
	@JsonProperty("acronym")
	private String acronym;
	
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	public List<Long> getProcesses() {
		return processes;
	}
	
	public void setProcesses(List<Long> processes) {
		this.processes = processes;
	}
	
	@JsonProperty("order_by")
	private String orderBy;
	
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	
	public String getOrderBy() {
		return orderBy;
	}
	
	public MachineFrm(String name) {
		super();
		this.name = name;
	}
	
	
	public MachineFrm(long id, long seq, String name, long refProcessId, String ip, String importDate, String code,
			String manufacturer, String facilityStaff, String facilityContactPerson, String plcType,
			String plcCommunicationDevice, String remark, String status, String station) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.refProcessId = refProcessId;
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
	public long getRefProcessId() {
		return refProcessId;
	}
	public void setRefProcessId(long refProcessId) {
		this.refProcessId = refProcessId;
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

	/*public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
