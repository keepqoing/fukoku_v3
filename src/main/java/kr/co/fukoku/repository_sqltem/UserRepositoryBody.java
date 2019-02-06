package kr.co.fukoku.repository_sqltem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.User;
import kr.co.fukoku.model.form.UserFilter;
import kr.co.fukoku.model.response.Pagination;

import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepositoryBody implements UserRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<User> findAll(UserFilter userFilter, Pagination pagination) throws SQLException {
        pagination.setTotalCount(count(userFilter));
        RowMapper<User> rowMapper = (rs, rowNum) -> {
            User user = new User(
                    rs.getInt("id"),
                    rs.getString("e_id"),
                    rs.getString("_password"),
                    rs.getString("_name"),
                    rs.getString("phone"),
                    rs.getString("cell_phone"),
                    rs.getString("email"),
                    rs.getString("position"),
                    rs.getString("role"),
                    rs.getString("_status"),
                    rs.getString("ref_department"),
                    rs.getString("ref_line")
            );
            return user;
        };
        if(userFilter.getDepartment().equals("") && userFilter.getFilter().equals(""))
            return jdbcTemplate.query(SQLStatement.UserSQL.FIND_ALL.toString(), new Object[]{pagination.getLimit(), pagination.getOffset()}, rowMapper);
        else if(!userFilter.getDepartment().equals("") && userFilter.getFilter().equals(""))
            return jdbcTemplate.query(SQLStatement.UserSQL.FIND_ALL_BY_DEPARTMENT.toString(), new Object[]{userFilter.getDepartment(), pagination.getLimit(), pagination.getOffset()}, rowMapper);
        else if(!userFilter.getDepartment().equals("") && !userFilter.getFilter().equals(""))
            return jdbcTemplate.query(SQLStatement.UserSQL.FIND_ALL_BY_DEPARTMENT_AND_FILTER.toString(), new Object[]{userFilter.getDepartment(), "%" + userFilter.getFilter() + "%", pagination.getLimit(), pagination.getOffset()}, rowMapper);
        else if(userFilter.getDepartment().equals("") && !userFilter.getFilter().equals(""))
            return jdbcTemplate.query(SQLStatement.UserSQL.FIND_ALL_BY_DEPARTMENT_AND_FILTER.toString(), new Object[]{userFilter.getDepartment(), "%" + userFilter.getFilter() + "%", pagination.getLimit(), pagination.getOffset()}, rowMapper);
        else
            return null;
    }

    @Override
    public User findOne(int id) throws SQLException {
        try {
            RowMapper<User> rowMapper = (rs, rowNum) -> {
                User user = new User(
                        rs.getInt("id"),
                        rs.getString("e_id"),
                        rs.getString("_password"),
                        rs.getString("_name"),
                        rs.getString("phone"),
                        rs.getString("cell_phone"),
                        rs.getString("email"),
                        rs.getString("position"),
                        rs.getString("role"),
                        rs.getString("_status"),
                        rs.getString("ref_department"),
                        rs.getString("ref_line")
                );
                return user;
            };
            return jdbcTemplate.queryForObject(SQLStatement.UserSQL.FIND_BY_ID.toString(),
                    new Object[]{
                            id
                    }, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(User user) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.UserSQL.ADD.toString(), new Object[]{
                user.geteId(),
                user.getPassword(),
                user.getName(),
                user.getPhone(),
                user.getCellPhone(),
                user.getEmail(),
                user.getPosition(),
                user.getRole(),
                user.getStatus(),
                user.getDepartment(),
                user.getLine()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean update(User user) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.UserSQL.UPDATE.toString(), new Object[]{
                user.geteId(),
                user.getName(),
                user.getPhone(),
                user.getCellPhone(),
                user.getEmail(),
                user.getPosition(),
                user.getRole(),
                user.getStatus(),
                user.getDepartment(),
                user.getLine(),
                user.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean updatePassword(User user) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.UserSQL.UPDATE_PASSWORD.toString(), new Object[]{
                user.getPassword(),
                user.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.UserSQL.DELETE.toString(),
                new Object[]{
                        id
                });
        if (result == 1) {
            return true;
        }
        return false;
    }

    private Long count(UserFilter userFilter){
        if(userFilter.getDepartment().equals("") && userFilter.getFilter().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.UserSQL.COUNT_ALL.toString(), new Object[]{}, Long.class);
        else if(!userFilter.getDepartment().equals("") && userFilter.getFilter().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.UserSQL.COUNT_ALL_BY_DEPARTMENT.toString(), new Object[]{userFilter.getDepartment()}, Long.class);
        else if(!userFilter.getDepartment().equals("") && !userFilter.getFilter().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.UserSQL.COUNT_ALL_BY_DEPARTMENT_AND_FILTER.toString(), new Object[]{userFilter.getDepartment(), "%"+userFilter.getFilter()+"%"}, Long.class);
        else if(userFilter.getDepartment().equals("") && !userFilter.getFilter().equals(""))
            return jdbcTemplate.queryForObject(SQLStatement.UserSQL.COUNT_ALL_BY_FILTER.toString(), new Object[]{"%"+userFilter.getFilter()+"%"}, Long.class);
        else
            return 0L;
    }
}
