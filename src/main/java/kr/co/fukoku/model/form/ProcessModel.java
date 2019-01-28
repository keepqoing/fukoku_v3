package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/*
// STANDARD FORMAT
var data = [{
        "ID" : 1,
        "SEQ" : 1,
        "NAME" : "PD_CM5E",
        "REF_LINE" : "PD",
        "REF_PRODUCT" : "CM5E",
        "STATUS" : "1",
        "PROCESS_CHAIN_ELEMENT" : [{
        "ID" : 1,
        "STAGE" : 1,
        "NAME" : "PROCESS_1",
        "REF_PROCESS_CHAIN_ID" : 1,
        "PROCESS_MACHINE" : [{
        "ID" : 1,
        "SEQ" : 1,
        "REF_PROCESS_ID" : 1,
        "REF_MACHINE_ID" : 1,
        "REF_PROCESS_CHAIN_ELEMENT" : 1,
        "NEXT_SEQUENCE" : ""
        }]
        }]
        }];
*/


public class ProcessModel {
    @JsonProperty("ID")
    private long id;
    @JsonProperty("SEQ")
    private int seq;
    @JsonProperty("NAME")
    private String name;
    @JsonProperty("REF_LINE")
    private String ref_line;
    @JsonProperty("REF_PRODUCT")
    private String ref_product;
    @JsonProperty("STATUS")
    private String status;
    @JsonProperty("PROCESS_CHAIN_ELEMENT")
    private List<ProcessChainElementModelFrm> process_chain_element;

    public ProcessModel() {
    }

    public ProcessModel(long id, int seq, String name, String ref_line, String ref_product, String status, List<ProcessChainElementModelFrm> process_chain_element) {
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.ref_line = ref_line;
        this.ref_product = ref_product;
        this.status = status;
        this.process_chain_element = process_chain_element;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRef_line() {
        return ref_line;
    }

    public void setRef_line(String ref_line) {
        this.ref_line = ref_line;
    }

    public String getRef_product() {
        return ref_product;
    }

    public void setRef_product(String ref_product) {
        this.ref_product = ref_product;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ProcessChainElementModelFrm> getProcess_chain_element() {
        return process_chain_element;
    }

    public void setProcess_chain_element(List<ProcessChainElementModelFrm> process_chain_element) {
        this.process_chain_element = process_chain_element;
    }
}
