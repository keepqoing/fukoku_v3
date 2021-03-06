package kr.co.fukoku.configuration;

import javax.servlet.MultipartConfigElement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {

		
		
		// TODO: SWAGGER ROUTING
		registry.addViewController("/swagger").setViewName("swagger/swagger-ui");

		// TODO: BACKEND OFFICE ROUTING
		registry.addViewController("/").setViewName("/admin/factory");
		registry.addViewController("/admin").setViewName("/admin/factory");
		registry.addViewController("/admin/product").setViewName("/admin/product");

		registry.addViewController("/admin/factory").setViewName("/admin/factory");
		registry.addViewController("/admin/line").setViewName("/admin/line");
		registry.addViewController("/admin/machine").setViewName("/admin/machine");
		registry.addViewController("/admin/process").setViewName("/admin/process");
		registry.addViewController("/admin/process-var").setViewName("/admin/process-var");
		registry.addViewController("/admin/process-machine").setViewName("/admin/process-machine4");
		registry.addViewController("/admin/process-machine3").setViewName("/admin/process-machine3");
		registry.addViewController("/admin/process-machine4").setViewName("/admin/process-machine4");
		
		
		registry.addViewController("/admin/user").setViewName("/admin/user");
		registry.addViewController("/admin/issue").setViewName("/admin/issue");
		registry.addViewController("/admin/operating-time-calendar").setViewName("/admin/operating-time-calendar");
		registry.addViewController("/admin/data-storage-info").setViewName("/admin/data-storage-info");
		
		registry.addViewController("/admin/department").setViewName("/admin/department");
		registry.addViewController("/admin/model").setViewName("/admin/model");
		registry.addViewController("/admin/alarm-statistics").setViewName("/admin/alarm-statistics");

		registry.addViewController("/admin/break-time").setViewName("/admin/break-time");
		registry.addViewController("/admin/operating-time").setViewName("/admin/operating-time");
		registry.addViewController("/admin/abnormal-mgt-design").setViewName("/admin/abnormal-mgt-design");
		registry.addViewController("/admin/abnormal-mgt").setViewName("/admin/abnormal-mgt");
		registry.addViewController("/admin/alarm-appearance").setViewName("/admin/alarm-appearance");
		
		registry.addViewController("/admin/data-collection-management").setViewName("/admin/data-collection-management");
		registry.addViewController("/admin/machine-state-monitoring").setViewName("/admin/machine-state-monitoring");
		

		// Menus are from old version 2
		registry.addViewController("/admin/dashboard2").setViewName("/admin/dashboard2");
		registry.addViewController("/admin/dashboard-table").setViewName("/admin/dashboard-table");
		registry.addViewController("/admin/line-chart").setViewName("/admin/line-chart");
        registry.addViewController("/admin/production-status-new").setViewName("/admin/production-status-new");
		registry.addViewController("/admin/plant-production-losses").setViewName("/admin/plant-production-losses");
		registry.addViewController("/admin/calendar-heatmap").setViewName("/admin/calendar-heatmap");
		registry.addViewController("/admin/product-summarization").setViewName("/admin/product-summarization");
		registry.addViewController("/admin/new-equipment-ca").setViewName("/admin/new-equipment-ca");
		registry.addViewController("/admin/breakdowntimeanalysisbyline")
				.setViewName("/admin/breakdowntimeanalysisbyline");
		registry.addViewController("/admin/stop_offl_Line").setViewName("/admin/stop_offl_Line");
		registry.addViewController("/admin/non_active_Time_by_machine")
				.setViewName("/admin/non_active_Time_by_machine");
		registry.addViewController("/admin/non-active-state").setViewName("/admin/non-active-state");
		registry.addViewController("/admin/non-moving-state-classification")
				.setViewName("/admin/non-moving-state-classification");
		registry.addViewController("/admin/calendar-heatmap-nas").setViewName("/admin/calendar-heatmap-nas");
		registry.addViewController("/admin/faultTimeAnalysisAllLine").setViewName("/admin/faultTimeAnalysisAllLine");
		registry.addViewController("/admin/faultTimeAnalysisByLine").setViewName("/admin/faultTimeAnalysisByLine");
		registry.addViewController("/admin/faultTimeAnalysisByMachine")
				.setViewName("/admin/faultTimeAnalysisByMachine");
		registry.addViewController("/admin/fault-state").setViewName("/admin/fault-state");
		registry.addViewController("/admin/calendar-heatmap-fs").setViewName("/admin/calendar-heatmap-fs");
		registry.addViewController("/admin/defective-product-listing").setViewName("/admin/defective_product_list_v2");
		registry.addViewController("/admin/alarmTimeAnalysisAllLine").setViewName("/admin/alarmTimeAnalysisAllLine");
		registry.addViewController("/admin/alarmTimeAnalysisByLine").setViewName("/admin/alarmTimeAnalysisByLine");
		registry.addViewController("/admin/alarmTimeAnalysisByMachine")
				.setViewName("/admin/alarmTimeAnalysisByMachine");
		registry.addViewController("/admin/alarm-history").setViewName("/admin/alarm-history");
		registry.addViewController("/admin/alarm-state-classification")
				.setViewName("/admin/alarm-state-classification");
		registry.addViewController("/admin/alarm-statistics").setViewName("/admin/alarm-statistics");
		registry.addViewController("/admin/alarm-statistics-duration").setViewName("/admin/alarm-statistics-duration");
		registry.addViewController("/admin/calendar-heatmap-alarm").setViewName("/admin/calendar-heatmap-alarm");
		registry.addViewController("/admin/defective-product").setViewName("/admin/defective-product");
		registry.addViewController("/admin/ng-product-listing-new").setViewName("/admin/ng-product-listing-new");

		registry.addViewController("/admin/alarm-statistics-graph").setViewName("/admin/alarm-statistics-graph");
		registry.addViewController("/admin/failureRateAnalysis").setViewName("/admin/failureRateAnalysis");
		registry.addViewController("/admin/predictionEquipmentFaultDiagnosis").setViewName("/admin/predictionEquipmentFaultDiagnosis");



		// Add by Jesuk Myung
		// Date : 2019-04-30
		// Description : Fault association analysis page
		registry.addViewController("/admin/fault-apriori").setViewName("/admin/fault-apriori");
		registry.addViewController("/admin/defective-apriori").setViewName("/admin/defective-apriori");



		//integrated_visualization
		registry.addViewController("/admin/integrated_visualization").setViewName("/admin/integrated_visualization");
		
		// workpiece 
		registry.addViewController("/admin/production-process").setViewName("/admin/workpiece/production-process-detail");
		registry.addViewController("/admin/production-process-detail").setViewName("/admin/workpiece/production-process-detail");
		
		registry.addViewController("/admin/production-cycle-time").setViewName("/admin/workpiece/production-cycle-time-detail");
		registry.addViewController("/admin/production-cycle-time-detail").setViewName("/admin/workpiece/production-cycle-time-detail");
		
		registry.addViewController("/admin/workpiece-spc-thesis").setViewName("/admin/workpiece/workpiece-spc-thesis");
		registry.addViewController("/admin/workpiece-spc-detail-thesis").setViewName("/admin/workpiece/workpiece-spc-detail-thesis");
		
		registry.addViewController("/admin/workpiece-total-produce").setViewName("/admin/workpiece/workpiece-total-produce");
		
		registry.addViewController("/admin/time-line").setViewName("/admin/time-line");
		registry.addViewController("/admin/time-line1").setViewName("/admin/time-line1");
		registry.addViewController("/admin/time-line2").setViewName("/admin/time-line2");
		
		registry.addViewController("/admin/workpiece-spc-overall").setViewName("/admin/workpiece/workpiece-spc-overall-detail");
		registry.addViewController("/admin/workpiece-spc-overall-detail").setViewName("/admin/workpiece/workpiece-spc-overall-detail");
		
		registry.addViewController("/admin/workpiece-line-bad-type").setViewName("/admin/workpiece/workpiece-line-bad-type-detail");
		registry.addViewController("/admin/workpiece-line-bad-type-detail").setViewName("/admin/workpiece/workpiece-line-bad-type-detail");
		
		registry.addViewController("/admin/workpiece-spc").setViewName("/admin/workpiece/workpiece-spc-detail");
		registry.addViewController("/admin/workpiece-spc-detail").setViewName("/admin/workpiece/workpiece-spc-detail");
		
		registry.addViewController("/admin/process-quality-management-by-line").setViewName("/admin/workpiece/process-quality-management-by-line");
		
		registry.addViewController("/admin/product-qty-information").setViewName("/admin/workpiece/product-qty-information");
		registry.addViewController("/admin/product-qty-information-ng").setViewName("/admin/workpiece/product-qty-information-ng");
		
		registry.addViewController("/admin/ng-product-listing").setViewName("/admin/workpiece/ng-product-listing");
		
		registry.addViewController("/admin/data-analytic-mgt").setViewName("/admin/data-analytic-mgt");
		
		registry.addViewController("/admin/define-enviroment-variable").setViewName("/admin/define-enviroment-variable");
		
	
		registry.addViewController("/admin/process-v2").setViewName("/admin/process-v2");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");

		registry.addResourceHandler("/home/gac/fukoku-upload/files/excels/**")
				.addResourceLocations("file:/home/gac/fukoku-upload/files/excels/");
		registry.addResourceHandler("/home/gac/fukoku-upload/files/images/**")
				.addResourceLocations("file:/home/gac/fukoku-upload/files/images/");

	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH")
				// .allowedOrigins("*");
				.allowedOrigins("*");
	}
	

}
