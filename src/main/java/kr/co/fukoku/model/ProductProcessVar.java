package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;

public class ProductProcessVar {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("ref_product_id")
	private long refProductId; 
	@JsonProperty("ref_process_chain_machine_id")
	private String refProcessChainMachineId;
	@JsonProperty("type")
	private String type;
	@JsonProperty("usl")
	private long usl;
	@JsonProperty("lsl")
	private long lsl;
	@JsonProperty("name")
	private String name;
	@JsonProperty("unit_kind")
	private long unitKind;
	@JsonProperty("transform_value")
	private long transformValue;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("ref_process_machine_id")
	private long  refProcessMachineId;
	
	
	
	
	public long getRefProcessMachineId() {
		return refProcessMachineId;
	}
	public void setRefProcessMachineId(long refProcessMachineId) {
		this.refProcessMachineId = refProcessMachineId;
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
	public long getRefProductId() {
		return refProductId;
	}
	public void setRefProductId(long refProductId) {
		this.refProductId = refProductId;
	}
	public String getRefProcessChainMachineId() {
		return refProcessChainMachineId;
	}
	public void setRefProcessChainMachineId(String refProcessChainMachineId) {
		this.refProcessChainMachineId = refProcessChainMachineId;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public ProductProcessVar() {
		super();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
