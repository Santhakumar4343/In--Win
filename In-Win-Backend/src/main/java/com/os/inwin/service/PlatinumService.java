package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Platinum;

public interface PlatinumService {

	List<Platinum> getAllPlatinums();

	Platinum savePlatinum(Platinum platinum);

	List<Platinum> getPlatinumByUserName(String userName);

	Platinum updatePlatinum(Long id, Platinum platinum);

	boolean deletePlatinum(long id);
}
