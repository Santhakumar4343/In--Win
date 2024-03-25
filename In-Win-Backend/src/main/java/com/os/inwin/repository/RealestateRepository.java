package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Realestate;

public interface RealestateRepository extends JpaRepository<Realestate, Long>{
	List<Realestate> findByUserName(String userName);
}
