package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Gold;

public interface GoldService {
    List<Gold> getAllGolds();
    Gold saveGold(Gold gold);
    void updateGoldPrices();
    List<Gold> getGoldByUserName(String userName);
    Gold updateGold(Long id,Gold gold);
    boolean deleteGold(long id);
}


