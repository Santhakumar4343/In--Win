package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Realestate;

public interface RealestateService {

	List<Realestate> getAllRealestate();
	Realestate saveRealestate(Realestate realestate);
    List<Realestate> getRealestatesByUserName(String userName);
    Realestate updateRealestate(Long id,Realestate realestate);
    boolean deleteRealestate(long id);
}
