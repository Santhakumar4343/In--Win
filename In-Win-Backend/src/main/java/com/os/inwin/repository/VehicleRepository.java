package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>{
	
	List<Vehicle> findByUserName(String userName);

}
