package kr.co.fukoku.configuration;

import javax.servlet.MultipartConfigElement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
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
		registry.addViewController("/").setViewName("/admin/product");
		registry.addViewController("/admin").setViewName("/admin/product");
		registry.addViewController("/admin/product").setViewName("/admin/product");

		registry.addViewController("/admin/factory").setViewName("/admin/factory");
		registry.addViewController("/admin/line").setViewName("/admin/line");
		registry.addViewController("/admin/machine").setViewName("/admin/machine");
		registry.addViewController("/admin/process").setViewName("/admin/process");
		registry.addViewController("/admin/process-var").setViewName("/admin/process-var");
		registry.addViewController("/admin/process-machine").setViewName("/admin/process-machine");
		registry.addViewController("/admin/process-machine3").setViewName("/admin/process-machine3");
		
		
		registry.addViewController("/admin/user").setViewName("/admin/user");
		registry.addViewController("/admin/issue").setViewName("/admin/issue");
		registry.addViewController("/admin/operating-time-calendar").setViewName("/admin/operating-time-calendar");
		registry.addViewController("/admin/data-storage-info").setViewName("/admin/data-storage-info");
		
		registry.addViewController("/admin/department").setViewName("/admin/department");
		registry.addViewController("/admin/model").setViewName("/admin/model");
		registry.addViewController("/admin/alarm-statistics").setViewName("/admin/alarm-statistics");

		registry.addViewController("/admin/break-time").setViewName("/admin/break-time");
		registry.addViewController("/admin/operating-time").setViewName("/admin/operating-time");
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

	

}
