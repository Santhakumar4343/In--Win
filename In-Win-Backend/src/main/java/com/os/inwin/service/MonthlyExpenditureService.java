package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.MonthlyExpenditure;

public interface MonthlyExpenditureService {
    List<MonthlyExpenditure> getAllMonthlyExpenditures();
    MonthlyExpenditure getMonthlyExpenditureById(long id);
   List< MonthlyExpenditure >getMonthlyExpenditureByUserName(String  userName);
    MonthlyExpenditure createMonthlyExpenditure(MonthlyExpenditure monthlyExpenditure);
    MonthlyExpenditure updateMonthlyExpenditure(long id, MonthlyExpenditure monthlyExpenditure);
    boolean deleteMonthlyExpenditure(long id);
}

