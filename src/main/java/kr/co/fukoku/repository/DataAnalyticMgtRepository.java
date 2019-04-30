package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface DataAnalyticMgtRepository {
	
	@Select("select * from monitoring_mstate_tmp order by work_date desc")
	List<Map<String, Object>> monitoring_mstate_tmp( );

	
	@Select("select *, daily_seq - good_product as ng_product  from monitoring_workpiece_amount_tmp order by work_date desc")
	List<Map<String, Object>> monitoring_workpiece_amount_tmp( );

}
