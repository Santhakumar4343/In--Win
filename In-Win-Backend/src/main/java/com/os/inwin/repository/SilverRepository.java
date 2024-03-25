package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Silver;

public interface SilverRepository extends JpaRepository<Silver, Long>{
	List<Silver> findByUserName(String userName);

}
