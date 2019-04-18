package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.NGProductFilter;
import kr.co.fukoku.model.Image;
import kr.co.fukoku.model.NGProduct;
import kr.co.fukoku.model.form.ImageForm;
import kr.co.fukoku.model.form.NGProductForm;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.service.ImageService;
import kr.co.fukoku.service.NGProductService;
import kr.co.fukoku.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/api/fukoku/ng-product")
public class NGProductRestController {
    @Autowired
    private NGProductService ngProductService;
    @Autowired
    private ImageService imageService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "status", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<NGProduct> getAllDefectiveProducts(@ApiIgnore NGProductFilter filter, @ApiIgnore Pagination pagination) throws BusinessException {
        ResponseList<NGProduct> response = new ResponseList<>();
        List<NGProduct> ngProductList = ngProductService.getAllNGProducts(filter, pagination);
        if (ngProductList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(ngProductList);
            response.setPagination(pagination);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
            System.out.println();
        }
        return response;
    }

    @RequestMapping(value="/number-line/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getAlarmNumberInLine(@PathVariable("productionDate") String productionDate) {
        if(productionDate.equals("0"))
            productionDate = "";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> counting = ngProductService.getNumberAlarmByLine(productionDate);
        if (counting.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(counting);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/number-machine/{line}/{productionDate}", method = RequestMethod.GET)
    public ResponseList<Counting> getAlarmNumberInMachine(@PathVariable("line") String line, @PathVariable("productionDate") String productionDate) {
        if(productionDate.equals("0"))
            productionDate = "";
        ResponseList<Counting> response = new ResponseList<>();
        List<Counting> counting = ngProductService.getNumberAlarmByMachine(line, productionDate);
        if (counting.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(counting);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<NGProduct> getDefectiveProduct(@PathVariable("id") int id) {
        ResponseRecord<NGProduct> response = new ResponseRecord<>();
        NGProduct ngProduct = ngProductService.getNGProduct(id);
        if (ngProduct != null) {
            response.setCode(StatusCode.SUCCESS);
            response.setData(ngProduct);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/upload-images", method = RequestMethod.POST)
    public Response upload(@RequestParam("file") MultipartFile file, @ModelAttribute ImageForm imageForm) throws IOException {
        Response response = new Response();
        String filename = "";
        if (!file.isEmpty()) {
            String savePath = "/home/gac/fukoku-upload/files/images/";
            try {
                filename = file.getOriginalFilename(); // ORIGINAL FILE NAME
                System.out.println("FILE=" + filename);
                byte[] bytes = file.getBytes();
                UUID uuid = UUID.randomUUID();
                String randomUUIDFileName = uuid.toString();
                String extension = filename.substring(filename.lastIndexOf(".") + 1);
                File path = new File(savePath);
                if (!path.exists()) {
                    path.mkdirs();
                }
                filename = randomUUIDFileName + "." + extension;
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(new File(savePath + File.separator + filename)));
                stream.write(bytes);
                stream.close();
                System.out.println("You successfully uploaded " + savePath + filename);
                System.out.println("Filename " + filename);
                response.setCode(StatusCode.SUCCESS);
                response.setMessage("FILE HAS BEEN INSERTED SUCCESSFULLY.");
                Image image = new Image(
                        filename
                        , ""
                        , imageForm.getTranId()
                        , "품질보전부"
                );
                image.setTranHisId(imageForm.getTranHisId());
                imageService.addImage(image);
                ngProductService.updateStatus(imageForm.getTranId());
            } catch (Exception e) {
                System.out.println(e.getMessage());
                System.out.println("You failed to upload " + filename + " => " + e.getMessage());
            }
        } else {
            System.out.println("You failed to upload " + filename + " because the file was empty.");
        }
        // }
        return response;
    }

    @RequestMapping(value="/add", method = RequestMethod.POST)
    public Response addNGProduct(@Valid @RequestBody NGProductForm ngProductForm) {
        Response response = new Response();
        NGProduct defectiveProduct = new NGProduct(
                ngProductForm.getLine(),
                ngProductForm.getMachine(),
                ngProductForm.getProduct(),
                ngProductForm.getMstate(),
                ngProductForm.getStartTime(),
                ngProductForm.getEndTime(),
                ngProductForm.getWorkDate()
        );
        if (ngProductService.addNGProduct(defectiveProduct)) {
            response.setCode(StatusCode.SUCCESS);
        } else {
            response.setCode(StatusCode.NOT_SUCCESS);
        }
        return response;
    }

}