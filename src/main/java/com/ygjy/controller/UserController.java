package com.ygjy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by IntelliJ IDEA.
 * User: zhaozhiqiang
 * Date: 2020/6/3
 * Desc: 用户管理页面
 */
/*@RestController*/
@Controller
public class UserController {

    /**
     * 跳转用户管理页面
     * @return
     */
    @RequestMapping("/userControl")
    public String userControl(){
        return "administrators_system/user_control";
    }

    /**
     * 跳转卫生局页面
     * @return
     */
    @RequestMapping("/healthBureau")
    public String healthBureau(){
        return "administrators_system/health_bureau";
    }

    /**
     * 跳转卫生院页面
     * @return
     */
    @RequestMapping("/healthCenters")
    public String healthCenters(){
        return "administrators_system/health_centers";
    }

    /**
     * 跳转卫生室页面
     * @return
     */
    @RequestMapping("/medicalRoom")
    public String medicalRoom(){
        return "administrators_system/medical_room";
    }

    /**
     * 跳转供货商页面
     * @return
     */
    @RequestMapping("/vendors")
    public String vendors(){
        return "administrators_system/vendors";
    }

    /**
     * 跳转监督机构页面
     * @return
     */
    @RequestMapping("/proxyMonitor")
    public String proxyMonitor(){
        return "administrators_system/proxy_monitor";
    }

    /**
     * 跳转数据字典页面
     * @return
     */
    @RequestMapping("/dictionaryManaged")
    public String dictionaryManaged(){
        return "administrators_system/dictionary_managed";
    }

    /**
     * 跳转区域管理页面
     * @return
     */
    @RequestMapping("/districtManagement")
    public String districtManagement(){
        return "administrators_system/district_management";
    }

    /**
     * 跳转用户数据管理页面
     * @return
     */
    @RequestMapping("/userManagement")
    public String userManagement(){
        return "administrators_system/user_management";
    }

    /**
     * 跳转用户权限管理页面
     * @return
     */
    @RequestMapping("/userRightsManagement")
    public String userRightsManagement(){
        return "administrators_system/user_rights_management";
    }

    /**
     * 跳转系统配置页面
     * @return
     */
    @RequestMapping("/systemParameter")
    public String systemParameter(){
        return "administrators_system/system_parameter";
    }
}
