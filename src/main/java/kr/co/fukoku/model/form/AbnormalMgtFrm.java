package kr.co.fukoku.model.form;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AbnormalMgtFrm {

    @JsonProperty("id")
    private long id;

    @JsonProperty("seq")
    private int seq;

    @JsonProperty("name")
    private String name;

    @JsonProperty("ref_factory_id")
    private int refFactoryId;

    @JsonProperty("ref_department_id")
    private int refDepartmentId;

    @JsonProperty("lst_line")
    private List<Long> lines;

    @JsonProperty("data")
    private String data;

    @JsonProperty("order_by")
    private String orderBy;

    public AbnormalMgtFrm() {
        super();
    }

    public AbnormalMgtFrm(String name) {
        super();
        this.name = name;
    }

    public AbnormalMgtFrm(long id, int seq, String name, int refFactoryId, int refDepartmentId, List<Long> lines, String data, String orderBy) {
        super();
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.refFactoryId = refFactoryId;
        this.refDepartmentId = refDepartmentId;
        this.lines = lines;
        this.data = data;
        this.orderBy = orderBy;
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

    public int getRefFactoryId() {
        return refFactoryId;
    }

    public void setRefFactoryId(int refFactoryId) {
        this.refFactoryId = refFactoryId;
    }

    public int getRefDepartmentId() {
        return refDepartmentId;
    }

    public void setRefDepartmentId(int refDepartmentId) {
        this.refDepartmentId = refDepartmentId;
    }

    public List<Long> getLines() {
        return lines;
    }

    public void setLines(List<Long> lines) {
        this.lines = lines;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
}
