package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Jewellery;

public interface JewelleryService {

	Jewellery saveJewellery(Jewellery jewellery);

	List<Jewellery> getJewelleryByUserName(String userName);

	Jewellery updateJewellery(Long id, Jewellery jewellery);

	boolean deleteJewellery(long id);
}
