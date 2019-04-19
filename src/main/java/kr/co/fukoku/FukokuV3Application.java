package kr.co.fukoku;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Hello
@SpringBootApplication
public class FukokuV3Application {

	public static void main(String[] args) {
		// Set hadoop environment
		System.setProperty("hadoop.home.dir", "C:\\winutils\\");
		SpringApplication.run(FukokuV3Application.class, args);
	}

}
