package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.NewCorrelationFilter;
import kr.co.fukoku.model.WorkpieceCorrelation;
import kr.co.fukoku.utils.Counting;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NewCorrelationRepositoryBody implements NewCorrelationRepository {

    private static DecimalFormat df2 = new DecimalFormat(".###");

    // DB Name for previous version
    String dbName = "fukuko_v2";

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    @Autowired
//    private MachineService machineService;

    @Override
    public List<Object[]> findAll(NewCorrelationFilter correlationFilter) throws SQLException {

        // get mapping machine
//        Map<String, String> map = machineService.getAllMachineNameAndMappingWithKorean();

        correlationFilter.setMachine1(correlationFilter.getLine()+"_"+correlationFilter.getMachine1());
        correlationFilter.setMachine2(correlationFilter.getLine()+"_"+correlationFilter.getMachine2());
//        correlationFilter.setMachine1(map.get(correlationFilter.getMachine1()));
//        correlationFilter.setMachine2(map.get(correlationFilter.getMachine2()));
        System.out.println("main filter = "+correlationFilter.toString());

        // Fitler 1
        NewCorrelationFilter filter1 = new NewCorrelationFilter();
        filter1.setLine(correlationFilter.getLine());
        filter1.setMachine1(correlationFilter.getMachine1());
        filter1.setProcess1(correlationFilter.getProcess1());
        filter1.setStartDate1(correlationFilter.getStartDate1());
        filter1.setEndDate1(correlationFilter.getEndDate1());

        System.out.println("fillter 1 = "+filter1.toString());

        List<Counting> c = countWP(filter1);
        if(c.get(0).getNumber() == 0){
            return null;
        }


        // Fitler 2
        NewCorrelationFilter filter2 = new NewCorrelationFilter();
        filter2.setLine(correlationFilter.getLine());
        filter2.setMachine1(correlationFilter.getMachine2()); // We don't want to create another private variable to store filter. So, we used set machine1, but the value is machine2
        filter2.setProcess1(correlationFilter.getProcess2());
        filter2.setStartDate1(correlationFilter.getStartDate2());
        filter2.setEndDate1(correlationFilter.getEndDate2());
        System.out.println("fillter 2 = "+filter2.toString());

        c = countWP(filter2);
        if(c.get(0).getNumber() == 0){
            return null;
        }

        List<WorkpieceCorrelation> wp1 = getValue(filter1);
        List<WorkpieceCorrelation> wp2 = getValue(filter2);


        int size1, size2, size;
        size1 = wp1.size();
        size2 = wp2.size();
        size = (size1 > size2)?size2:size1; // we want to the least size between those two arrays
        if(size == 0){
            return null;
        }
        double min1, max1, min2, max2;
        max1 = wp1.get(0).getPdi_rd(); // because we already sort by desc in the store procedure
        min1 = wp1.get(wp1.size()-1).getPdi_rd(); // because we already sort by desc in the store procedure

        max2 = wp2.get(0).getPdi_rd(); // because we already sort by desc in the store procedure
        min2 = wp2.get(wp2.size()-1).getPdi_rd(); // because we already sort by desc in the store procedure

        List<Double> doubleList1 = new ArrayList<>();
        List<Double> doubleList2 = new ArrayList<>();
        List<Double> r = new ArrayList<>();


        // Array 1
        for(int i=0; i < size; i++ ){
            doubleList1.add(Double.parseDouble(df2.format((wp1.get(i).getPdi_rd() - min1) / (max1 - min1))));
            doubleList2.add(Double.parseDouble(df2.format((wp2.get(i).getPdi_rd() - min2) / (max2 - min2))));
        }

        double avgX = doubleList1.stream().mapToDouble(val -> val).average().orElse(0.0);
        double avgY = doubleList2.stream().mapToDouble(val -> val).average().orElse(0.0);

        double sdX = calculateSD(ArrayUtils.toPrimitive(doubleList1.toArray(new Double[doubleList1.size()])));
        double sdY = calculateSD(ArrayUtils.toPrimitive(doubleList2.toArray(new Double[doubleList2.size()])));
        double sd = sdX * sdY;

        double sum = 0.0;
        for(int i=0; i<size; i++){
            sum += (doubleList1.get(i) - avgX) * (doubleList2.get(i) - avgY) ;
        }

        double dr = sum / ( ( size - 1 ) * sd );
        r.add(Double.parseDouble(df2.format(dr)));
        List<Object[]> finalList = new ArrayList<>();
        finalList.add(doubleList1.toArray());
        finalList.add(doubleList2.toArray());
        finalList.add(r.toArray());
        return finalList;
    }

    public double calculateSD(double numArray[])
    {
        double sum = 0.0, standardDeviation = 0.0;
        int length = numArray.length;

        for(double num : numArray) {
            sum += num;
        }

        double mean = sum/length;

        for(double num: numArray) {
            standardDeviation += Math.pow(num - mean, 2);
        }

        return Math.sqrt(standardDeviation/length);
    }

    public List<WorkpieceCorrelation> getValue(NewCorrelationFilter correlationFilter) throws SQLException{

        RowMapper<WorkpieceCorrelation> rowMapper = (rs, rowNum) -> {
            WorkpieceCorrelation wpc = new WorkpieceCorrelation();
            wpc.setLi_ln(rs.getString("li_ln"));
            wpc.setMi_mn(rs.getString("mi_mn"));
            wpc.setPi_pst(rs.getString("pi_pst"));
            wpc.setPi_pet(rs.getString("pi_pet"));
            wpc.setPdi_rd(rs.getDouble("pdi_rd"));
            wpc.setPdi_n(rs.getString("pdi_n"));
            wpc.setPdi_pdst(rs.getString("pdi_pdst"));
            wpc.setPdi_pdet(rs.getString("pdi_pdet"));
            wpc.setPdi_rp(rs.getDouble("pdi_rp"));

            return wpc;
        };
        return jdbcTemplate.query(SQLStatement.WPCorrelationSQL.FIND_WP_CORR+" FROM "+dbName+".workpiece_"
                +correlationFilter.getLine().toLowerCase()
                +" WHERE mi_mn =  ? "
                +" AND DATE_FORMAT(pi_pst,'%Y-%m-%d %H:%i%s') >= ? "
                +" AND DATE_FORMAT(pi_pet,'%Y-%m-%d %H:%i%s') <= ? "
                +" AND pdi_n = ? "
                +" ORDER BY pdi_rd DESC; ".toString(), new Object[]{
                correlationFilter.getMachine1(),
                correlationFilter.getStartDate1(),
                correlationFilter.getEndDate1(),
                correlationFilter.getProcess1()

        }, rowMapper);
    }

    public List<Counting> countWP(NewCorrelationFilter correlationFilter) throws SQLException{
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting c = new Counting();
            c.setNumber(rs.getInt("count_wp"));

            return c;
        };
        return jdbcTemplate.query(SQLStatement.WPCorrelationSQL.COUNT_WP_CORR+" FROM "+dbName+".workpiece_"
                +correlationFilter.getLine().toLowerCase()
                +" WHERE mi_mn =  ? "
                +" AND DATE_FORMAT(pi_pst,'%Y-%m-%d %H:%i%s') >= ? "
                +" AND DATE_FORMAT(pi_pet,'%Y-%m-%d %H:%i%s') <= ? "
                +" AND pdi_n = ? "
                +"  ".toString(), new Object[]{
                correlationFilter.getMachine1(),
                correlationFilter.getStartDate1(),
                correlationFilter.getEndDate1(),
                correlationFilter.getProcess1()

        }, rowMapper);
    }
}
