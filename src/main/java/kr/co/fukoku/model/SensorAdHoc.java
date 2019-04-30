package kr.co.fukoku.model;

public class SensorAdHoc {
	
	private long id;
	private String sensorName;
	private long temperature;
	private long humidity;
	private String startTime;
	private String endTime;
	private String refLine;
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
	
	
	
	

}
