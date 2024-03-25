package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.Realestate;
import com.os.inwin.repository.RealestateRepository;
import com.os.inwin.service.RealestateService;
@Service
public class RealestateServiceImpl implements RealestateService {

	@Autowired
	private RealestateRepository realestateRepository;

	 

	    public double calculateTotalCurrentValue(String userName) {
	        Iterable<Realestate> realestates = realestateRepository.findByUserName(userName);
	        double totalValue = 0.0;

	        for (Realestate realestate : realestates) {
	            totalValue += realestate.getCurrentPrice() * realestate.getQuantity();
	        }

	        return totalValue;
	    }
	@Override
	public List<Realestate> getAllRealestate() {
		return realestateRepository.findAll();
	}

	@Override
	public Realestate saveRealestate(Realestate realestate) {
		realestate.setLastUpdateDate(LocalDate.now());
		return realestateRepository.save(realestate);
	}

	@Override
	public List<Realestate> getRealestatesByUserName(String userName) {
		
		return realestateRepository.findByUserName(userName);
	}

	@Override
	public Realestate updateRealestate(Long id, Realestate realestate) {
	Optional <Realestate> optionalRealestate=realestateRepository.findById(id);
	
	if(optionalRealestate.isPresent()) {
		Realestate existingRealestate=optionalRealestate.get();
		existingRealestate.setQuantity(realestate.getQuantity());
		existingRealestate.setPurchasePrice(realestate.getPurchasePrice());
		existingRealestate.setBuyDate(realestate.getBuyDate());
		existingRealestate.setCurrentPrice(realestate.getCurrentPrice());
		existingRealestate.setLastUpdateDate(LocalDate.now());
		existingRealestate.setName(realestate.getName());
		return realestateRepository.save(existingRealestate);
		
	}
		return null;
		
	}

	@Override
	public boolean deleteRealestate(long id) {
		 Optional<Realestate> optionalRealestate = realestateRepository.findById(id);
		    if (optionalRealestate.isPresent()) {
		    	realestateRepository.deleteById(id);
		        return true; 
		    } else {
		        return false; 
		    }
	}

}
