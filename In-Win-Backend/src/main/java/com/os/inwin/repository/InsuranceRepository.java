package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Insurance;

public interface InsuranceRepository extends JpaRepository<Insurance, Long>{
	List<Insurance >findByUserName(String userName);

}
