package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductProcessVarFrm {
    @JsonProperty("ID")
    private long id;

    @JsonProperty("SEQ")
    private int seq;

    @JsonProperty("REF_PROCESS_VAR_ID")
    private int ref_process_var_id;

    @JsonProperty("REF_PROUDUCT_ID")
    private int ref_prouduct_id;

    @JsonProperty("REF_PROCESS_MACHINE_ID")
    private int ref_process_machine_id;

    @JsonProperty("REF_PROCESS_CHAIN_ID")
    private int ref_process_chain_id;

    @JsonProperty("NAME")
    private String name;

    @JsonProperty("TYPE")
    private String type;

    @JsonProperty("USL")
    private int usl;

    @JsonProperty("LSL")
    private int lsl;

    @JsonProperty("UNITKIND")
    private int unitKind;

    @JsonProperty("TRANSFORM_VALUE")
    private int transform_value;

    @JsonProperty("REMARK")
    private String remark;

    @JsonProperty("STATUS")
    private String status;

    public ProductProcessVarFrm() {
    }

    public ProductProcessVarFrm(long id, int seq, int ref_process_var_id, int ref_prouduct_id, int ref_process_machine_id, int ref_process_chain_id, String name, String type, int usl, int lsl, int unitKind, int transform_value, String remark, String status) {
        this.id = id;
        this.seq = seq;
        this.ref_process_var_id = ref_process_var_id;
        this.ref_prouduct_id = ref_prouduct_id;
        this.ref_process_machine_id = ref_process_machine_id;
        this.ref_process_chain_id = ref_process_chain_id;
        this.name = name;
        this.type = type;
        this.usl = usl;
        this.lsl = lsl;
        this.unitKind = unitKind;
        this.transform_value = transform_value;
        this.remark = remark;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getSeq() {
        return seq;
    }

    public void setSeq(int seq) {
        this.seq = seq;
    }

    public int getRef_process_var_id() {
        return ref_process_var_id;
    }

    public void setRef_process_var_id(int ref_process_var_id) {
        this.ref_process_var_id = ref_process_var_id;
    }

    public int getRef_prouduct_id() {
        return ref_prouduct_id;
    }

    public void setRef_prouduct_id(int ref_prouduct_id) {
        this.ref_prouduct_id = ref_prouduct_id;
    }

    public int getRef_process_machine_id() {
        return ref_process_machine_id;
    }

    public void setRef_process_machine_id(int ref_process_machine_id) {
        this.ref_process_machine_id = ref_process_machine_id;
    }

    public int getRef_process_chain_id() {
        return ref_process_chain_id;
    }

    public void setRef_process_chain_id(int ref_process_chain_id) {
        this.ref_process_chain_id = ref_process_chain_id;
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

    public int getUsl() {
        return usl;
    }

    public void setUsl(int usl) {
        this.usl = usl;
    }

    public int getLsl() {
        return lsl;
    }

    public void setLsl(int lsl) {
        this.lsl = lsl;
    }

    public int getUnitKind() {
        return unitKind;
    }

    public void setUnitKind(int unitKind) {
        this.unitKind = unitKind;
    }

    public int getTransform_value() {
        return transform_value;
    }

    public void setTransform_value(int transform_value) {
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
}
