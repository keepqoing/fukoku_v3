package kr.co.fukoku.model;

public class SensorAdHoc {
	
	private long id;
	private long seq;
	private String des;
	private String sensorName;
	private long temperature;
	private long humidity;
	private String startTime;
	private String endTime;
	private String refLine;
	private String refFactory;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSensorName() {
		return sensorName;
	}
	public void setSensorName(String sensorName) {
		this.sensorName = sensorName;
	}
	public long getTemperature() {
		return temperature;
	}
	public void setTemperature(long temperature) {
		this.temperature = temperature;
	}
	public long getHumidity() {
		return humidity;
	}
	public void setHumidity(long humidity) {
		this.humidity = humidity;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getRefLine() {
		return refLine;
	}
	public void setRefLine(String refLine) {
		this.refLine = refLine;
	}
	public String getRefFactory() {
		return refFactory;
	}
	public void setRefFactory(String refFactory) {
		this.refFactory = refFactory;
	}
	public long getSeq() {
		return seq;
	}
	public void setSeq(long seq) {
		this.seq = seq;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	
	
	
	

}
