package kr.co.fukoku.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import kr.co.fukoku.model.FaultLink;
import kr.co.fukoku.model.FaultNode;


import java.util.List;
import java.util.Map;

public class ResponseList<T> extends Response {

	@JsonProperty("DATA")
	public List<T> data;
	@JsonProperty("DATA1")
	public Map<T, T> data1;
	@JsonProperty("LINK")
	public List<FaultLink> link;
	@JsonProperty("NODE")
	public List<FaultNode> node;
	
	@JsonProperty("PAGINATION")
	public Pagination pagination;

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public Pagination getPagination() {
		return pagination;
	}

	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

	public Map<T, T> getData1() {
		return data1;
	}

	public void setData1(Map<String, Object> data1) {
		this.data1 = (Map<T, T>) data1;
	}

	public List<FaultLink> getLink() {
		return link;
	}

	public void setLink(List<FaultLink> link) { this.link = link; }

	public List<FaultNode> getNode() {
		return node;
	}

	public void setNode(List<FaultNode> node) {
		this.node = node;
	}
}
