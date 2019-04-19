package kr.co.fukoku.configuration;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import kr.co.fukoku.configuration.mapper.PhoenixMapper;

@Configuration
@MapperScan(annotationClass = PhoenixMapper.class, basePackages = {"kr.co.fukoku.repository_hbase"}, sqlSessionFactoryRef = "phoenixSqlSessionFactory" )
@PropertySource(
		value={"classpath:application.properties"}
)
public class PhoenixConfiguration {
	
    @Autowired
    private Environment env;
	
	@Bean(name="phoenixDataSource")
	@Primary
	public DataSource dataSource() {
		 return DataSourceBuilder.create()
	                .username(env.getProperty("ph.spring.datasource.username"))
	                .password(env.getProperty("ph.spring.datasource.password"))
	                .url(env.getProperty("ph.spring.datasource.url"))
	                .driverClassName(env.getProperty("ph.spring.datasource.driver-class-name"))
	                .build();
	}
	
	
    
    @Bean(name="phoenixDataSourceTransactionManager")
    @Primary
    public DataSourceTransactionManager phoenixTransactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    
    @Bean(name="phoenixSqlSessionFactory")
    @Primary
    public SqlSessionFactoryBean phoenixSqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        return sessionFactory;
    }

    
}
