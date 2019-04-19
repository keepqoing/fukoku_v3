package kr.co.fukoku.repository_hbase;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import kr.co.fukoku.configuration.mapper.PhoenixMapper;
import kr.co.fukoku.model.Workpiece;

@PhoenixMapper
public interface WorkpieceHBaseRealTimeRepository {
	
	// HA+GAMMA+Balancer+1차드릴수+2018-05-16 - HA+GAMMA+Balancer+1차드릴수+2018-05-19
	@Select("select "
			+ "\"idx\".\"lpmprd\", " 
			+ "\"pi\".\"ds\", \"pi\".\"dsok\", \"pi\".\"pst\", "
			+ "\"pi\".\"pet\" , \"pdi\".\"pdst\",\"pdi\".\"pdet\", "
			+ "\"pdi\".\"rd\" , \"pdi\".\"rp\",\"pi\".\"pq\",\"pdi\".\"q\" , "
			+ "\"msi\".\"ms\" from \"workpiece\" \r\n" + 
			"where "
			+ "\"idx\".\"lpmprd\" >= #{start} "
			+ "and \"idx\".\"lpmprd\" <=  #{stop}")
	@Results(value={
			@Result(property = "rowKey" , column = "lpmprd"),
            @Result(property = "dailySeq" , column = "ds"),
            @Result(property = "dailyOk" , column = "dsok"),
            @Result(property = "productStartTime" , column = "pst"),
            @Result(property = "productEndTime" , column = "pet"),
            @Result(property = "productDetailStartTime" , column = "pdst"),
            @Result(property = "productDetailEndTime" , column = "pdet"),
            @Result(property = "readData" , column = "rd"),
            @Result(property = "readPoints" , column = "rp"),
            @Result(property = "productQuality" , column = "pq"),
            @Result(property = "productDetailQuality" , column = "q")
	})
	public List<Workpiece> findWorkpiecePhoenixIndex(@Param("start") String startLpmprd, @Param("stop") String stopLpmprd);

}
