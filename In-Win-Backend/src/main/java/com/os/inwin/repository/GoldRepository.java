package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.os.inwin.entity.Gold;

@Repository
public interface GoldRepository extends JpaRepository<Gold, Long> {
	List<Gold> findByUserName(String userName);
	Gold findBySymbol(String symbol);
}
