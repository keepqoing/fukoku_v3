package kr.co.fukoku.model.impl;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class WorkPieceMariaDBdto {
    private long id;
    private String rowKey; // row_key
    private String lineName; // li_ln
    private String machineName; // mi_mn
    private String mState; // msi_ms
    private String productionDate; // pi_pd
    private String dailySeq; // pi_ds
    private String model; // pi_m
    private String productCycle; // pi_pc
    private String productStartTime; // pi_pst
    private String productEndTime; // pi_pet
    private String rememberField; // pi_rf
    private String limitChanged; // pdi_lc
    private String seq; // pdi_s
    private String name; // pdi_n
    private String productDetailStartTime; // pdi_pdst
    private String productDetailEndTime; // pdi_pdet
    private String lcl; // pdi_lcl
    private String ucl; // pdi_ucl
    private String quality; // pdi_q
    private String readPoint; // pdi_q
    private String readData; // pdi_rd
    private String epochProductStartTime; // pi_pest
    private String epochProductDetailStartTime; // pdi_pdest
    private String epochProductEndTime; // pi_peet
    private String epochProductDetailEndTime; // pdi_pdeet
    private String machineCode; // pi_mc
    private String dailySeqOk; // pi_dsok
    private String dailySeqNg; // pi_dsng
    private String pQuality; // pi_q
    private String machineCycle;

    @JsonProperty("bar_values")
    private Object[][] barValues;
    @JsonProperty("lcl_values")
    private Object[][] lclValues;
    @JsonProperty("ucl_values")
    private Object[][] uclValues;
    private int pdMaxRD;
    private int goodPrd;
    private int defectivePrd;
    private int totalPrd;
    private  String  pdStartTimeFormat;
    private String  pdEndTimeFormat;




    public WorkPieceMariaDBdto(){}

    public WorkPieceMariaDBdto(String rowKey, String lineName, String machineName, String mState, String productionDate, String dailySeq, String model, String productCycle, String productStartTime, String productEndTime, String rememberField, String limitChanged, String seq, String name, String productDetailStartTime, String productDetailEndTime, String lcl, String ucl, String quality, String readPoint, String readData, String epochProductStartTime, String epochProductDetailStartTime, String epochProductEndTime, String epochProductDetailEndTime, String machineCode, String dailySeqOk, String dailySeqNg, String pQuality, String machineCycle) {
        this.rowKey = rowKey;
        this.lineName = lineName;
        this.machineName = machineName;
        this.mState = mState;
        this.productionDate = productionDate;
        this.dailySeq = dailySeq;
        this.model = model;
        this.productCycle = productCycle;
        this.productStartTime = productStartTime;
        this.productEndTime = productEndTime;
        this.rememberField = rememberField;
        this.limitChanged = limitChanged;
        this.seq = seq;
        this.name = name;
        this.productDetailStartTime = productDetailStartTime;
        this.productDetailEndTime = productDetailEndTime;
        this.lcl = lcl;
        this.ucl = ucl;
        this.quality = quality;
        this.readPoint = readPoint;
        this.readData = readData;
        this.epochProductStartTime = epochProductStartTime;
        this.epochProductDetailStartTime = epochProductDetailStartTime;
        this.epochProductEndTime = epochProductEndTime;
        this.epochProductDetailEndTime = epochProductDetailEndTime;
        this.machineCode = machineCode;
        this.dailySeqOk = dailySeqOk;
        this.dailySeqNg = dailySeqNg;
        this.pQuality = pQuality;
        this.machineCycle = machineCycle;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getEpochProductStartTime() {
        return epochProductStartTime;
    }

    public void setEpochProductStartTime(String epochProductStartTime) {
        this.epochProductStartTime = epochProductStartTime;
    }

    public String getEpochProductDetailStartTime() {
        return epochProductDetailStartTime;
    }

    public void setEpochProductDetailStartTime(String epochProductDetailStartTime) {
        this.epochProductDetailStartTime = epochProductDetailStartTime;
    }

    public String getEpochProductEndTime() {
        return epochProductEndTime;
    }

    public void setEpochProductEndTime(String epochProductEndTime) {
        this.epochProductEndTime = epochProductEndTime;
    }

    public String getEpochProductDetailEndTime() {
        return epochProductDetailEndTime;
    }

    public void setEpochProductDetailEndTime(String epochProductDetailEndTime) {
        this.epochProductDetailEndTime = epochProductDetailEndTime;
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

    public String getmState() {
        return mState;
    }

    public void setmState(String mState) {
        this.mState = mState;
    }

    public String getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(String productionDate) {
        this.productionDate = productionDate;
    }

    public String getDailySeq() {
        return dailySeq;
    }

    public void setDailySeq(String dailySeq) {
        this.dailySeq = dailySeq;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getProductCycle() {
        return productCycle;
    }

    public void setProductCycle(String productCycle) {
        this.productCycle = productCycle;
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

    public String getRememberField() {
        return rememberField;
    }

    public void setRememberField(String rememberField) {
        this.rememberField = rememberField;
    }

    public String getLimitChanged() {
        return limitChanged;
    }

    public void setLimitChanged(String limitChanged) {
        this.limitChanged = limitChanged;
    }

    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getLcl() {
        return lcl;
    }

    public void setLcl(String lcl) {
        this.lcl = lcl;
    }

    public String getUcl() {
        return ucl;
    }

    public void setUcl(String ucl) {
        this.ucl = ucl;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public String getReadPoint() {
        return readPoint;
    }

    public void setReadPoint(String readPoint) {
        this.readPoint = readPoint;
    }

    public String getReadData() {
        return readData;
    }

    public void setReadData(String readData) {
        this.readData = readData;
    }

    public String getMachineCode() {
        return machineCode;
    }

    public void setMachineCode(String machineCode) {
        this.machineCode = machineCode;
    }

    public String getDailySeqOk() {
        return dailySeqOk;
    }

    public void setDailySeqOk(String dailySeqOk) {
        this.dailySeqOk = dailySeqOk;
    }

    public String getDailySeqNg() {
        return dailySeqNg;
    }

    public void setDailySeqNg(String dailySeqNg) {
        this.dailySeqNg = dailySeqNg;
    }

    public String getpQuality() {
        return pQuality;
    }

    public void setpQuality(String pQuality) {
        this.pQuality = pQuality;
    }

    public String getMachineCycle() {
        return machineCycle;
    }

    public void setMachineCycle(String machineCycle) {
        this.machineCycle = machineCycle;
    }

    public Object[][] getBarValues() {
        return barValues;
    }

    public void setBarValues(Object[][] barValues) {
        this.barValues = barValues;
    }

    public Object[][] getLclValues() {
        return lclValues;
    }

    public void setLclValues(Object[][] lclValues) {
        this.lclValues = lclValues;
    }

    public Object[][] getUclValues() {
        return uclValues;
    }

    public void setUclValues(Object[][] uclValues) {
        this.uclValues = uclValues;
    }

    public int getPdMaxRD() {
        return pdMaxRD;
    }

    public void setPdMaxRD(int pdMaxRD) {
        this.pdMaxRD = pdMaxRD;
    }

    public int getGoodPrd() {
        return goodPrd;
    }

    public void setGoodPrd(int goodPrd) {
        this.goodPrd = goodPrd;
    }

    public int getDefectivePrd() {
        return defectivePrd;
    }

    public void setDefectivePrd(int defectivePrd) {
        this.defectivePrd = defectivePrd;
    }

    public int getTotalPrd() {
        return totalPrd;
    }

    public void setTotalPrd(int totalPrd) {
        this.totalPrd = totalPrd;
    }


    public String getPdStartTimeFormat()  {
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        String date1 = "";
        try {
            date = sdf1.parse(this.getProductDetailStartTime());
            date1 = sdf.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date1;
    }

    public void setPdStartTimeFormat(String pdStartTimeFormat) {
        this.pdStartTimeFormat = pdStartTimeFormat;
    }

    public String getPdEndTimeFormat() {
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        String date1 = "";
        try {
            date = sdf1.parse(this.getProductDetailEndTime());
            date1 = sdf.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date1;
    }

    public void setPdEndTimeFormat(String pdEndTimeFormat) {
        this.pdEndTimeFormat = pdEndTimeFormat;
    }

    @Override
    public String toString() {
        return "WorkPiece{" +
                "rowKey='" + rowKey + '\'' +
                ", lineName='" + lineName + '\'' +
                ", machineName='" + machineName + '\'' +
                ", mState='" + mState + '\'' +
                ", productionDate='" + productionDate + '\'' +
                ", dailySeq='" + dailySeq + '\'' +
                ", model='" + model + '\'' +
                ", productCycle='" + productCycle + '\'' +
                ", productStartTime='" + productStartTime + '\'' +
                ", productEndTime='" + productEndTime + '\'' +
                ", rememberField='" + rememberField + '\'' +
                ", limitChanged='" + limitChanged + '\'' +
                ", seq='" + seq + '\'' +
                ", name='" + name + '\'' +
                ", productDetailStartTime='" + productDetailStartTime + '\'' +
                ", productDetailEndTime='" + productDetailEndTime + '\'' +
                ", lcl='" + lcl + '\'' +
                ", ucl='" + ucl + '\'' +
                ", quality='" + quality + '\'' +
                ", readPoint='" + readPoint + '\'' +
                ", readData='" + readData + '\'' +
                ", epochProductStartTime='" + epochProductStartTime + '\'' +
                ", epochProductDetailStartTime='" + epochProductDetailStartTime + '\'' +
                ", epochProductEndTime='" + epochProductEndTime + '\'' +
                ", epochProductDetailEndTime='" + epochProductDetailEndTime + '\'' +
                ", machineCode='" + machineCode + '\'' +
                ", dailySeqOk='" + dailySeqOk + '\'' +
                ", dailySeqNg='" + dailySeqNg + '\'' +
                ", pQuality='" + pQuality + '\'' +
                ", machineCycle='" + machineCycle + '\'' +
                '}';
    }
}
