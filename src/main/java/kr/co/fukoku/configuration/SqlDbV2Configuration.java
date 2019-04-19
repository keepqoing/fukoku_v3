package kr.co.fukoku.configuration;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import kr.co.fukoku.configuration.mapper.SqlDbV2Mapper;


@Configuration
@MapperScan(annotationClass =SqlDbV2Mapper.class, basePackages = {"kr.co.fukoku.repository_sql_db2"} , sqlSessionFactoryRef = "sql2SqlSessionFactory")
@PropertySource(
		value={"classpath:application.properties"}
)
public class SqlDbV2Configuration {

	@Autowired
    private Environment env;
	
	
    @Bean(name = "sql2DataSource")
    public DataSource dataSource() {
		 return DataSourceBuilder.create()
	                .username(env.getProperty("v2.spring.datasource.username"))
	                .password(env.getProperty("v2.spring.datasource.password"))
	                .url(env.getProperty("v2.spring.datasource.url"))
	                .driverClassName(env.getProperty("v2.spring.datasource.driver-class-name"))
	                .build();
	}

	@Bean(name="sql2DataSourceTransactionManager")
	public DataSourceTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean(name="sql2SqlSessionFactory")
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		return sessionFactory;
	}

}