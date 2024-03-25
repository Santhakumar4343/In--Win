package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Insurance;

public interface InsuranceService {

	List<Insurance> getAllInsurances();
	Insurance saveInsurance(Insurance realestate);
    List<Insurance> getInsurancesByUserName(String userName);
    Insurance updateInsurance(Long id,Insurance insurance);
    boolean deleteInsurance(long id);
}
