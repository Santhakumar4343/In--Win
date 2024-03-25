package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Diamond;

public interface DiamondService {

	List<Diamond> getAllDiamonds();

	Diamond saveDiamond(Diamond diamond);

	List<Diamond> getDiamondByUserName(String userName);

	Diamond updateDiamond(Long id, Diamond diamond);

	boolean deleteDiamond(long id);
}
