package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.ItemFilter;
import kr.co.fukoku.model.Item;
import kr.co.fukoku.model.form.ItemForm;
import kr.co.fukoku.model.response.Response;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.service.ItemService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/item")
public class ItemRestController {

    @Autowired
    private ItemService itemService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "department", dataType = "string", paramType = "query"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<Item> getAllItemByDepartment(@ApiIgnore ItemFilter filter) throws BusinessException {
        ResponseList<Item> response = new ResponseList<>();
        List<Item> itemList = itemService.getAllItemsByDepartment(filter);
        if(itemList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(itemList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "classification", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value="/select-box", method = RequestMethod.GET)
    public ResponseList<Item> getAllItemsName(@ApiIgnore ItemFilter filter) throws BusinessException {
        ResponseList<Item> response = new ResponseList<>();
        List<Item> itemList = itemService.getAllItemsNameByClassification(filter);
        if(itemList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(itemList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<Item> getItemById(@PathVariable("id") int id){
        ResponseRecord<Item> response = new ResponseRecord<>();
        try {
            Item item = itemService.getItemById(id);
            if(item != null){
                response.setCode(StatusCode.SUCCESS);
                response.setData(item);
            }else{
                response.setCode(StatusCode.NOT_FOUND);
            }
        } catch (BusinessException e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addItem(@Valid @RequestBody ItemForm itemForm){
        Response response = new Response();
        try{
            Item item = new Item(itemForm.getCode(),
                    itemForm.getName(),
                    itemForm.getRemark(),
                    itemForm.getRefDepOfCat(),
                    itemForm.getRefParent());
            if(itemService.addItem(item)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Response deleteItem(@PathVariable("id") int id){
        Response response = new Response();
        try{
            boolean result = itemService.deleteItem(id);
            if(result){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Response updateItem(@Valid @RequestBody ItemForm.ItemUpdateForm itemUpdateForm){
        Response response = new Response();
        try{
            Item item = new Item(itemUpdateForm.getId(),
                    itemUpdateForm.getCode(),
                    itemUpdateForm.getName(),
                    itemUpdateForm.getRemark(),
                    itemUpdateForm.getRefDepOfCat(),
                    itemUpdateForm.getRefParent());
            if(itemService.updateItem(item)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }
}