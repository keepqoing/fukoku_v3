package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.CalHeatmapFilter;
import kr.co.fukoku.model.CalHeatmap;
import kr.co.fukoku.service.CalHeatmapService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequestMapping("/v3/api/fukoku/cal-heatmap")
public class CalHeatmapRestController {

    @Autowired
    private CalHeatmapService calHeatmapService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/ok", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountOK(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountOK(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/ng", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountNG(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountNG(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/df", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountDF(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountDF(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({

            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/tt", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountTT(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountTT(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/nas", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountNAS(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountNAS(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/fs", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountFS(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountFS(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "date", dataType = "string", paramType = "query")
    })
    @RequestMapping(value="/alarm", method = RequestMethod.GET)
    public ResponseList<CalHeatmap> getCountAlarm(@ApiIgnore CalHeatmapFilter calHeatmapFilter){
        ResponseList<CalHeatmap> response = new ResponseList<>();
        List<CalHeatmap> companyList = calHeatmapService.getCountAlarm(calHeatmapFilter);
        if(companyList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(companyList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }
}