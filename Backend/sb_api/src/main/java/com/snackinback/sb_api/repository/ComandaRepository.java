package com.snackinback.sb_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.snackinback.sb_api.model.Comanda;

@Repository
public interface ComandaRepository extends JpaRepository<Comanda, Long>{
    Optional<Comanda> findByCodigoDoPedido(String numero);
}
