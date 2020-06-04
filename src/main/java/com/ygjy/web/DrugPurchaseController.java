package com.ygjy.web;

/*import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;*/
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by IntelliJ IDEA.
 * User: Administrator
 * Date: 2020/6/2
 */
@Controller
public class DrugPurchaseController {

   @RequestMapping("/drug_item_maintenance")
    public String findUserByiD() {
        System.out.println("----------------------findUserByiD----------------------");
        return "Drug_item_maintenance";
    }
    @RequestMapping("/login")
    public String login() {
        System.out.println("----------------------findUserByiD----------------------");
        return "login";
    }
}

