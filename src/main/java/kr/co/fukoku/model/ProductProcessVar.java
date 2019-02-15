package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;

public class ProductProcessVar {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("ref_process_var_id")
	private String refProcessVarId;
	@JsonProperty("ref_prouduct_id")
	private long refProuductId;
	@JsonProperty("ref_process_machine_id")
	private String refProcessMachineId;
	@JsonProperty("ref_process_chain_element_id")
	private long refProcessChainElementId;
	@JsonProperty("name")
	private String name;
	@JsonProperty("type")
	private String type;
	@JsonProperty("usl")
	private long usl;
	@JsonProperty("lsl")
	private long lsl;
	@JsonProperty("unit_kind")
	private long unitKind;
	@JsonProperty("transform_value")
	private long transformValue;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
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
	public String getRefProcessVarId() {
		return refProcessVarId;
	}
	public void setRefProcessVarId(String refProcessVarId) {
		this.refProcessVarId = refProcessVarId;
	}
	public long getRefProuductId() {
		return refProuductId;
	}
	public void setRefProuductId(long refProuductId) {
		this.refProuductId = refProuductId;
	}
	public String getRefProcessMachineId() {
		return refProcessMachineId;
	}
	public void setRefProcessMachineId(String refProcessMachineId) {
		this.refProcessMachineId = refProcessMachineId;
	}
	public long getRefProcessChainElementId() {
		return refProcessChainElementId;
	}
	public void setRefProcessChainElementId(long refProcessChainElementId) {
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
	public long getUsl() {
		return usl;
	}
	public void setUsl(long usl) {
		this.usl = usl;
	}
	public long getLsl() {
		return lsl;
	}
	public void setLsl(long lsl) {
		this.lsl = lsl;
	}
	public long getUnitKind() {
		return unitKind;
	}
	public void setUnitKind(long unitKind) {
		this.unitKind = unitKind;
	}
	public long getTransformValue() {
		return transformValue;
	}
	public void setTransformValue(long transformValue) {
		this.transformValue = transformValue;
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
	
	
	
	
	
	
	
}
