package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.model.User;
import kr.co.fukoku.model.form.UserFilter;
import kr.co.fukoku.model.form.UserForm;
import kr.co.fukoku.model.form.UserUpdatePassword;
import kr.co.fukoku.model.response.Pagination;
import kr.co.fukoku.model.response.Response;
import kr.co.fukoku.model.response.ResponseList;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.model.response.StatusCode;
import kr.co.fukoku.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/user")
public class UserRestController {
    @Autowired
    private UserService userService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "department", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "filter", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<User> getAllUsers(@ApiIgnore UserFilter userFilter, @ApiIgnore Pagination pagination) throws Exception {
        ResponseList<User> response = new ResponseList<>();
        List<User> userList = userService.getAllUsers(userFilter, pagination);
        if(userList.size() != 0){
            System.out.println();
            response.setCode(StatusCode.FOUND);
            response.setData(userList);
            response.setPagination(pagination);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<User> getUser(@PathVariable("id") int id){
        ResponseRecord<User> response = new ResponseRecord<>();
        try {
            User user = userService.getUser(id);
            if(user != null){
                response.setCode(StatusCode.SUCCESS);
                response.setData(user);
            }else{
                response.setCode(StatusCode.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addUser(@Valid @RequestBody UserForm userForm){
        Response response = new Response();
        try{
            User user = new User(
                    userForm.geteId(),
                    userForm.getPassword(),
                    userForm.getName(),
                    userForm.getPhone(),
                    userForm.getCellPhone(),
                    userForm.getEmail(),
                    userForm.getPosition(),
                    userForm.getRole(),
                    userForm.getStatus(),
                    userForm.getDepartment(),
                    userForm.getLine()
            );
            if(userService.addUser(user)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Response deleteUser(@PathVariable("id") int id){
        Response response = new Response();
        try{
            boolean result = userService.deleteUser(id);
            if(result){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Response updateUser(@Valid @RequestBody UserForm.UserUpdateForm userUpdateForm){
        Response response = new Response();
        try{
            User user = new User(
                    userUpdateForm.getId(),
                    userUpdateForm.geteId(),
                    userUpdateForm.getPassword(),
                    userUpdateForm.getName(),
                    userUpdateForm.getPhone(),
                    userUpdateForm.getCellPhone(),
                    userUpdateForm.getEmail(),
                    userUpdateForm.getPosition(),
                    userUpdateForm.getRole(),
                    userUpdateForm.getStatus(),
                    userUpdateForm.getDepartment(),
                    userUpdateForm.getLine()
            );
            if(userService.updateUser(user)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/password", method = RequestMethod.POST)
    public Response updateUserPassword(@Valid @RequestBody UserUpdatePassword userUpdatePassword){
        Response response = new Response();
        try{
            User user = new User();
            user.setId(userUpdatePassword.getId());
            user.setPassword(userUpdatePassword.getPassword());
            if(userService.updateUserPassword(user)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }
}
