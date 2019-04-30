package kr.co.fukoku.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.SensorAdHoc;
import kr.co.fukoku.model.form.LineFrm;


@Repository
public interface SensorAdHocRepository {

	@Select("SELECT * FROM sensor_ad_hoc  where ref_line=#{line}")
	@Results(value={
			@Result(property="sensorName",column="name"),
			@Result(property="temperature",column="temperature"),
			@Result(property="humidity",column="humidity"),
			@Result(property="startTime",column="start_time"),
			@Result(property="endTime",column="end_time"),
			@Result(property="refLine",column="ref_line"),
	})
	List<SensorAdHoc> findSensorAdHoc(@Param("line") String lineId);
	
	@Select("SELECT * FROM sensor_ad_hoc  where id=#{id}")
	@Results(value={
			@Result(property="sensorName",column="name"),
			@Result(property="temperature",column="temperature"),
			@Result(property="humidity",column="humidity"),
			@Result(property="startTime",column="start_time"),
			@Result(property="endTime",column="end_time"),
			@Result(property="refLine",column="ref_line"),
	})
	SensorAdHoc findOne(@Param("id") long id);
	
	@Insert("INSERT INTO sensor_ad_hoc ("
			+ "  name, temperature, humidity , start_time,end_time, ref_line "
			+ ") VALUES ("
			+ "	#{f.sensorName}, "
			+ " #{f.temperature}, "
			+ " #{f.humidity}, "
			+ " #{f.startTime}, "
			+ " #{f.endTime}, "
			+ " #{f.refLine} "
			+ ");")
	boolean save(@Param("f") SensorAdHoc f);
	
	@Update("UPDATE sensor_ad_hoc SET"
			+ "	name=#{f.sensorName}, "
			+ " temperature=#{f.temperature},"
			+ " humidity=#{f.humidity},"
			+ " start_time=#{f.startTime} ,"
			+ " end_time=#{f.endTime},"
			+ " ref_line=#{f.refLine}"
			+ "		 WHERE id=#{f.id}")
	boolean update(@Param("f") SensorAdHoc frm);
	
	@Delete("DELETE FROM sensor_ad_hoc WHERE id=#{id}")
	boolean delete(@Param("id") long id);
	
}
