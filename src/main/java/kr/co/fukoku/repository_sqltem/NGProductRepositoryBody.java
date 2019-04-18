package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.NGProductFilter;
import kr.co.fukoku.model.NGProduct;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

@Repository
public class NGProductRepositoryBody implements NGProductRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
//    @Autowired
//    private MachineService machineService;

    @Override
    public List<NGProduct> findAll(NGProductFilter filter, Pagination pagination) {
        pagination.setTotalCount(count(filter));
//        Map<String, String> map = machineService.getAllMachineNameAndMapping();
        RowMapper<NGProduct> rowMapper = (rs, rowNum) -> {
            NGProduct ngProduct = new NGProduct(
                    rs.getInt("id"),
                    rs.getString("ref_line"),
                    rs.getString("ref_machine"),
                    rs.getString("ref_product"),
                    "",
                    rs.getString("start_time").replace("T"," "),
                    rs.getString("end_time").replace("T"," "),
                    rs.getString("production_date"),
                    rs.getString("status")
            );
            ngProduct.setQuality(rs.getString("quality"));
            String ms = rs.getString("mstate");
            if (ms.isEmpty() || ms.equals(null) || ms.equals("")) {
                ms = "EMPTY";
            } else {
                if (ms.length() != 4) {
                    StringTokenizer token = new StringTokenizer(ms, "_");
                    token.nextToken();
                    token.nextToken();
                    ms = token.nextToken();
                }
            }
            ngProduct.setMstate(ms);
            return ngProduct;
        };
        return jdbcTemplate.query(SQLStatement.NGProductSQL.FIND_ALL.toString(), new Object[]{
                "%" + filter.getLine() + "%",
                "%" + filter.getMachine() + "%",
                "%" + filter.getStatus() + "%",
                "%" + filter.getProductionDate() + "%",
                pagination.getLimit(),
                pagination.getOffset()
        }, rowMapper);
    }

    @Override
    public List<Counting> findAlarmByLine(String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(rs.getString("_name"), rs.getInt("counting"));
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.NGProductSQL.COUNT_NG_IN_LINE.toString(), new Object[]{"%"+productionDate+"%"}, rowMapper);
    }

    @Override
    public List<Counting> findAlarmByMachine(String line, String productionDate) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(rs.getString("mapping_name"), rs.getInt("counting"));
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.NGProductSQL.COUNT_NG_IN_MACHINE.toString(), new Object[]{"%"+productionDate.trim()+"%",line}, rowMapper);
    }

    @Override
    public NGProduct findOne(int id) {
        try {
//            Map<String, String> map = machineService.getAllMachineNameAndMapping();
            RowMapper<NGProduct> rowMapper = (rs, rowNum) -> {
                NGProduct ngProduct = new NGProduct(
                        rs.getInt("id"),
                        rs.getString("ref_line"),
                        rs.getString("ref_machine"),
                        rs.getString("ref_product"),
                        "",
                        rs.getString("start_time"),
                        rs.getString("end_time"),
                        rs.getString("production_date"),
                        rs.getString("quality"),
                        rs.getInt("product_cycle")
                );
                String ms = rs.getString("mstate");
                if (ms.isEmpty() || ms.equals(null) || ms.equals("")) {
                    ms = "EMPTY";
                } else {
                    StringTokenizer token = new StringTokenizer(ms, "_");
                    token.nextToken();
                    token.nextToken();
                    ms = token.nextToken();
                    System.out.println();
                }
                ngProduct.setMstate(ms);
                return ngProduct;
            };
            return jdbcTemplate.queryForObject(SQLStatement.NGProductSQL.FIND_BY_ID.toString(),
                    new Object[]{
                            id
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(NGProduct ngProduct) {
        int result = jdbcTemplate.update(SQLStatement.NGProductSQL.ADD.toString(), new Object[]{
                ngProduct.getLine(),
                ngProduct.getMachine(),
                ngProduct.getMstate(),
                ngProduct.getProduct(),
                ngProduct.getStartTime(),
                ngProduct.getEndTime(),
                ngProduct.getProductionDate()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean updateStatus(int status) {
        int result = jdbcTemplate.update(SQLStatement.NGProductSQL.UPDATE_STATUS.toString(), new Object[]{
                status
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    private Long count(NGProductFilter filter) {
        return jdbcTemplate.queryForObject(SQLStatement.NGProductSQL.COUNT.toString(), new Object[]{
                "%" + filter.getLine() + "%",
                "%" + filter.getMachine() + "%",
                "%" + filter.getStatus() + "%",
                "%" + filter.getProductionDate() + "%"
        }, Long.class);

    }
}