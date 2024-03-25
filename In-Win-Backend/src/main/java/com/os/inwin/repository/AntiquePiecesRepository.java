package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.AntiquePieces;


public interface AntiquePiecesRepository  extends  JpaRepository<AntiquePieces, Long>{

	List<AntiquePieces> findByUserName(String userName);
}
