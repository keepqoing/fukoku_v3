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


		registry.addViewController("/admin/defective-product-listing").setViewName("/admin/defective_product_list_v2");


		//integrated_visualization
		registry.addViewController("/admin/integrated_visualization").setViewName("/admin/integrated_visualization");

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
