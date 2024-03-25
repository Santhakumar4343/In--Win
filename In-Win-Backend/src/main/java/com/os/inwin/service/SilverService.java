package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Silver;

public interface SilverService {

	 List<Silver> getAllSilvers();
	 Silver saveSilver(Silver silver);
	   
	    List<Silver> getSilverByUserName(String userName);
	    Silver updateSilver(Long id,Silver silver);
	    boolean deleteSilver(long id);
}
