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


import kr.co.fukoku.filters.FailureFactoryMonitoringFilter;
import kr.co.fukoku.model.FailureFactoryMonitoring;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


@Repository
public class FailureFactoryMonitoringRepositoryBody implements FailureFactoryMonitoringRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public FailureFactoryMonitoringRepositoryBody() {
    }

    @Override
    public List<FailureFactoryMonitoring> findMachineInFactory(FailureFactoryMonitoringFilter filter) throws SQLException {
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        RowMapper<FailureFactoryMonitoring> rowMapper = (rs, rowNum) -> {
            FailureFactoryMonitoring failureFactoryMonitoring = new FailureFactoryMonitoring(

                    rs.getString("_name"),
                    rs.getString("ref_factory")
            );
            System.out.println("_NAME: "+rs.getString("_name"));
            return failureFactoryMonitoring;
        };
        return jdbcTemplate.query(SQLStatement.FailureFactoryMonitoring.FINE_MACHINE_NAME.toString(), new Object[]{}, rowMapper);

    }

    @Override
    public List<FailureFactoryMonitoring> fineFactoryName() throws SQLException, IOException {
        RowMapper<FailureFactoryMonitoring> rowMapper = (rs, rowNum) -> {
            FailureFactoryMonitoring failureFactoryMonitoring = new FailureFactoryMonitoring(

                    rs.getString("_name")
            );
            System.out.println("GetFactory_Name: "+rs.getString("_name"));
            return failureFactoryMonitoring;
        };
        return jdbcTemplate.query(SQLStatement.FailureFactoryMonitoring.FIND_FACTORY_NAME.toString(), new Object[]{}, rowMapper);
    }
}
