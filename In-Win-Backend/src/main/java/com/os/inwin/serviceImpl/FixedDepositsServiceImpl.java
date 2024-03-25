package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.FixedDeposits;
import com.os.inwin.repository.FixedDepositsRepository;
import com.os.inwin.service.FixedDepositsService;

@Service
public class FixedDepositsServiceImpl implements FixedDepositsService {

	@Autowired
	private FixedDepositsRepository fixedDepositsRepository;

	
	 public double calculateTotalCurrentValue(String userName) {
	        Iterable<FixedDeposits> fixedDeposits = fixedDepositsRepository.findByUserName(userName);
	        double totalValue = 0.0;

	        for (FixedDeposits fixedDeposit : fixedDeposits) {
	            totalValue += fixedDeposit.getTotalAmount() ;
	        }

	        return totalValue;
	    }
	@Override
	public List<FixedDeposits> getAllFixedDeposits() {

		return fixedDepositsRepository.findAll();
	}

	@Override
	public FixedDeposits saveFixedDeposit(FixedDeposits fixedDeposits) {
		fixedDeposits.setLastUpdateDate(LocalDate.now());
		return fixedDepositsRepository.save(fixedDeposits);
	}

	@Override
	public List<FixedDeposits> getFixedDepositByUserName(String userName) {

		return fixedDepositsRepository.findByUserName(userName);
	}

	@Override
	public FixedDeposits updateFixedDeposits(Long id, FixedDeposits fixedDeposits) {
		Optional<FixedDeposits> optionalFixedDeposit = fixedDepositsRepository.findById(id);
		if (optionalFixedDeposit.isPresent()) {
			FixedDeposits existingFixedDeposits = optionalFixedDeposit.get();
			existingFixedDeposits.setName(fixedDeposits.getName());
			existingFixedDeposits.setBankName(fixedDeposits.getBankName());
			existingFixedDeposits.setYears(fixedDeposits.getYears());
			existingFixedDeposits.setFixedDate(fixedDeposits.getFixedDate());
			existingFixedDeposits.setLastUpdateDate(LocalDate.now());
			existingFixedDeposits.setTotalAmount(fixedDeposits.getTotalAmount());
		return	fixedDepositsRepository.save(existingFixedDeposits);
		}
		return null;
	}

	@Override
	public boolean deleteFixedDeposit(long id) {
		Optional<FixedDeposits> optionalDeposit = fixedDepositsRepository.findById(id);
		if (optionalDeposit.isPresent()) {
			fixedDepositsRepository.deleteById(id);
			return true;
		} else {
			return false;

		}
	}
}
