package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Platinum;

public interface PlatinumRepository  extends JpaRepository<Platinum, Long>{

	List<Platinum> findByUserName(String userName);
}
