package kr.co.fukoku.model;

public class Workpiece {

    private long id;
    
    private String rowKey;
    
    /********************************
     * Line : li
     *******************************/
    private String lineName;  // li:ln

    /********************************
     * Machine Info : mi
     ********************************/
    private String machineName; // mi:mn
    
    /********************************
     * Machine State Info : msi
     *******************************/
    private String machineState;  // msi:ms

    /********************************
     * Product Info : pi
     ********************************/
    private String productStartTime; // pi:pst
    private String productEndTime; // pi:pet
    private String dailySeq; // pi:ds
    private String dailyNg; // pi:ng
    private String dailyOk; // pi:ok
    private String model; // pi:m    :  product
    private String machineCode; // pi:mc
    private String productDate; // pi:pd
    private String productQuality; // pi:pq

    /********************************
     * Product Detail Info : pdi
     ********************************/
    private String limitChanged; // pdi:lc
    private String lsl; // pdi:lcl
    private String processName; // pdi:n
    private String productDetailQuality; // pdi:q   - use this to identify for good or abnormal product
    private String readData; // pdi:rd
    private String readPoints; // pdi:rp
    private String avgReadData; // pdi:avg_rd
    private String startTimeReadPoint; // pdi:st_rp
    private String sequence; // pdi:s
    private String usl; // pdi:ucl
    private String productDetailStartTime; // pi:pdst
    private String productDetailEndTime; // pi:pdet
    
    public Workpiece() {};
    
	public Workpiece(long id, String rowKey, String lineName, String machineName, String machineState,
			String productStartTime, String productEndTime, String dailySeq, String dailyNg, String dailyOk,
			String model, String machineCode, String productDate, String productQuality, String limitChanged,
			String lsl, String processName, String productDetailQuality, String readData, String readPoints,
			String avgReadData, String startTimeReadPoint, String sequence, String usl, String productDetailStartTime,
			String productDetailEndTime) {
		super();
		this.id = id;
		this.rowKey = rowKey;
		this.lineName = lineName;
		this.machineName = machineName;
		this.machineState = machineState;
		this.productStartTime = productStartTime;
		this.productEndTime = productEndTime;
		this.dailySeq = dailySeq;
		this.dailyNg = dailyNg;
		this.dailyOk = dailyOk;
		this.model = model;
		this.machineCode = machineCode;
		this.productDate = productDate;
		this.productQuality = productQuality;
		this.limitChanged = limitChanged;
		this.lsl = lsl;
		this.processName = processName;
		this.productDetailQuality = productDetailQuality;
		this.readData = readData;
		this.readPoints = readPoints;
		this.avgReadData = avgReadData;
		this.startTimeReadPoint = startTimeReadPoint;
		this.sequence = sequence;
		this.usl = usl;
		this.productDetailStartTime = productDetailStartTime;
		this.productDetailEndTime = productDetailEndTime;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRowKey() {
		return rowKey;
	}
	public void setRowKey(String rowKey) {
		this.rowKey = rowKey;
	}
	public String getLineName() {
		return lineName;
	}
	public void setLineName(String lineName) {
		this.lineName = lineName;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getMachineState() {
		return machineState;
	}
	public void setMachineState(String machineState) {
		this.machineState = machineState;
	}
	public String getProductStartTime() {
		return productStartTime;
	}
	public void setProductStartTime(String productStartTime) {
		this.productStartTime = productStartTime;
	}
	public String getProductEndTime() {
		return productEndTime;
	}
	public void setProductEndTime(String productEndTime) {
		this.productEndTime = productEndTime;
	}
	public String getDailySeq() {
		return dailySeq;
	}
	public void setDailySeq(String dailySeq) {
		this.dailySeq = dailySeq;
	}
	public String getDailyNg() {
		return dailyNg;
	}
	public void setDailyNg(String dailyNg) {
		this.dailyNg = dailyNg;
	}
	public String getDailyOk() {
		return dailyOk;
	}
	public void setDailyOk(String dailyOk) {
		this.dailyOk = dailyOk;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getMachineCode() {
		return machineCode;
	}
	public void setMachineCode(String machineCode) {
		this.machineCode = machineCode;
	}
	public String getProductDate() {
		return productDate;
	}
	public void setProductDate(String productDate) {
		this.productDate = productDate;
	}
	public String getProductQuality() {
		return productQuality;
	}
	public void setProductQuality(String productQuality) {
		this.productQuality = productQuality;
	}
	public String getLimitChanged() {
		return limitChanged;
	}
	public void setLimitChanged(String limitChanged) {
		this.limitChanged = limitChanged;
	}
	public String getLsl() {
		return lsl;
	}
	public void setLsl(String lsl) {
		this.lsl = lsl;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getProductDetailQuality() {
		return productDetailQuality;
	}
	public void setProductDetailQuality(String productDetailQuality) {
		this.productDetailQuality = productDetailQuality;
	}
	public String getReadData() {
		return readData;
	}
	public void setReadData(String readData) {
		this.readData = readData;
	}
	public String getReadPoints() {
		return readPoints;
	}
	public void setReadPoints(String readPoints) {
		this.readPoints = readPoints;
	}
	public String getAvgReadData() {
		return avgReadData;
	}
	public void setAvgReadData(String avgReadData) {
		this.avgReadData = avgReadData;
	}
	public String getStartTimeReadPoint() {
		return startTimeReadPoint;
	}
	public void setStartTimeReatPoint(String startTimeReadPoint) {
		this.startTimeReadPoint = startTimeReadPoint;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public String getUsl() {
		return usl;
	}
	public void setUsl(String usl) {
		this.usl = usl;
	}
	public String getProductDetailStartTime() {
		return productDetailStartTime;
	}
	public void setProductDetailStartTime(String productDetailStartTime) {
		this.productDetailStartTime = productDetailStartTime;
	}
	public String getProductDetailEndTime() {
		return productDetailEndTime;
	}
	public void setProductDetailEndTime(String productDetailEndTime) {
		this.productDetailEndTime = productDetailEndTime;
	}
	@Override
	public String toString() {
		return "Workpiece [id=" + id + ", rowKey=" + rowKey + ", lineName=" + lineName + ", machineName=" + machineName
				+ ", machineState=" + machineState + ", productStartTime=" + productStartTime + ", productEndTime="
				+ productEndTime + ", dailySeq=" + dailySeq + ", dailyNg=" + dailyNg + ", dailyOk=" + dailyOk
				+ ", model=" + model + ", machineCode=" + machineCode + ", productDate=" + productDate
				+ ", productQuality=" + productQuality + ", limitChanged=" + limitChanged + ", lsl=" + lsl
				+ ", processName=" + processName + ", productDetailQuality=" + productDetailQuality + ", readData="
				+ readData + ", readPoints=" + readPoints + ", avgReadData=" + avgReadData + ", startTimeReadPoint="
				+ startTimeReadPoint + ", sequence=" + sequence + ", usl=" + usl + ", productDetailStartTime="
				+ productDetailStartTime + ", productDetailEndTime=" + productDetailEndTime + "]";
	}
    
    
    
    
    
    
    
   
}
