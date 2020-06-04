/*
package com.ygjy.config;

import com.ygjy.service.DrugPurchaseService;
*/
/*import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;*//*

import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

*/
/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2020/6/2
 * desc: 用户身份认证、权限认证
 *//*

public class CustonRealm extends AuthorizingRealm {

    */
/**
     * @param principalCollection
     * @return
     *
     *//*

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取当前操作用户
        String username = (String)(SecurityUtils.getSubject().getPrincipal());
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Set<String> stringSet = new HashSet<>();
        stringSet.add("user:show");
        stringSet.add("user:admin");
        info.setStringPermissions(stringSet);
        return info;
    }

    */
/**
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     * 获取要认证的信息
     *//*

    @Autowired
    private DrugPurchaseService drugPurchaseService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("----------身份认证方法--------------");
        //获取当前登录账号
        String userName = (String)(authenticationToken.getPrincipal());
        //获取当前登录密码
        String userPwd = new String((char[]) authenticationToken.getCredentials());
        //根据用户名获取数据库对应密码
        String password = "123456";
        //判断用户密码
        if (userName == null || userName == ""){
            throw new AccountException("用户名不正确");
        }else if(!userPwd.equals(password)){
            throw new AccountException(("用户密码错误"));
        }
        return new SimpleAuthenticationInfo(userName,password,getName());
    }
}
*/
