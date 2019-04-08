package kr.co.fukoku.repository;

import kr.co.fukoku.model.StateName;
import kr.co.fukoku.model.form.StateNameFrm;
import kr.co.fukoku.repository.sql.StateNameSQLBuilder;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface StateNameRepository {

	@Select("Select * from state_name;")
	@Results(value={
			@Result(property="engName",column="eng_name"),
			@Result(property="koreanName",column="korean_name"),
			@Result(property="apiFieldName",column="api_field_name")
	})
	List<StateName> findAll();

	@SelectProvider(type = StateNameSQLBuilder.class, method = "find")
	List<Map<String, Object>> findMap(@Param("f") StateNameFrm frm);

	@Select("Select * from state_name where id=#{id} and status='1'")
	StateName findOne(@Param("id") long id);

	@Select("Select * from state_name where korean_name=#{korean_name} and status='1'")
	StateName findOneByKoreanName(@Param("koreanName") String koreanName);

	@Select("Select * from state_name where eng_name=#{englishName} and status='1'")
	StateName findOneByEnglishName(@Param("englishName") String englishName);

	@Select("Select * from state_name where api_field_name=#{apiFieldName} and status='1'")
	StateName findOneByApiFieldName(@Param("englishName") String apiFieldName);

	@Insert("insert into state_name ("
			+ " seq, eng_name, korean_name , status, color, unit, api_field_name "
			+ ") VALUES ("
			+ "	#{f.seq}, "
			+ "	#{f.engName}, "
			+ " #{f.koreanName}, "
			+ " #{f.status}, "
			+ " #{f.color}, "
			+ " #{f.unit}, "
			+ " #{f.apiFieldName} "
			+ ");")
	boolean save(@Param("f") StateNameFrm frm);

	@Insert("<script>insert into state_name ("
			+ " seq, eng_name, korean_name , status, color, unit, api_field_name "
			+ ") VALUES "
			+ " <foreach collection='lst' item='f' separator=','>("
			+ "	#{f.seq}, "
			+ "	#{f.engName}, "
			+ " #{f.koreanName}, "
			+ " #{f.status}, "
			+ " #{f.color}, "
			+ " #{f.unit}, "
			+ " #{f.apiFieldName} "
			+ " )"
			+ "</foreach></script>")
	boolean saveLst(@Param("lst") List<StateNameFrm> lst);
	
	@Update("UPDATE state_name SET"
			+ "	seq = #{f.seq}, "
			+ " eng_name = #{f.engName},"
			+ " korean_name = #{f.koreanName}, "
			+ " status = #{f.status}, "
			+ " color = #{f.color}, "
			+ " unit = #{f.unit}, "
			+ " api_field_name = #{f.api_field_name} "
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") StateNameFrm frm);
	
	@Delete("DELETE FROM state_name WHERE id=#{id}")
	boolean delete(@Param("id") long id);

}
