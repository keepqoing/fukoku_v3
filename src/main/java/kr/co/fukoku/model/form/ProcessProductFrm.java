package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessProductFrm {
    @JsonProperty("ID")
    private long id;
    @JsonProperty("REF_PRODUCT")
    private String ref_product;
    @JsonProperty("REF_PROCESS_CHAIN_ID")
    private int ref_process_chain_id;
    @JsonProperty("STATUS")
    private String status;

    public ProcessProductFrm() {
    }

    public ProcessProductFrm(long id, String ref_product, int ref_process_chain_id, String status) {
        this.id = id;
        this.ref_product = ref_product;
        this.ref_process_chain_id = ref_process_chain_id;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRef_product() {
        return ref_product;
    }

    public void setRef_product(String ref_product) {
        this.ref_product = ref_product;
    }

    public int getRef_process_chain_id() {
        return ref_process_chain_id;
    }

    public void setRef_process_chain_id(int ref_process_chain_id) {
        this.ref_process_chain_id = ref_process_chain_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
