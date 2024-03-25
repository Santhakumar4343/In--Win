package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Vehicle;
import com.os.inwin.repository.VehicleRepository;
import com.os.inwin.service.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepository;
	
	public double calculateTotalCurrentValue(String userName) {
        Iterable<Vehicle> vehicles = vehicleRepository.findByUserName(userName);
        double totalValue = 0.0;

        for (Vehicle vehicle : vehicles) {
            totalValue += vehicle.getPurchasePrice() * vehicle.getQuantity();
        }

        return totalValue;
    }
	@Override
	public List<Vehicle> getAllVehicles() {

		return vehicleRepository.findAll();
	}

	@Override
	public Vehicle saveVehicle(Vehicle vehicle) {
		vehicle.setLastUpdateDate(LocalDate.now());
		return vehicleRepository.save(vehicle);
	}

	@Override
	public List<Vehicle> getVehiclesByUserName(String userName) {

		return vehicleRepository.findByUserName(userName);
	}
	@Override
	public Vehicle updateVehicle(Long id, Vehicle vehicle ) {
		Optional<Vehicle> optionalVehicle = vehicleRepository.findById(id);
		if (optionalVehicle.isPresent()) {
			Vehicle existingVehicle = optionalVehicle.get();
			existingVehicle.setVehicleName(vehicle.getVehicleName());
			existingVehicle.setVehicleNumber(vehicle.getVehicleNumber());
			existingVehicle.setPurchasePrice(vehicle.getPurchasePrice());
			existingVehicle.setBuyDate(vehicle.getBuyDate());
			existingVehicle.setQuantity(vehicle.getQuantity());
			existingVehicle.setLastUpdateDate(LocalDate.now());
			return vehicleRepository.save(existingVehicle);
		}
		return null;
	}

	@Override
	public boolean deleteVehicle(long id) {
		Optional<Vehicle> optionalVehicle = vehicleRepository.findById(id);
		if (optionalVehicle.isPresent()) {
			vehicleRepository.deleteById(id);
			return true;
		} else
			return false;
	}

	
	
}
