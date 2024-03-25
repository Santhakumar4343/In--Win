package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.Vehicle;

public interface VehicleService {

	

	List<Vehicle> getAllVehicles();
	Vehicle saveVehicle(Vehicle vehicle);
    List<Vehicle> getVehiclesByUserName(String userName);
    Vehicle updateVehicle(Long id,Vehicle vehicle);
    boolean deleteVehicle(long id);
}
