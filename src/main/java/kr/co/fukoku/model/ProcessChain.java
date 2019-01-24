package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChain {
	
	@JsonProperty("id")
	private long  id;
	@JsonProperty("seq")
	private long  seq;
	@JsonProperty("name")
	private String name;
	@JsonProperty("line")
	private Line line;
	@JsonProperty("product")
	private Product product;
	@JsonProperty("status")
	private String status;
	public ProcessChain(long id, long seq, String name, Line line, Product product, String status) {
		super();
		this.id = id;
		this.seq = seq;
		this.name = name;
		this.line = line;
		this.product = product;
		this.status = status;
	}
	public ProcessChain(String name) {
		super();
		this.name = name;
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
	public Line getLine() {
		return line;
	}
	public void setLine(Line line) {
		this.line = line;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
