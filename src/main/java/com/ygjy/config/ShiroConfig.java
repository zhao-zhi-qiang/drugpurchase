/*
package com.ygjy.config;

import org.apache.shiro.mgt.DefaultSecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.shiro.mgt.SecurityManager;

import java.util.LinkedHashMap;
import java.util.Map;

*/
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2020/6/2
 * desc: 根据登录用户权限跳转对应页面
 *//*


@Configuration
public class ShiroConfig{

    @Bean
    public CustonRealm custonRealm(){
        CustonRealm custonRealm = new CustonRealm();
        return custonRealm;
    }

    @Bean
    public SecurityManager securityManager(){
        DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
        defaultSecurityManager.setRealm(custonRealm());
        return defaultSecurityManager;
    }

    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        //登录时访问的地址，即没有登录时访问任何页面跳转的地址
        shiroFilterFactoryBean.setLoginUrl("/login");
        //认证未通过访问的地址，即经过认证但是没有相应的权限时跳转的地址
        shiroFilterFactoryBean.setUnauthorizedUrl("/notRole");
        //设置认证成功之后转向的地址
        shiroFilterFactoryBean.setSuccessUrl("/authc/index");
        Map<String,String> filterChainDefinitionMap = new LinkedHashMap<>();
        //authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问
        // <!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
        filterChainDefinitionMap.put("/webjars/**", "anon");
        filterChainDefinitionMap.put("/login", "anon");
        filterChainDefinitionMap.put("/", "anon");
        filterChainDefinitionMap.put("/front/**", "anon");
        filterChainDefinitionMap.put("/api/**", "anon");
        filterChainDefinitionMap.put("/admin/**", "authc");
        filterChainDefinitionMap.put("/user/**", "authc");
        //主要这行代码必须放在所有权限设置的最后，不然会导致所有 url 都被拦截 剩余的都需要认证
        filterChainDefinitionMap.put("/**", "authc");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterFactoryBean;
    }
}
*/
