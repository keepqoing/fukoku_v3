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
    @JsonProperty("REF_LINE")
    private String ref_line;
    @JsonProperty("PROCESS_CHAIN")
    private List<ProcessChain> processChains;

    public ProcessModel() {
    }

    public ProcessModel(String ref_line, List<ProcessChain> processChains) {
        this.ref_line = ref_line;
        this.processChains = processChains;
    }

    public String getRef_line() {
        return ref_line;
    }

    public void setRef_line(String ref_line) {
        this.ref_line = ref_line;
    }

    public List<ProcessChain> getProcessChains() {
        return processChains;
    }

    public void setProcessChains(List<ProcessChain> processChains) {
        this.processChains = processChains;
    }
}
