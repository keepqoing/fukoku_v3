package kr.co.fukoku.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.fukoku.model.Product;

public class Line {

	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("factory")
	private Factory factory;
	@JsonProperty("layout_name")
	private String layoutName;
	@JsonProperty("product")
	private Product product;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;
	@JsonProperty("remark")
	private String remark;
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("acronym")
	private String acronym;
	
	public String getAcronym() {
		return acronym;
	}

	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	
	
	@JsonProperty("process_chain")
	private ProcessChain processChain;
	
	
	
	public Line() {
		super();
	}
	
	
	
	

	public Line(String name) {
		super();
		this.name = name;
	}





	public Line(long id, long seq, String name, Factory factory, String layoutName, Product product, String startDate,
			String endDate, String remark, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.factory = factory;
		this.layoutName = layoutName;
		this.product = product;
		this.startDate = startDate;
		this.endDate = endDate;
		this.remark = remark;
		this.status = status;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getSeq() {
		return seq;
	}

	public void setSeq(long seq) {
		this.seq = seq;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Factory getFactory() {
		return factory;
	}

	public void setFactory(Factory factory) {
		this.factory = factory;
	}

	public String getLayoutName() {
		return layoutName;
	}

	public void setLayoutName(String layoutName) {
		this.layoutName = layoutName;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	



	public ProcessChain getProcessChain() {
		return processChain;
	}





	public void setProcessChain(ProcessChain processChain) {
		this.processChain = processChain;
	}
	
	
	
	
	
	
	
	
	
}
