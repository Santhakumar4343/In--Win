package com.os.inwin.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.os.inwin.entity.AntiquePieces;
import com.os.inwin.repository.AntiquePiecesRepository;
import com.os.inwin.service.AntiquePiecesService;
@Service
public class AntiquePiecesServiceImpl implements AntiquePiecesService{

	@Autowired
	private AntiquePiecesRepository antiquePiecesRepository;
	
	
	public double calculateTotalCurrentValue(String userName) {
        Iterable<AntiquePieces> antiquePieces = antiquePiecesRepository.findByUserName(userName);
        double totalValue = 0.0;

        for (AntiquePieces antiquePiece : antiquePieces) {
            totalValue += antiquePiece.getPrice();
        }

        return totalValue;
    }
	@Override
	public List<AntiquePieces> getAllAntiquePieces() {
	
		return antiquePiecesRepository.findAll();
	}

	@Override
	public AntiquePieces saveAntiquePiece(AntiquePieces antiquePieces) {
		antiquePieces.setLastUpdateDate(LocalDate.now());
		return antiquePiecesRepository.save(antiquePieces);
	}

	@Override
	public List<AntiquePieces> getAntiquePiecesByUserName(String userName) {
	
		return antiquePiecesRepository.findByUserName(userName);
	}

	@Override
	public AntiquePieces updateAntiquePieces(Long id, AntiquePieces antiquePieces) {
		Optional<AntiquePieces> optionalAntiquePiece = antiquePiecesRepository.findById(id);
		if (optionalAntiquePiece.isPresent()) {
			AntiquePieces existingAntiquePiece = optionalAntiquePiece.get();
			existingAntiquePiece.setName(antiquePieces.getName());
			
			existingAntiquePiece.setYears(antiquePieces.getYears());
			existingAntiquePiece.setBuyDate(antiquePieces.getBuyDate());
			existingAntiquePiece.setLastUpdateDate(LocalDate.now());
			existingAntiquePiece.setPrice(antiquePieces.getPrice());
		return	antiquePiecesRepository.save(existingAntiquePiece);
		}
		return null;
	}

	@Override
	public boolean deleteAntiquePieces(long id) {
		Optional<AntiquePieces> antiquePieces=antiquePiecesRepository.findById(id);
		if(antiquePieces.isPresent()) {
			antiquePiecesRepository.deleteById(id);
			return true;
		}
		else
		return false;
	}

}
