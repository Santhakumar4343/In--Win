package com.os.inwin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.os.inwin.entity.AntiquePieces;
import com.os.inwin.entity.FixedDeposits;
import com.os.inwin.serviceImpl.AntiquePiecesServiceImpl;

@RestController
@RequestMapping("/api/antiquePieces")
public class AntiquePiecesController {

	@Autowired
	private AntiquePiecesServiceImpl anitiAntiquePiecesService;
	
	  @GetMapping("/totalAPPrice/{userName}")
	    public Map<String ,Double>otalCurrentValue(@PathVariable String userName) {
	        double totalPrice= anitiAntiquePiecesService.calculateTotalCurrentValue(userName);
	        Map<String,Double> response=new HashMap<>();
	        response.put("totalPrice", totalPrice);
	        return response;
	        
	    }

	@GetMapping("/getAllAntiquePieces")
	public ResponseEntity<List<AntiquePieces>> getAllAntiquePieces() {
		List<AntiquePieces> antiquePieces = anitiAntiquePiecesService.getAllAntiquePieces();
		return new ResponseEntity<>(antiquePieces, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<AntiquePieces> saveAntiquePiece(@RequestBody AntiquePieces antiquePieces) {
		AntiquePieces savedAntiquePiece = anitiAntiquePiecesService.saveAntiquePiece(antiquePieces);
		return new ResponseEntity<>(savedAntiquePiece, HttpStatus.CREATED);
	}

	@PutMapping("/updateAntiquePiece/{id}")
	public ResponseEntity<String> updateAntiquePiece(@PathVariable long id, @RequestBody AntiquePieces antiquePieces) {
		AntiquePieces updatedAntiquePiece = anitiAntiquePiecesService.updateAntiquePieces(id, antiquePieces);
		return updatedAntiquePiece != null ? new ResponseEntity<>("AntiquePiece updated successfully", HttpStatus.OK)
				: new ResponseEntity<>("AntiquePieces not found", HttpStatus.NOT_FOUND);
	}

	@GetMapping("/getAntiquePiecesForUser/{userName}")
	public List<AntiquePieces> getAntiquePiecesByUserName(@PathVariable("userName") String userName) {
		return anitiAntiquePiecesService.getAntiquePiecesByUserName(userName);
	}

	@DeleteMapping("/deleteAntiquePiece/{id}")
	public ResponseEntity<String> deleteFixedDeposit(@PathVariable long id) {
		boolean deleted = anitiAntiquePiecesService.deleteAntiquePieces(id);
		if (deleted) {
			return ResponseEntity.ok("AntiquePieces with ID " + id + " deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("AntiquePieces with ID " + id + " not found");
		}
	}
}
