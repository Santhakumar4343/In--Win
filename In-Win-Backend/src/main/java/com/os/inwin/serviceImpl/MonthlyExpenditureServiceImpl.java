package com.os.inwin.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.MonthlyExpenditure;
import com.os.inwin.entity.Stock;
import com.os.inwin.repository.MonthlyExpenditureRepository;
import com.os.inwin.service.MonthlyExpenditureService;

@Service
public class MonthlyExpenditureServiceImpl implements MonthlyExpenditureService{

	@Autowired
	private MonthlyExpenditureRepository monthlyExpenditureRepository;
	@Override
	public List<MonthlyExpenditure> getAllMonthlyExpenditures() {
		
		return monthlyExpenditureRepository.findAll();
	}

	@Override
	public MonthlyExpenditure getMonthlyExpenditureById(long id) {
	    Optional<MonthlyExpenditure> monthlyExpenditure = monthlyExpenditureRepository.findById(id);
	    return monthlyExpenditure.orElse(null);
	}

	@Override
	public List<MonthlyExpenditure> getMonthlyExpenditureByUserName(String userName) {
		
		return  monthlyExpenditureRepository.findByUserName(userName) ;
	}

	@Override
	public MonthlyExpenditure createMonthlyExpenditure(MonthlyExpenditure monthlyExpenditure) {
		
		return monthlyExpenditureRepository.save(monthlyExpenditure);
	}

	@Override
	public MonthlyExpenditure updateMonthlyExpenditure(long id, MonthlyExpenditure monthlyExpenditure) {
		Optional<MonthlyExpenditure> optionalMonthlyExpenditure = monthlyExpenditureRepository.findById(id);
		if(optionalMonthlyExpenditure.isPresent()) {
			MonthlyExpenditure existingExpenditure=optionalMonthlyExpenditure.get();
			existingExpenditure.setName(monthlyExpenditure.getName());
			existingExpenditure.setAmount(monthlyExpenditure.getAmount());
			return monthlyExpenditureRepository.save(existingExpenditure);
				}
		return null;
	}

	@Override
	public boolean deleteMonthlyExpenditure(long id) {
		Optional<MonthlyExpenditure> optionalMonthlyExpendicture=monthlyExpenditureRepository.findById(id);
		if(optionalMonthlyExpendicture!=null) {
			monthlyExpenditureRepository.deleteById(id);
			return true;
		}
		else 
			return false;
	}

	public double calculateTotalCurrentValue(String userName) {
	    Iterable<MonthlyExpenditure> monthlyExpenditures = monthlyExpenditureRepository.findByUserName(userName);
	    double totalValue = 0.0;

	    for (MonthlyExpenditure monthlyExpenditure : monthlyExpenditures) {
	        totalValue += monthlyExpenditure.getAmount() ;
	    }

	    return totalValue;
	}

}
