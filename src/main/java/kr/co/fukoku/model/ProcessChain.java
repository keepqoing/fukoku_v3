package kr.co.fukoku.model;

import java.util.List;

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
	
	
	
	@JsonProperty("process_chain_element")
	private List<ProcessChainElement> processChainElement;
	
	@JsonProperty("ref_line")
	private String refLine;
	@JsonProperty("process_chain_product")
	private List<ProcessChainProduct> processChainProduct;
	
	@JsonProperty("process_chain_product_with_produced_amount")
	private List<ProcessChainProduct> processChainProductProducedAmount;
	
	
	
	
	public ProcessChain() {
		super();
	}
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
	public List<ProcessChainElement> getProcessChainElement() {
		return processChainElement;
	}
	public void setProcessChainElement(List<ProcessChainElement> processChainElement) {
		this.processChainElement = processChainElement;
	}
	public String getRefLine() {
		return refLine;
	}
	public void setRefLine(String refLine) {
		this.refLine = refLine;
	}
	public List<ProcessChainProduct> getProcessChainProduct() {
		return processChainProduct;
	}
	public void setProcessChainProduct(List<ProcessChainProduct> processChainProduct) {
		this.processChainProduct = processChainProduct;
	}
	
	
	
	

}
