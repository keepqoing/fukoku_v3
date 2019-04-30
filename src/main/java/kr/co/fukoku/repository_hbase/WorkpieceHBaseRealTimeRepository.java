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
	
	// select * from "workpiece" where ROWKEY = 'HA+Balancer+GAMMA+1차드릴수+1526450633404'
	@Select("select "
			+ " *  from \"workpiece\" \r\n" + 
			"where "
			+ "\"ROWKEY\" >= #{start} "
			+ "and \"ROWKEY\" <  #{stop} LIMIT 20 offset #{offset}")
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
            @Result(property = "productDetailQuality" , column = "q"),
            @Result(property = "productDate" , column = "pd"),
            @Result(property = "processName" , column = "n"),
            @Result(property = "model" , column = "m"),
            @Result(property = "machineName" , column = "mn"),
            @Result(property = "lineName" , column = "ln"),
            @Result(property = "avgReadData" , column = "avg_rd"),
	})
	public List<Workpiece> findWorkpieceHbaseIndex(@Param("start") String startLpmprd, @Param("stop") String stopLpmprd , @Param("offset") long offset );
	
	@Select("select "
			+ " COUNT(ROWKEY) as count  from \"workpiece\" \r\n" + 
			"where "
			+ "\"ROWKEY\" >= #{start} "
			+ "and \"ROWKEY\" <=  #{stop}")
	public long countWorkpiece(@Param("start") String startLpmprd, @Param("stop") String stopLpmprd  );

}
