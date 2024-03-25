package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Diamond;

public interface DiamondRepository extends JpaRepository<Diamond, Long>{
	
	List<Diamond> findByUserName(String userName);

	List<Diamond> findByCarat(String carat);
	List<Diamond> findByShape(String shape);
	
    
}
