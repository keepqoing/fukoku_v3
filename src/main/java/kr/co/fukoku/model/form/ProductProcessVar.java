package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductProcessVar {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("ref_process_var_id")
	private String refProcessVarId;
	@JsonProperty("ref_prouduct_id")
	private String refProuductId;
	@JsonProperty("ref_process_machine_id")
	private String refProcessMachineId;
	@JsonProperty("ref_process_chain_element_id")
	private String refProcessChainElementId;
	@JsonProperty("name")
	private String name;
	@JsonProperty("type")
	private String type;
	@JsonProperty("usl")
	private String usl;
	@JsonProperty("lsl")
	private String lsl;
	@JsonProperty("unit_kind")
	private String unitKind;
	@JsonProperty("transform_value")
	private String transform_value;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	
	// for sensor
	private long refLine;
	private long refFactory;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRefProcessVarId() {
		return refProcessVarId;
	}
	public void setRefProcessVarId(String refProcessVarId) {
		this.refProcessVarId = refProcessVarId;
	}
	public String getRefProuductId() {
		return refProuductId;
	}
	public void setRefProuductId(String refProuductId) {
		this.refProuductId = refProuductId;
	}
	public String getRefProcessMachineId() {
		return refProcessMachineId;
	}
	public void setRefProcessMachineId(String refProcessMachineId) {
		this.refProcessMachineId = refProcessMachineId;
	}
	public String getRefProcessChainElementId() {
		return refProcessChainElementId;
	}
	public void setRefProcessChainElementId(String refProcessChainElementId) {
		this.refProcessChainElementId = refProcessChainElementId;
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
	public String getUsl() {
		return usl;
	}
	public void setUsl(String usl) {
		this.usl = usl;
	}
	public String getLsl() {
		return lsl;
	}
	public void setLsl(String lsl) {
		this.lsl = lsl;
	}
	public String getUnitKind() {
		return unitKind;
	}
	public void setUnitKind(String unitKind) {
		this.unitKind = unitKind;
	}
	public String getTransform_value() {
		return transform_value;
	}
	public void setTransform_value(String transform_value) {
		this.transform_value = transform_value;
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
	public long getRefLine() {
		return refLine;
	}
	public void setRefLine(long refLine) {
		this.refLine = refLine;
	}
	public long getRefFactory() {
		return refFactory;
	}
	public void setRefFactory(long refFactory) {
		this.refFactory = refFactory;
	}
	
	
	
	
	
	
}
