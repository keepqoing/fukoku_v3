package kr.co.fukoku.repository.previousRepo;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public interface DefectiveProductV2Repository {

	@Select("SELECT * FROM fukoku_v2.defective_product_list_v2 order by date")
	List<Map<String, Object>> findAll();
	
	
	
}
