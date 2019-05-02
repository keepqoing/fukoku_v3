package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;

public class ProductProcessVar {

	@JsonProperty("id")
	private long id;
	@JsonProperty("seq")
	private long seq;
	@JsonProperty("ref_product_id")
	private long refProductId;
	@JsonProperty("ref_process_chain_machine_id")
	private String refProcessChainMachineId;
	@JsonProperty("ref_process_var_id")
	private long refProcessVarId;
	@JsonProperty("type")
	private String type;
	@JsonProperty("usl")
	private String usl;
	@JsonProperty("lsl")
	private String lsl;
	@JsonProperty("name")
	private String name;
	@JsonProperty("unit_kind")
	private String unitKind;
	@JsonProperty("transform_value")
	private String transformValue;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;

	@JsonProperty("ref_process_machine_id")
	private long refProcessMachineId;

	@JsonProperty("usl_plc")
	private long uslPlc;
	@JsonProperty("lsl_plc")
	private long lslPlc;
	@JsonProperty("sign")
	private String sign;

	// for sensor
	private long refLine;
	private long refFactory;

	public long getRefProcessVarId() {
		return refProcessVarId;
	}

	public void setRefProcessVarId(long refProcessVarId) {
		this.refProcessVarId = refProcessVarId;
	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUnitKind() {
		return unitKind;
	}

	public void setUnitKind(String unitKind) {
		this.unitKind = unitKind;
	}

	public String getTransformValue() {
		return transformValue;
	}

	public void setTransformValue(String transformValue) {
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

	public long getUslPlc() {
		return uslPlc;
	}

	public void setUslPlc(long uslPlc) {
		this.uslPlc = uslPlc;
	}

	public long getLslPlc() {
		return lslPlc;
	}

	public void setLslPlc(long lslPlc) {
		this.lslPlc = lslPlc;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
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
