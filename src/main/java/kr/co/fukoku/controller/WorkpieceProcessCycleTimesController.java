package kr.co.fukoku.controller;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.LongStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.math.Stats;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.model.visualization.ArrayMultiLinesVisualization;
import kr.co.fukoku.model.visualization.SingleDataMultiLinesVisualization;
import kr.co.fukoku.service.WorkpieceHBaseRealTimeService;
import kr.co.fukoku.service.WorkpieceProcessCycleTimeService;
import kr.co.fukoku.utils.MyConverter;
import kr.co.fukoku.utils.StatisticalCalculation;

@RestController
@RequestMapping("/v3/api/fukoku/workpiece-process-cycle-time")
public class WorkpieceProcessCycleTimesController {
	
	@Autowired
	private WorkpieceProcessCycleTimeService service;
	
	@RequestMapping(value="/real-time",method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> realTime(@RequestBody WorkpieceIndexing wp) throws ParseException  {
        return new ResponseEntity<Map<String,Object>>(service.workpieceProcessCycleTimes(wp), HttpStatus.OK);
    }

}
