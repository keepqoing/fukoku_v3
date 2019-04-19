package kr.co.fukoku.model.form.wp;

import java.util.List;

public class WorkpieceIndexing {
	
	private String line;
	private String product;
	private String machine;
	private String process;
	private List<String> processes;
	private String startTime;
	private String stopTime;
	private String start;
	private String stop;
	
	private long usl;
	private long lsl;
	
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getStop() {
		return stop;
	}
	public void setStop(String stop) {
		this.stop = stop;
	}
	public String getLine() {
		return line;
	}
	public void setLine(String line) {
		this.line = line;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getMachine() {
		return machine;
	}
	public void setMachine(String machine) {
		this.machine = machine;
	}
	
	
	
	public List<String> getProcesses() {
		return processes;
	}
	public void setProcesses(List<String> processes) {
		this.processes = processes;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getStopTime() {
		return stopTime;
	}
	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}
	public String getProcess() {
		return process;
	}
	public void setProcess(String process) {
		this.process = process;
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
	
	
	

}
