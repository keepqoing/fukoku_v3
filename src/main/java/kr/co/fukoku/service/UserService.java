package kr.co.fukoku.service;


import java.util.List;

import kr.co.fukoku.model.User;
import kr.co.fukoku.model.form.UserFilter;
import kr.co.fukoku.model.response.Pagination;

public interface UserService {
    List<User> getAllUsers(UserFilter userFilter, Pagination pagination)throws Exception  ;
    User getUser(int id) throws Exception ;
    boolean addUser(User user)throws Exception  ;
    boolean updateUser(User user)throws Exception ;
    boolean updateUserPassword(User user) throws Exception ;
    boolean deleteUser(int id) throws Exception ;
}
