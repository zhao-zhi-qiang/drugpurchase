package com.ygjy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DrugPurchaseApplication implements Runnable{
    public static void main(String[] args) {
        SpringApplication.run(DrugPurchaseApplication.class,args);
    }
    @Override
    public void run() {

    }
}
