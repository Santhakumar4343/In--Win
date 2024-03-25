package com.os.inwin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Diamond;
import com.os.inwin.entity.Jewellery;

public interface JewelleryRepository extends JpaRepository<Jewellery, Long>{
	List<Jewellery> findByUserName(String userName);
	List<Jewellery> findByDiamondShape(String shape);
}
