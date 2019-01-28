package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ProcessChainElementModelFrm {

	@JsonProperty("ID")
	private long  id;
	@JsonProperty("STAGE")
	private int  stage;
	@JsonProperty("NAME")
	private String name;
	@JsonProperty("REF_PROCESS_CHAIN_ID")
	private long ref_process_chain_id;
	@JsonProperty("PROCESS_MACHINE")
	private List<ProcessMachineModelFrm> processMachineFrms;

	public ProcessChainElementModelFrm() {
	}

	public ProcessChainElementModelFrm(long id, int stage, String name, long ref_process_chain_id, List<ProcessMachineModelFrm> processMachineFrms) {
		this.id = id;
		this.stage = stage;
		this.name = name;
		this.ref_process_chain_id = ref_process_chain_id;
		this.processMachineFrms = processMachineFrms;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getStage() {
		return stage;
	}

	public void setStage(int stage) {
		this.stage = stage;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getRef_process_chain_id() {
		return ref_process_chain_id;
	}

	public void setRef_process_chain_id(long ref_process_chain_id) {
		this.ref_process_chain_id = ref_process_chain_id;
	}

	public List<ProcessMachineModelFrm> getProcessMachineFrms() {
		return processMachineFrms;
	}

	public void setProcessMachineFrms(List<ProcessMachineModelFrm> processMachineFrms) {
		this.processMachineFrms = processMachineFrms;
	}
}
