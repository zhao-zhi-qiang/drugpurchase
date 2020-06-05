package com.ygjy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by IntelliJ IDEA.
 * User: wangzhonglei
 * Date: 2020/6/5
 * Desc: 描述
 */

@Controller
public class SupervisionController {

    /**
     * 跳转监督管理系统
     * @return
     */
    @RequestMapping("/supervisory_management_index")
    public String findUserByiD() {
        return "supervisory_management_system/supervisory_management_index";
    }

    /**
     * 跳转监督管理小页面
     * @return
     */
    @RequestMapping("/drug_item_maintenance")
    public String Drug_item_maintenance(){
        return "supervisory_management_system/Drug_item_maintenance";
    }

}
