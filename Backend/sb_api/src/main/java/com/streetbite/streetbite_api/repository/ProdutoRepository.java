package com.streetbite.streetbite_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.streetbite.streetbite_api.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	boolean existsByNome(String nome);
}
