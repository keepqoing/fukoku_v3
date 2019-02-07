package kr.co.fukoku.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.User;
import kr.co.fukoku.model.form.UserFilter;
import kr.co.fukoku.model.response.Pagination;
import kr.co.fukoku.repository_sqltem.UserRepository;
import kr.co.fukoku.service.UserService;
import kr.co.fukoku.utils.Helper;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceBody implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers(UserFilter userFilter, Pagination pagination) throws Exception   {
    	List<User> users = new ArrayList<User>();
    	try {
        	users =userRepository.findAll(userFilter, pagination);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return users;
    }

    @Override
    public User getUser(int id) throws Exception {
        try {
            return userRepository.findOne(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean addUser(User user) throws Exception {
        try {
            user.setPassword(Helper.passwordEncoding(user.getPassword()));
            return userRepository.save(user);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean updateUser(User user) throws Exception {
        try {
            return userRepository.update(user);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean updateUserPassword(User user) throws Exception {
        try {
            user.setPassword(Helper.passwordEncoding(user.getPassword()));
            return userRepository.updatePassword(user);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean deleteUser(int id) throws Exception {
        try {
            return userRepository.delete(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }
}
