package com.snackinback.sb_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snackinback.sb_api.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    
}
