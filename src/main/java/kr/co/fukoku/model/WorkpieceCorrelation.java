package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WorkpieceCorrelation implements Comparable<WorkpieceCorrelation>{
    @JsonProperty("LI_LN")
    private String li_ln;
    @JsonProperty("MI_MN")
    private String mi_mn;
    @JsonProperty("PI_PST")
    private String pi_pst;
    @JsonProperty("PI_PET")
    private String pi_pet;
    @JsonProperty("PDI_RD")
    private double pdi_rd;
    @JsonProperty("PDI_N")
    private String pdi_n;
    @JsonProperty("PDI_PDST")
    private String pdi_pdst;
    @JsonProperty("PDI_PDET")
    private String pdi_pdet;
    @JsonProperty("PDI_RP")
    private double pdi_rp;

    public WorkpieceCorrelation() {
    }

    public WorkpieceCorrelation(String li_ln, String mi_mn, String pi_pst, String pi_pet, double pdi_rd, String pdi_n, String pdi_pdst, String pdi_pdet, double pdi_rp) {
        this.li_ln = li_ln;
        this.mi_mn = mi_mn;
        this.pi_pst = pi_pst;
        this.pi_pet = pi_pet;
        this.pdi_rd = pdi_rd;
        this.pdi_n = pdi_n;
        this.pdi_pdst = pdi_pdst;
        this.pdi_pdet = pdi_pdet;
        this.pdi_rp = pdi_rp;
    }

    public String getLi_ln() {
        return li_ln;
    }

    public void setLi_ln(String li_ln) {
        this.li_ln = li_ln;
    }

    public String getMi_mn() {
        return mi_mn;
    }

    public void setMi_mn(String mi_mn) {
        this.mi_mn = mi_mn;
    }

    public String getPi_pst() {
        return pi_pst;
    }

    public void setPi_pst(String pi_pst) {
        this.pi_pst = pi_pst;
    }

    public String getPi_pet() {
        return pi_pet;
    }

    public void setPi_pet(String pi_pet) {
        this.pi_pet = pi_pet;
    }

    public double getPdi_rd() {
        return pdi_rd;
    }

    public void setPdi_rd(double pdi_rd) {
        this.pdi_rd = pdi_rd;
    }

    public String getPdi_n() {
        return pdi_n;
    }

    public void setPdi_n(String pdi_n) {
        this.pdi_n = pdi_n;
    }

    public String getPdi_pdst() {
        return pdi_pdst;
    }

    public void setPdi_pdst(String pdi_pdst) {
        this.pdi_pdst = pdi_pdst;
    }

    public String getPdi_pdet() {
        return pdi_pdet;
    }

    public void setPdi_pdet(String pdi_pdet) {
        this.pdi_pdet = pdi_pdet;
    }

    public double getPdi_rp() {
        return pdi_rp;
    }

    public void setPdi_rp(double pdi_rp) {
        this.pdi_rp = pdi_rp;
    }

    @Override
    public String toString() {
        return "WorkpieceCorrelation{" +
                "li_ln='" + li_ln + '\'' +
                ", mi_mn='" + mi_mn + '\'' +
                ", pi_pst='" + pi_pst + '\'' +
                ", pi_pet='" + pi_pet + '\'' +
                ", pdi_rd=" + pdi_rd +
                ", pdi_n='" + pdi_n + '\'' +
                ", pdi_pdst='" + pdi_pdst + '\'' +
                ", pdi_pdet='" + pdi_pdet + '\'' +
                ", pdi_rp=" + pdi_rp +
                '}';
    }


    @Override
    public int compareTo(WorkpieceCorrelation o) {
        if(this.getPdi_rd() > o.getPdi_rd())
            return 1;
        else if (this.getPdi_rd() < o.getPdi_rd())
            return -1;
        else
            return 0;
    }
}
