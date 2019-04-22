package kr.co.fukoku.configuration;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import kr.co.fukoku.configuration.mapper.PhoenixMapper;

import javax.sql.DataSource;

@Configuration
//@MapperScan("kr.co.fukoku.repository")
@MapperScan(basePackages = { "kr.co.fukoku.repository" }, sqlSessionFactoryRef = "sql1SqlSessionFactory")
@PropertySource(value = { "classpath:application.properties" })
public class MyBatisConfiguration {


	@Autowired
	private Environment env;

	@Bean(name = "sql1DataSource")
	public DataSource dataSource() {
		return DataSourceBuilder.create().username(env.getProperty("spring.datasource.username"))
				.password(env.getProperty("spring.datasource.password"))
				.url(env.getProperty("spring.datasource.url"))
				.driverClassName(env.getProperty("spring.datasource.driver-class-name")).build();
	}

	@Bean("jdbcTemplate")
	public JdbcTemplate jdbcTEmplate(){
		return new JdbcTemplate(dataSource());
	}

	@Bean(name = "sql1DataSourceTransactionManager")
	public DataSourceTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean(name = "sql1SqlSessionFactory")
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		return sessionFactory;
	}

}
