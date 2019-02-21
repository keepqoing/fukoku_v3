package kr.co.fukoku.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ProcessChainProduct {
	
	@JsonProperty("id")
	private long  id;
	
	@JsonProperty("ref_product")
	private String refProduct;
	
	@JsonProperty("ref_process_chain_id")
	private long refProcessChainId;
	
	@JsonProperty("status")
	private String status;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRefProduct() {
		return refProduct;
	}

	public void setRefProduct(String refProduct) {
		this.refProduct = refProduct;
	}

	public long getRefProcessChainId() {
		return refProcessChainId;
	}

	public void setRefProcessChainId(long refProcessChainId) {
		this.refProcessChainId = refProcessChainId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	

}
