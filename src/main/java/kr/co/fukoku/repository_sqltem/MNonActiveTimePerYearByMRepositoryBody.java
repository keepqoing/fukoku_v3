/*
package kr.ac.cbnu.cgac.fukoku.fukoku.repositories.body;
import kr.ac.cbnu.cgac.fukoku.fukoku.DBUtility;
import kr.ac.cbnu.cgac.fukoku.fukoku.filters.MStateFilter;
import kr.ac.cbnu.cgac.fukoku.fukoku.models.MState;
import kr.ac.cbnu.cgac.fukoku.fukoku.repositories.header.MStateRepository;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.*;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.stereotype.Repository;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Repository
public class MStateRepositoryBody implements MStateRepository {
    private HBaseConfiguration config = DBUtility.getConnection();
    private HTable table = null;
    public MStateRepositoryBody() {
    }
    @Override
    public List<MState> findMStateByLineAndStartTimeAndEndTime(MStateFilter filter) throws SQLException {
        List<MState> mStateList = new ArrayList<>();
        try {
            System.out.println("1111111111111111111111111111111 "+filter.getLineName());
            table = new HTable(config, "mstate");
            table.setScannerCaching(5);
            Scan scan = new Scan();
            scan.setCacheBlocks(true);
            SingleColumnValueFilter filter1 = new SingleColumnValueFilter
                    (Bytes.toBytes("li"), Bytes.toBytes("ln"), CompareFilter.CompareOp.EQUAL, new RegexStringComparator(filter.getLineName()));
            filter1.setFilterIfMissing(true);
            SingleColumnValueFilter filter3 = new SingleColumnValueFilter
                    (Bytes.toBytes("msi"), Bytes.toBytes("est"), CompareFilter.CompareOp.GREATER_OR_EQUAL, new BinaryComparator(Bytes.toBytes(filter.getStartTime())));
            filter3.setFilterIfMissing(true);
            SingleColumnValueFilter filter4 = new SingleColumnValueFilter
                    (Bytes.toBytes("msi"), Bytes.toBytes("eet"), CompareFilter.CompareOp.LESS_OR_EQUAL, new BinaryComparator(Bytes.toBytes(filter.getEndTime())));
            filter4.setFilterIfMissing(true);
            List<Filter> list = new ArrayList<Filter>();
            list.add(filter1);
            list.add(filter3);
            list.add(filter4);
            FilterList fl = new FilterList(FilterList.Operator.MUST_PASS_ALL, list);
            scan.setFilter(fl);
            ResultScanner rs = table.getScanner(scan);
            Result r;
            MState mState;
            try {
                while ((r = rs.next()) != null) {
                    mState = new MState(Bytes.toString(r.getValue(Bytes.toBytes("li"), Bytes.toBytes("ln"))),
                            Bytes.toString(r.getValue(Bytes.toBytes("mi"), Bytes.toBytes("mn"))),
                            Bytes.toString(r.getValue(Bytes.toBytes("msi"), Bytes.toBytes("ms"))),
                            Bytes.toString(r.getValue(Bytes.toBytes("msi"), Bytes.toBytes("est"))),
                            Bytes.toString(r.getValue(Bytes.toBytes("msi"), Bytes.toBytes("eet"))));
                    mStateList.add(mState);
                }
            } finally {
                rs.close();
                table.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return mStateList;
    }
}
*/
package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByMFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.List;


@Repository
public class MNonActiveTimePerYearByMRepositoryBody implements MNonActiveTimePerYearByMRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public MNonActiveTimePerYearByMRepositoryBody() {
    }
//    private MachineService machineService;
    @Override
    public List<MNonActiveTimePerYearByM> fineTotalHourByMachine(MFaultTimePerYearByMFilter filter) throws SQLException {
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        String s=null;

        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByMachine = new MNonActiveTimePerYearByM(

                    rs.getString("line"),
                    rs.getString("machine"),
                    rs.getString("s_m_1"),
                    rs.getString("s_m_2"),
                    rs.getString("s_m_3"),
                    rs.getString("s_m_4"),
                    rs.getString("s_m_5"),
                    rs.getString("s_m_6"),
                    rs.getString("s_m_7"),
                    rs.getString("s_m_8"),
                    rs.getString("s_m_9"),
                    rs.getString("s_m_10"),
                    rs.getString("s_m_11"),
                    rs.getString("s_m_12"),
                    rs.getString("total_active"),
                    rs.getString("total_stoptime"),
                   "0");

            return mFaultTimePerYearByMachine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.GET_OPERATING_TIME_BY_MACHINE.toString(), new Object[]{"%"+filter.getMachineName()+"%",filter.getStartTime()}, rowMapper);

    }
    @Override
    public List<MNonActiveTimePerYearByM> findMachineName() throws SQLException, BusinessException {
        System.out.println("@@@@@@@@@@@@@@@findMachineName()@@@@@@@@@@@@@@@@@@@");
        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByMachine = new MNonActiveTimePerYearByM(

                    rs.getString("machine")
            );
            System.out.println("MMMMMMMMMMMMMMMMMM "+rs.getString("machine"));
            return mFaultTimePerYearByMachine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.FIND_MACHINE_NAME.toString(), new Object[]{}, rowMapper);

    }

    @Override
    public List<MNonActiveTimePerYearByM> findMachineNameBySelectLine(MFaultTimePerYearByMFilter filter) throws SQLException {
        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByMachine = new MNonActiveTimePerYearByM(

                    rs.getString("machine")
            );
            System.out.println("PreFix_Machine_Name: "+rs.getString("machine"));
            return mFaultTimePerYearByMachine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.FIND_MACHINE_NAME_BY_LINE.toString(), new Object[]{filter.getLineName()}, rowMapper);

    }

    @Override
    public List<MNonActiveTimePerYearByM> findGraphDataByMachine(MFaultTimePerYearByMFilter filter) throws SQLException {
        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByLine = new MNonActiveTimePerYearByM(
                    rs.getString("date"),
                    rs.getString("line"),
                    new DecimalFormat("##.###").format(Double.valueOf(rs.getString("stop_auto_wait"))),
                    rs.getString("machine"),
                    "",
                    ""
            );
            return mFaultTimePerYearByLine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.STOP_AUTO_STOP_WAIT_Graph.toString(), new Object[]{"%"+filter.getMachineName()+"%",filter.getStartTime()}, rowMapper);

    }

    @Override
    public List<MNonActiveTimePerYearByM> findMachineNameInAllLine(MFaultTimePerYearByMFilter filter) {
        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
            MNonActiveTimePerYearByM mFaultTimePerYearByMachine = new MNonActiveTimePerYearByM(
                   rs.getString("mapping_name"),rs.getString("join_name"),rs.getString("_name"));
            //System.out.println("PreFix_Machine_Name: "+rs.getString("machine"));
            return mFaultTimePerYearByMachine;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.FIND_MACHINE_NAME_IN_ALL_LINE.toString(), new Object[]{"%"+filter.getMachineName()+"%"}, rowMapper);

    }

    @Override
    public List<MNonActiveTimePerYearByM> findNonOperationTimeEachMachine(MFaultTimePerYearByMFilter filter) {
       // System.out.println("<<<<<!!!!!>>>>>> "+filter.getStartTime()+" Korea:"+filter.getMachineName()+" WWW"+filter.getLineName()+" Eng:"+filter.getMachineNameEng());
        RowMapper<MNonActiveTimePerYearByM> rowMapper = null;
        try {
            rowMapper = (rs, rowNum) -> {
                MNonActiveTimePerYearByM mFaultTimePerYearByM = new MNonActiveTimePerYearByM();
                mFaultTimePerYearByM.setNon_operating_time(rs.getDouble("Non_operating_rate"));
               // System.out.println("&&&& "+rs.getDouble("Non_operating_rate"));
                return mFaultTimePerYearByM;
            };
        } catch (EmptyResultDataAccessException e){
            System.out.println("ERROR ========> " + e.getMessage());
            e.printStackTrace();
            return null;
        };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByMachine.GET_NON_OPERATION_TIME_BY_MACHINE.toString(), new Object[]{filter.getStartTime()+"%",filter.getMachineNameEng(),filter.getMachineNameEng(),filter.getStartTime()+"%",filter.getStartTime()+"%",filter.getMachineName(),filter.getLineName()}, rowMapper);


    }

    @Override
    public List<MNonActiveTimePerYearByM> findGraphData(MFaultTimePerYearByMFilter filter) {

        RowMapper<MNonActiveTimePerYearByM> rowMapper = (rs, rowNum) -> {
        MNonActiveTimePerYearByM mFaultTimePerYearByM = new MNonActiveTimePerYearByM(
                rs.getString("date"),
                rs.getString("line"),
                new DecimalFormat("##.###").format(Double.valueOf(rs.getString("stop_auto_wait"))),
                rs.getString("machine"),
                "",
                ""

        );
        return mFaultTimePerYearByM;
    };
        return jdbcTemplate.query(SQLStatement.MFaultTimePerYearByLine.STOP_AUTO_STOP_WAIT_GRAPH_BY_MACHINE.toString(), new Object[]{"%"+filter.getMachineName()+"%",filter.getStartTime()}, rowMapper);

}
}
