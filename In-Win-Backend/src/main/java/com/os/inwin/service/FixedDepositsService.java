package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.FixedDeposits;

public interface FixedDepositsService {

	 List<FixedDeposits> getAllFixedDeposits();
	 FixedDeposits saveFixedDeposit(FixedDeposits fixedDeposits);
	    List<FixedDeposits> getFixedDepositByUserName(String userName);
	    FixedDeposits updateFixedDeposits(Long id,FixedDeposits fixedDeposits);
	    boolean deleteFixedDeposit(long id);
}
