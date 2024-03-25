package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.AntiquePieces;

public interface AntiquePiecesService {


	 List<AntiquePieces> getAllAntiquePieces();
	 AntiquePieces saveAntiquePiece(AntiquePieces antiquePieces);
	    List<AntiquePieces> getAntiquePiecesByUserName(String userName);
	    AntiquePieces updateAntiquePieces(Long id,AntiquePieces antiquePieces);
	    boolean deleteAntiquePieces(long id);
}
